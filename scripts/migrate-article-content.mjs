/**
 * Migrates HTML article content from articleContent.ts into Sanity portable text.
 *
 * Usage:
 *   node --env-file=.env.local scripts/migrate-article-content.mjs
 *   node --env-file=.env.local scripts/migrate-article-content.mjs --force
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import { readFileSync } from "fs";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const key = () => randomUUID().slice(0, 8);

// ---------------------------------------------------------------------------
// HTML → Portable Text converter
// ---------------------------------------------------------------------------

/**
 * Parse inline markup (strong, em, a) within a text string into
 * portable text spans + markDefs.
 */
function parseInlineMarkup(html) {
  const spans = [];
  const markDefs = [];
  let remaining = html;

  // Regex to find <strong>, <em>, <a> tags (non-nested)
  const inlineRegex = /<(strong|em|b|i|a)(\s[^>]*)?>(.+?)<\/\1>/gs;

  let lastIndex = 0;
  const fullText = remaining;
  const matches = [...fullText.matchAll(inlineRegex)];

  if (matches.length === 0) {
    // No inline markup — single span
    return {
      spans: [{ _type: "span", _key: key(), text: decodeEntities(html), marks: [] }],
      markDefs: [],
    };
  }

  for (const match of matches) {
    const before = fullText.slice(lastIndex, match.index);
    if (before) {
      spans.push({ _type: "span", _key: key(), text: decodeEntities(before), marks: [] });
    }

    const tag = match[1];
    const attrs = match[2] || "";
    const innerText = match[3];
    const marks = [];

    if (tag === "strong" || tag === "b") {
      marks.push("strong");
    } else if (tag === "em" || tag === "i") {
      marks.push("em");
    } else if (tag === "a") {
      const hrefMatch = attrs.match(/href=["']([^"']+)["']/);
      if (hrefMatch) {
        const markKey = key();
        markDefs.push({
          _type: "link",
          _key: markKey,
          href: hrefMatch[1],
        });
        marks.push(markKey);
      }
    }

    // Recursively handle nested inline markup in innerText
    const inner = parseInlineMarkup(innerText);
    for (const span of inner.spans) {
      spans.push({ ...span, _key: key(), marks: [...marks, ...span.marks] });
    }
    markDefs.push(...inner.markDefs);

    lastIndex = match.index + match[0].length;
  }

  const after = fullText.slice(lastIndex);
  if (after) {
    spans.push({ _type: "span", _key: key(), text: decodeEntities(after), marks: [] });
  }

  return { spans, markDefs };
}

function decodeEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&ldquo;/g, "\u201C")
    .replace(/&rdquo;/g, "\u201D")
    .replace(/&mdash;/g, "\u2014")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&nbsp;/g, " ")
    // Decode JS unicode escapes (\uXXXX) that survive raw file reads
    .replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    );
}

function htmlToPortableText(html) {
  const blocks = [];

  // Normalize whitespace between tags
  const cleaned = html.trim().replace(/\n\s*\n/g, "\n");

  // Split into top-level elements
  const elementRegex = /<(h[1-6]|p|ul|ol|blockquote)(\s[^>]*)?>[\s\S]*?<\/\1>/gi;
  const elements = [...cleaned.matchAll(elementRegex)];

  for (const el of elements) {
    const tag = el[1].toLowerCase();
    const content = el[0];

    if (tag === "ul" || tag === "ol") {
      // Extract list items
      const listType = tag === "ul" ? "bullet" : "number";
      const liRegex = /<li>([\s\S]*?)<\/li>/gi;
      const items = [...content.matchAll(liRegex)];

      for (const li of items) {
        const { spans, markDefs } = parseInlineMarkup(li[1].trim());
        blocks.push({
          _type: "block",
          _key: key(),
          style: "normal",
          listItem: listType,
          level: 1,
          markDefs,
          children: spans,
        });
      }
    } else {
      // Block element (p, h2, h3, etc.)
      const style =
        tag === "h1" ? "h1" :
        tag === "h2" ? "h2" :
        tag === "h3" ? "h3" :
        tag === "h4" ? "h4" :
        tag === "blockquote" ? "blockquote" :
        "normal";

      // Strip the outer tag
      const inner = content.replace(new RegExp(`^<${tag}[^>]*>`, "i"), "").replace(new RegExp(`</${tag}>$`, "i"), "").trim();

      const { spans, markDefs } = parseInlineMarkup(inner);
      blocks.push({
        _type: "block",
        _key: key(),
        style,
        markDefs,
        children: spans,
      });
    }
  }

  return blocks;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n  Migrating article content to Sanity portable text...\n");

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error("  Error: env vars not set.\n");
    process.exit(1);
  }

  // Read and parse articleContent.ts
  const raw = readFileSync("src/lib/articleContent.ts", "utf-8");

  // Extract slug → HTML pairs using regex on the template literal structure
  const entryRegex = /["']([a-z0-9-]+)["']:\s*`([\s\S]*?)`/g;
  const articles = [];
  let match;
  while ((match = entryRegex.exec(raw)) !== null) {
    articles.push({ slug: match[1], html: match[2].trim() });
  }

  console.log(`  Found ${articles.length} articles with body content.\n`);

  // Look up insight IDs by slug
  const insights = await client.fetch(
    `*[_type == "insight"]{ _id, "slug": slug.current, "hasBody": count(body) > 0 }`
  );
  const slugToInsight = {};
  for (const i of insights) {
    slugToInsight[i.slug] = i;
  }

  let migrated = 0;
  let skipped = 0;

  for (const article of articles) {
    const insight = slugToInsight[article.slug];
    if (!insight) {
      console.log(`  SKIP  ${article.slug} — no matching insight document`);
      skipped++;
      continue;
    }

    if (insight.hasBody && !process.argv.includes("--force")) {
      console.log(`  SKIP  ${article.slug} — already has body content`);
      skipped++;
      continue;
    }

    const body = htmlToPortableText(article.html);

    if (body.length === 0) {
      console.log(`  SKIP  ${article.slug} — conversion produced 0 blocks`);
      skipped++;
      continue;
    }

    await client.patch(insight._id).set({ body }).commit();
    console.log(`  DONE  ${article.slug} — ${body.length} blocks`);
    migrated++;
  }

  console.log(`\n  Migration complete: ${migrated} migrated, ${skipped} skipped.\n`);
}

main().catch((err) => {
  console.error("\n  Migration failed:", err.message, "\n");
  process.exit(1);
});
