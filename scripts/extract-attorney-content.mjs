/**
 * Extract verbatim attorney content from the old WordPress site (envisage.law).
 *
 * Outputs a JSON file at /tmp/attorney-content.json for manual review
 * before anything is written to Sanity.
 *
 * Usage:  node scripts/extract-attorney-content.mjs
 */

import * as cheerio from "cheerio";
import { writeFileSync } from "fs";

const ATTORNEYS = [
  { slug: "adam-banks", oldPath: "adam-p-banks" },
  { slug: "joelle-harvill", oldPath: "allison-joelle-harvill" },
  { slug: "tara-seidel", oldPath: "tara-seidel-2" },
  { slug: "danielle-rose", oldPath: "danielle-rose" },
  { slug: "sophie-vouvalis", oldPath: "sophie-vouvalis" },
  { slug: "jay-thomas", oldPath: "jay-thomas" },
];

async function fetchPage(oldPath) {
  const url = `https://envisage.law/our-team/${oldPath}/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return res.text();
}

function extractContent(html) {
  const $ = cheerio.load(html);
  const result = { bio: [], sections: [], badges: [] };

  // --- Bio content ---
  // The first .fusion-text block contains the personal bio.
  // It may contain <p> paragraphs and <ul> lists interleaved.
  // Subsequent .fusion-text blocks are global firm marketing copy — skip those.
  const firstFusionText = $(".fusion-text").first();
  if (firstFusionText.length) {
    firstFusionText.children().each((_i, el) => {
      const tag = el.tagName || el.name;
      if (tag === "p") {
        const text = $(el).text().trim();
        if (text) result.bio.push(text);
      } else if (tag === "ul" || tag === "ol") {
        // Capture list items as individual bio entries, prefixed with bullet
        $(el)
          .children("li")
          .each((_j, li) => {
            const text = $(li).clone().children("ul,ol").remove().end().text().trim();
            if (text) result.bio.push(`• ${text}`);
          });
      }
    });
  }

  // --- Accordion sections ---
  // Each .fusion-panel has a heading and content body.
  // Headings appear 3x (responsive breakpoints) — deduplicate.
  const seenSections = new Set();

  $(".fusion-panel").each((_i, el) => {
    const heading = $(el).find(".fusion-toggle-heading").first().text().trim();
    if (!heading || seenSections.has(heading)) return;
    seenSections.add(heading);

    const content = $(el).find(".panel-body, .fusion-toggle-content").first();
    const items = [];

    // Check if content has list items
    const listItems = content.find("> ul > li, > ol > li");
    if (listItems.length > 0) {
      listItems.each((_j, li) => {
        // Get direct text of the li (without nested sub-list text)
        const clone = $(li).clone();
        const nestedUl = clone.children("ul, ol");
        const subItems = [];
        nestedUl.find("li").each((_k, subLi) => {
          const subText = $(subLi).text().trim();
          if (subText) subItems.push(subText);
        });
        nestedUl.remove();
        const mainText = clone.text().trim();

        if (mainText && subItems.length > 0) {
          // Parent with sub-items: format as nested
          items.push(mainText);
          subItems.forEach((sub) => items.push(`  - ${sub}`));
        } else if (mainText) {
          items.push(mainText);
        }
      });
    } else {
      // No list — content might be <br>-separated text or paragraphs
      // Replace <br> with newlines, then split
      const htmlContent = content.html() || "";
      const textWithBreaks = htmlContent
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/?i>/gi, "") // preserve italic text content
        .replace(/<[^>]+>/g, "") // strip remaining tags
        .trim();

      if (textWithBreaks) {
        textWithBreaks.split("\n").forEach((line) => {
          const trimmed = line.trim();
          if (trimmed) items.push(trimmed);
        });
      }
    }

    result.sections.push({ title: heading, items });
  });

  // --- Badge images ---
  $("img").each((_i, el) => {
    const src = $(el).attr("src") || "";
    const alt = $(el).attr("alt") || "";
    if (
      src.includes("Envisage") ||
      src.includes("icon") ||
      src.includes("emoji") ||
      src.includes("gravatar") ||
      src.startsWith("data:")
    )
      return;
    if (
      alt.toLowerCase().includes("certified") ||
      alt.toLowerCase().includes("badge") ||
      alt.toLowerCase().includes("super lawyer") ||
      src.toLowerCase().includes("certification") ||
      src.toLowerCase().includes("badge")
    ) {
      result.badges.push({ src, alt });
    }
  });

  // --- Super Lawyers widget ---
  $("script").each((_i, el) => {
    const src = $(el).attr("src") || "";
    if (src.includes("superlawyers.com")) {
      result.superLawyersWidget = true;
    }
  });

  return result;
}

async function main() {
  const results = {};

  for (const attorney of ATTORNEYS) {
    console.log(`Fetching ${attorney.oldPath}...`);
    const html = await fetchPage(attorney.oldPath);
    const content = extractContent(html);
    results[attorney.slug] = content;
    console.log(
      `  -> ${content.bio.length} bio entries, ${content.sections.length} sections`
    );
  }

  const outPath = "/tmp/attorney-content.json";
  writeFileSync(outPath, JSON.stringify(results, null, 2));
  console.log(`\nOutput written to ${outPath}`);
  console.log("Review this file against the old site before proceeding.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
