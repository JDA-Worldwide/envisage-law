/**
 * Migrate missing sidebar fields (email) for attorneys.
 *
 * Patches email addresses extracted from the old envisage.law site into Sanity.
 * Only 4 of the 6 attorneys have emails on the old site (Seidel, Rose, Vouvalis, Thomas).
 * Banks and Harvill do not display email on the old site.
 * Practice area tags and direct phone numbers are not on the old site — those were
 * manually curated for Biller and Lawrence and need manual entry for the rest.
 *
 * Usage:  node --env-file=.env.local scripts/migrate-attorney-sidebar.mjs
 *
 * Pass --dry-run to preview patches without writing.
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-02-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const dryRun = process.argv.includes("--dry-run");

// Emails verified from the old envisage.law site (mailto: links)
const patches = [
  { slug: "tara-seidel", email: "tseidel@envisage.law" },
  { slug: "danielle-rose", email: "drose@envisage.law" },
  { slug: "sophie-vouvalis", email: "svouvalis@envisage.law" },
  { slug: "jay-thomas", email: "jcthomas@envisage.law" },
];

async function main() {
  console.log(dryRun ? "DRY RUN — no changes will be written\n" : "");

  for (const { slug, email } of patches) {
    const doc = await client.fetch(
      `*[_type == "attorney" && slug.current == $slug][0]{ _id, name, email }`,
      { slug }
    );

    if (!doc) {
      console.log(`SKIP: No document found for slug "${slug}"`);
      continue;
    }

    if (doc.email) {
      console.log(`SKIP: ${doc.name} already has email: ${doc.email}`);
      continue;
    }

    console.log(`${doc.name}: setting email to ${email}`);

    if (!dryRun) {
      await client.patch(doc._id).set({ email }).commit();
      console.log(`  -> Written to Sanity`);
    } else {
      console.log(`  -> Would write (dry run)`);
    }
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
