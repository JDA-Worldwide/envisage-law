import * as cheerio from "cheerio";
import { readFileSync } from "fs";

const extracted = JSON.parse(readFileSync("/Users/colton.jackson/Envisage Law/scripts/attorney-content.json", "utf-8"));

const pages = [
  { slug: "adam-banks", file: "/tmp/old-adam.html" },
  { slug: "joelle-harvill", file: "/tmp/old-joelle.html" },
  { slug: "tara-seidel", file: "/tmp/old-seidel.html" },
  { slug: "danielle-rose", file: "/tmp/old-rose.html" },
  { slug: "sophie-vouvalis", file: "/tmp/old-sophie.html" },
  { slug: "jay-thomas", file: "/tmp/old-jay.html" },
];

for (const { slug, file } of pages) {
  const html = readFileSync(file, "utf-8");
  const $ = cheerio.load(html);
  const data = extracted[slug];
  const issues = [];

  console.log(`\n${"=".repeat(60)}`);
  console.log(`ATTORNEY: ${slug}`);
  console.log(`${"=".repeat(60)}`);

  // --- Verify bio ---
  // Get all text from first fusion-text block
  const firstFT = $(".fusion-text").first();
  const siteBioTexts = [];
  firstFT.children().each((_i, el) => {
    const tag = el.tagName || el.name;
    if (tag === "p") {
      const t = $(el).text().trim();
      if (t) siteBioTexts.push(t);
    } else if (tag === "ul" || tag === "ol") {
      $(el).children("li").each((_j, li) => {
        const t = $(li).clone().children("ul,ol").remove().end().text().trim();
        if (t) siteBioTexts.push(`• ${t}`);
      });
    }
  });

  console.log(`\n  BIO: ${data.bio.length} extracted vs ${siteBioTexts.length} on site`);
  if (data.bio.length !== siteBioTexts.length) {
    issues.push(`Bio count mismatch: ${data.bio.length} vs ${siteBioTexts.length}`);
  }
  for (let i = 0; i < Math.max(data.bio.length, siteBioTexts.length); i++) {
    const ext = (data.bio[i] || "").replace(/\s+/g, " ").trim();
    const site = (siteBioTexts[i] || "").replace(/\s+/g, " ").trim();
    if (ext === site) {
      console.log(`    [MATCH] p${i}: "${ext.slice(0, 70)}..."`);
    } else {
      console.log(`    [DIFF]  p${i}:`);
      console.log(`      EXTRACTED: "${ext.slice(0, 100)}"`);
      console.log(`      SITE:      "${site.slice(0, 100)}"`);
      issues.push(`Bio paragraph ${i} differs`);
    }
  }

  // --- Verify sections ---
  const seenSections = new Set();
  const siteSections = [];
  $(".fusion-panel").each((_i, el) => {
    const heading = $(el).find(".fusion-toggle-heading").first().text().trim();
    if (!heading || seenSections.has(heading)) return;
    seenSections.add(heading);

    const content = $(el).find(".panel-body, .fusion-toggle-content").first();
    const items = [];
    const listItems = content.find("> ul > li, > ol > li");
    if (listItems.length > 0) {
      listItems.each((_j, li) => {
        const clone = $(li).clone();
        const nestedUl = clone.children("ul, ol");
        const subItems = [];
        nestedUl.find("li").each((_k, subLi) => {
          subItems.push($(subLi).text().trim());
        });
        nestedUl.remove();
        const mainText = clone.text().trim();
        if (mainText && subItems.length > 0) {
          items.push(mainText);
          subItems.forEach(sub => items.push(`  - ${sub}`));
        } else if (mainText) {
          items.push(mainText);
        }
      });
    } else {
      const htmlContent = content.html() || "";
      const textWithBreaks = htmlContent
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<\/?i>/gi, "")
        .replace(/<[^>]+>/g, "")
        .trim();
      if (textWithBreaks) {
        textWithBreaks.split("\n").forEach(line => {
          const trimmed = line.trim();
          if (trimmed) items.push(trimmed);
        });
      }
    }
    siteSections.push({ title: heading, items });
  });

  console.log(`\n  SECTIONS: ${data.sections.length} extracted vs ${siteSections.length} on site`);

  // Compare section titles
  const extTitles = data.sections.map(s => s.title);
  const siteTitles = siteSections.map(s => s.title);
  if (JSON.stringify(extTitles) !== JSON.stringify(siteTitles)) {
    console.log(`    [DIFF] Titles: extracted=[${extTitles.join(", ")}] site=[${siteTitles.join(", ")}]`);
    issues.push("Section titles differ");
  } else {
    console.log(`    [MATCH] Titles: ${extTitles.join(", ")}`);
  }

  // Compare section items
  for (let i = 0; i < Math.min(data.sections.length, siteSections.length); i++) {
    const extSec = data.sections[i];
    const siteSec = siteSections[i];
    if (extSec.title !== siteSec.title) continue;

    const extItems = extSec.items.map(s => s.replace(/\s+/g, " ").trim());
    const siteItems = siteSec.items.map(s => s.replace(/\s+/g, " ").trim());

    if (JSON.stringify(extItems) === JSON.stringify(siteItems)) {
      console.log(`    [MATCH] "${extSec.title}": ${extItems.length} items`);
    } else {
      console.log(`    [DIFF]  "${extSec.title}":`);
      for (let j = 0; j < Math.max(extItems.length, siteItems.length); j++) {
        const e = extItems[j] || "(missing)";
        const s = siteItems[j] || "(missing)";
        const match = e === s ? "✓" : "✗";
        if (match === "✗") {
          console.log(`      ${match} item ${j}: EXTRACTED="${e.slice(0,80)}" SITE="${s.slice(0,80)}"`);
          issues.push(`Section "${extSec.title}" item ${j} differs`);
        }
      }
    }
  }

  // Summary
  if (issues.length === 0) {
    console.log(`\n  ✓ ALL CONTENT MATCHES`);
  } else {
    console.log(`\n  ✗ ${issues.length} ISSUES FOUND:`);
    issues.forEach(iss => console.log(`    - ${iss}`));
  }
}
