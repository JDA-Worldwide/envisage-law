/**
 * Populate SEO fields across all Sanity documents.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-seo.mjs
 *   node --env-file=.env.local scripts/seed-seo.mjs --force   # overwrite existing SEO
 */

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function truncate(str, max) {
  if (!str) return "";
  if (str.length <= max) return str;
  return str.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

const force = process.argv.includes("--force");

async function patchSeo(id, metaTitle, metaDescription) {
  const doc = await client.fetch(`*[_id == $id][0] { "hasSeo": defined(seo.metaTitle) }`, { id });
  if (doc?.hasSeo && !force) {
    console.log(`  SKIP  ${id} — already has SEO`);
    return;
  }
  await client.patch(id).set({
    seo: { metaTitle: truncate(metaTitle, 60), metaDescription: truncate(metaDescription, 160) },
  }).commit();
  console.log(`  SET   ${id}`);
  console.log(`        title: ${truncate(metaTitle, 60)}`);
  console.log(`        desc:  ${truncate(metaDescription, 80)}...`);
}

async function main() {
  console.log("\n  Populating SEO fields...\n");

  // --- Global Settings (default SEO) ---
  console.log("  Global Settings (defaultSeo):");
  const gs = await client.fetch(`*[_type == "globalSettings"][0] { _id, "hasDefault": defined(defaultSeo.metaTitle) }`);
  if (gs && (!gs.hasDefault || force)) {
    await client.patch(gs._id).set({
      defaultSeo: {
        metaTitle: "Envisage Law · Complex Litigation · Strategic Counsel",
        metaDescription: "Envisage Law is a litigation-first boutique firm in Raleigh, NC, representing clients in high-stakes business and intellectual property litigation nationwide.",
      },
    }).commit();
    console.log("  SET   globalSettings defaultSeo");
  } else {
    console.log("  SKIP  globalSettings — already has defaultSeo");
  }

  // --- Pages ---
  console.log("\n  Pages:");
  const pages = await client.fetch(`*[_type == "page"] { _id, title, "slug": slug.current, "hasSeo": defined(seo.metaTitle) }`);

  const pageSeo = {
    home: {
      title: "Envisage Law · Complex Litigation · Strategic Counsel",
      desc: "Envisage Law is a litigation-first boutique firm in Raleigh, NC. Board-certified specialists and nationally recognized litigators handling high-stakes business and IP litigation nationwide.",
    },
    about: {
      title: "About Envisage Law · Relentless. Fierce. Undaunted.",
      desc: "A litigation-first boutique of board-certified specialists and nationally recognized litigators who take on cases that define legal precedent.",
    },
    contact: {
      title: "Contact Envisage Law",
      desc: "Reach an attorney directly. No intake forms. Envisage Law, PO Box 30099, Raleigh, North Carolina 27622. Call 919.268.8998.",
    },
    "legal-team": {
      title: "Legal Team · Envisage Law Attorneys & Staff",
      desc: "Meet the attorneys of Envisage Law: board-certified specialists, former judicial clerks, and nationally recognized litigators.",
    },
    "practice-areas": {
      title: "Practice Areas · Six Litigation Niches",
      desc: "A civil and commercial litigation firm with deepest expertise in IP & Technology, Regulatory & Healthcare, Construction, Nonprofit & Ministry, HOA, and Data Privacy.",
    },
  };

  for (const page of pages) {
    if (page.hasSeo && !force) {
      console.log(`  SKIP  ${page.title} (${page.slug})`);
      continue;
    }
    const seo = pageSeo[page.slug];
    if (seo) {
      await patchSeo(page._id, seo.title, seo.desc);
    }
  }

  // --- Attorneys ---
  console.log("\n  Attorneys:");
  const attorneys = await client.fetch(`*[_type == "attorney"] | order(order asc) { _id, name, role, niche, "hasSeo": defined(seo.metaTitle) }`);

  for (const a of attorneys) {
    if (a.hasSeo && !force) {
      console.log(`  SKIP  ${a.name}`);
      continue;
    }
    const title = `${a.name} · ${a.role}`;
    const niche = a.niche ? ` specializing in ${a.niche}` : "";
    const desc = `${a.name} is a ${a.role} at Envisage Law${niche}. Contact our team for experienced legal representation.`;
    await patchSeo(a._id, title, desc);
  }

  // --- Practice Areas ---
  console.log("\n  Practice Areas:");
  const practiceAreas = await client.fetch(`*[_type == "practiceArea"] | order(order asc) { _id, title, standfirst, "hasSeo": defined(seo.metaTitle) }`);

  for (const pa of practiceAreas) {
    if (pa.hasSeo && !force) {
      console.log(`  SKIP  ${pa.title}`);
      continue;
    }
    const title = `${pa.title} · Envisage Law`;
    await patchSeo(pa._id, title, pa.standfirst);
  }

  // --- Insights ---
  console.log("\n  Insights:");
  const insights = await client.fetch(`*[_type == "insight"] | order(publishedAt desc) { _id, title, excerpt, category, "hasSeo": defined(seo.metaTitle) }`);

  for (const i of insights) {
    if (i.hasSeo && !force) {
      console.log(`  SKIP  ${i.title.slice(0, 50)}...`);
      continue;
    }
    const title = i.title;
    const desc = i.excerpt || `${i.category} insight from Envisage Law attorneys.`;
    await patchSeo(i._id, title, desc);
  }

  console.log("\n  Done! SEO fields populated.\n");
}

main().catch((err) => {
  console.error("\n  Failed:", err.message, "\n");
  process.exit(1);
});
