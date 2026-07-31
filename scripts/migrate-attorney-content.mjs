/**
 * Migrate extracted attorney content into Sanity.
 *
 * Reads the verified JSON from scripts/attorney-content.json and patches
 * the 6 attorney documents that are missing bios and profile sections.
 *
 * Usage:  node --env-file=.env.local scripts/migrate-attorney-content.mjs
 *
 * Pass --dry-run to preview patches without writing.
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const dryRun = process.argv.includes("--dry-run");
const content = JSON.parse(
  readFileSync(new URL("./attorney-content.json", import.meta.url), "utf-8")
);

/** Convert a plain-text string into a single portable-text block. */
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

/** Convert extracted sections into Sanity profileSections array. */
function toProfileSections(sections) {
  return sections.map((section) => ({
    _type: "bulletList",
    _key: randomUUID().slice(0, 12),
    title: section.title,
    items: section.items,
  }));
}

async function main() {
  console.log(dryRun ? "DRY RUN — no changes will be written\n" : "");

  for (const [slug, data] of Object.entries(content)) {
    // Find the attorney document by slug
    const doc = await client.fetch(
      `*[_type == "attorney" && slug.current == $slug][0]{ _id, name, "hasBio": length(bio) > 0 }`,
      { slug }
    );

    if (!doc) {
      console.log(`SKIP: No attorney document found for slug "${slug}"`);
      continue;
    }

    if (doc.hasBio) {
      console.log(`SKIP: ${doc.name} already has a bio — not overwriting`);
      continue;
    }

    // Build portable text bio
    const bio = data.bio.map(textToBlock);

    // Build profile sections
    const profileSections = toProfileSections(data.sections);

    const patch = {
      bio,
      profileSections,
    };

    console.log(`${doc.name} (${doc._id}):`);
    console.log(`  Bio: ${bio.length} blocks`);
    console.log(`  Sections: ${profileSections.length} (${profileSections.map((s) => s.title).join(", ")})`);

    if (!dryRun) {
      await client.patch(doc._id).set(patch).commit();
      console.log(`  -> Written to Sanity`);
    } else {
      console.log(`  -> Would write (dry run)`);
    }
    console.log();
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
