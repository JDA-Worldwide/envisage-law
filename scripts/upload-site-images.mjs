/**
 * Upload stock images to Sanity and add them to globalSettings.
 *
 * Usage:
 *   node --env-file=.env.local scripts/upload-site-images.mjs
 */

import { createClient } from "@sanity/client";
import https from "https";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return downloadBuffer(res.headers.location).then(resolve, reject);
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
        const chunks = [];
        res.on("data", (c) => chunks.push(c));
        res.on("end", () => resolve(Buffer.concat(chunks)));
        res.on("error", reject);
      })
      .on("error", reject);
  });
}

async function uploadImage(url, filename) {
  const buffer = await downloadBuffer(url);
  const asset = await client.assets.upload("image", buffer, { filename });
  return asset._id;
}

const images = [
  {
    field: "heroImage",
    url: "https://images.unsplash.com/photo-1766068472262-253151e7fdf7?fm=jpg&q=80&w=2400&auto=format&fit=crop",
    filename: "hero-particles.jpg",
    alt: "Abstract blue digital particle texture",
  },
  {
    field: "courthouseImage",
    url: "https://images.unsplash.com/photo-1750365501430-395251fe4b7e?fm=jpg&q=80&w=2400&auto=format&fit=crop",
    filename: "courthouse.jpg",
    alt: "Federal courthouse exterior",
  },
  {
    field: "consultationImage",
    url: "https://images.unsplash.com/photo-1758518730384-be3d205838e8?fm=jpg&q=80&w=2400&auto=format&fit=crop",
    filename: "consultation.jpg",
    alt: "Professional consultation meeting",
  },
  {
    field: "raleighSkylineImage",
    url: "https://images.unsplash.com/photo-1676934556859-624fa21e2588?fm=jpg&q=80&w=2400&auto=format&fit=crop",
    filename: "raleigh-skyline.jpg",
    alt: "Raleigh, North Carolina skyline",
  },
];

async function main() {
  console.log("\n  Uploading site images to Sanity...\n");

  const patch = {};

  for (const img of images) {
    process.stdout.write(`  ${img.field}...`);
    const assetId = await uploadImage(img.url, img.filename);
    patch[img.field] = {
      _type: "image",
      asset: { _type: "reference", _ref: assetId },
      alt: img.alt,
    };
    console.log(" done");
  }

  console.log("\n  Patching globalSettings...");
  await client.patch("globalSettings").set(patch).commit();

  console.log("  Done! Site images are now in Sanity.\n");
}

main().catch((err) => {
  console.error("\n  Failed:", err.message, "\n");
  process.exit(1);
});
