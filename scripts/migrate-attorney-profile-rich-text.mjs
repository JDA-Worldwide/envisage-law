/**
 * Convert attorney profile-section values from plain strings to Portable Text.
 *
 * Bullet list `items` and key-value `entries[].value` are now simpleRichText
 * (array of blocks). This wraps any remaining strings so Studio and the site
 * keep showing existing copy.
 *
 * Usage:  node --env-file=.env.local scripts/migrate-attorney-profile-rich-text.mjs
 *
 * Pass --dry-run to preview patches without writing.
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const dryRun = process.argv.includes("--dry-run");

function textToBlock(text) {
  return {
    _type: "block",
    _key: randomUUID().slice(0, 12),
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: randomUUID().slice(0, 12),
        text,
        marks: [],
      },
    ],
  };
}

function toBlocks(value) {
  if (!Array.isArray(value)) {
    return typeof value === "string" && value ? [textToBlock(value)] : [];
  }

  return value.flatMap((item) => {
    if (typeof item === "string") return [textToBlock(item)];
    if (item && typeof item === "object" && item._type === "block") return [item];
    return [];
  });
}

function migrateSection(section) {
  if (section._type === "bulletList") {
    return { ...section, items: toBlocks(section.items) };
  }

  if (section._type === "keyValueList") {
    return {
      ...section,
      entries: (section.entries ?? []).map((entry) => ({
        ...entry,
        value: toBlocks(entry.value),
      })),
    };
  }

  return section;
}

function needsMigration(sections) {
  return sections.some((section) => {
    if (section._type === "bulletList") {
      return (section.items ?? []).some((item) => typeof item === "string");
    }
    if (section._type === "keyValueList") {
      return (section.entries ?? []).some(
        (entry) => typeof entry.value === "string"
      );
    }
    return false;
  });
}

async function main() {
  console.log(dryRun ? "DRY RUN — no changes will be written\n" : "");

  const attorneys = await client.fetch(
    `*[_type == "attorney" && defined(profileSections)]{ _id, name, profileSections }`
  );

  if (!attorneys.length) {
    console.log("No attorneys with profile sections found.");
    return;
  }

  let patched = 0;

  for (const attorney of attorneys) {
    const sections = attorney.profileSections ?? [];

    if (!needsMigration(sections)) {
      console.log(`SKIP: ${attorney.name} — already Portable Text`);
      continue;
    }

    const profileSections = sections.map(migrateSection);
    const bulletCount = profileSections
      .filter((s) => s._type === "bulletList")
      .reduce((n, s) => n + (s.items?.length ?? 0), 0);
    const entryCount = profileSections
      .filter((s) => s._type === "keyValueList")
      .reduce((n, s) => n + (s.entries?.length ?? 0), 0);

    console.log(`${attorney.name} (${attorney._id}):`);
    console.log(`  Sections: ${profileSections.length}`);
    console.log(`  Bullet items: ${bulletCount}`);
    console.log(`  Key-value entries: ${entryCount}`);

    if (!dryRun) {
      await client.patch(attorney._id).set({ profileSections }).commit();
      console.log("  -> Written to Sanity");
    } else {
      console.log("  -> Would write (dry run)");
    }
    console.log();
    patched += 1;
  }

  console.log(`Done. ${patched} document${patched === 1 ? "" : "s"} ${dryRun ? "would be patched" : "patched"}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
