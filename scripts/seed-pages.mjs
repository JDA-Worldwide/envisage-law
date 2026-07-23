/**
 * Seed page documents for Home, About, Contact, Legal Team, and Practice Areas.
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-pages.mjs
 *   node --env-file=.env.local scripts/seed-pages.mjs --force
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const key = () => randomUUID().slice(0, 8);

function imgRef(assetRef) {
  return { _type: "image", asset: { _type: "reference", _ref: assetRef } };
}

function block(text, style = "normal") {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

// ---------------------------------------------------------------------------
// Fetch image asset refs from globalSettings
// ---------------------------------------------------------------------------

async function getImageRefs() {
  const gs = await client.fetch(`*[_type == "globalSettings"][0] {
    "hero": heroImage.asset._ref,
    "courthouse": courthouseImage.asset._ref,
    "consultation": consultationImage.asset._ref,
    "skyline": raleighSkylineImage.asset._ref,
  }`);
  return gs;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n  Seeding page documents...\n");

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error("  Error: env vars not set.\n");
    process.exit(1);
  }

  const existing = await client.fetch(`count(*[_type == "page" && slug.current in ["home", "about", "contact", "legal-team", "practice-areas"]])`);
  if (existing > 0 && !process.argv.includes("--force")) {
    console.log("  Page documents already exist. Run with --force to overwrite.\n");
    process.exit(0);
  }

  const img = await getImageRefs();

  // =========================================================================
  // HOMEPAGE
  // =========================================================================
  console.log("  Creating homepage...");
  await client.createOrReplace({
    _id: "page-home",
    _type: "page",
    title: "Home",
    slug: { _type: "slug", current: "home" },
    modules: [
      // Hero
      {
        _key: key(),
        _type: "envisageHero",
        eyebrow: "Complex Litigation \u00B7 Strategic Counsel \u00B7 TechLaw",
        heading: "Where complex legal disputes meet cutting-edge strategy",
        subtitle: "Our attorneys have secured favorable outcomes in North Carolina and federal courts nationwide, including multi-million-dollar judgments and precedent-setting appellate victories.",
        backgroundImage: imgRef(img.hero),
        isHome: true,
        actions: [
          { _key: key(), _type: "object", label: "Contact Us", href: "/contact", variant: "teal" },
          { _key: key(), _type: "object", label: "Our Practice Areas", href: "/practice-areas", variant: "ghost" },
        ],
      },
      // Firm Intro
      {
        _key: key(),
        _type: "richTextSection",
        eyebrow: "Raleigh, North Carolina \u00B7 Nationwide Practice",
        alignment: "center",
        body: [
          block("Envisage Law represents clients in high-stakes business and intellectual property litigation, constitutional and civil rights issues, complex regulatory matters, and commercial and non-profit disputes."),
          block("Our board-certified specialists and nationally recognized litigators combine decades of courtroom experience with innovative legal strategies to secure decisive victories nationwide in federal and state courts."),
        ],
      },
      // Practice Areas Grid
      {
        _key: key(),
        _type: "practiceAreaGrid",
        heading: "Practice Areas",
        subheading: "A civil and commercial litigation firm at its core, with our deepest expertise concentrated in six clearly delineated niches.",
        colorScheme: "surface",
      },
      // Three Pillars
      {
        _key: key(),
        _type: "highlightGrid",
        eyebrow: "What Drives Us",
        heading: "Quality \u00B7 Perseverance \u00B7 Professionalism",
        variant: "numbered",
        items: [
          { _key: key(), _type: "object", title: "Quality", text: "We are good at what we do. We might not be large, but we are experienced, responsive, and committed to providing the highest quality of services. We enjoy exceeding expectations, and we like to win for our clients." },
          { _key: key(), _type: "object", title: "Perseverance", text: "We never give up pursuing our clients\u2019 objectives and are passionate for their successes. Our attorneys pride themselves in forming enduring relationships and serving their clients for decades." },
          { _key: key(), _type: "object", title: "Professionalism", text: "We believe we are answerable for how we use the gifts we have been given, to include the privilege of serving our clients\u2019 needs. We are passionate about serving our clients to the best of our abilities." },
        ],
      },
      // Credibility Band
      {
        _key: key(),
        _type: "highlightGrid",
        eyebrow: "Why Clients Choose Envisage",
        heading: "A firm that handles the cases that define legal precedent",
        variant: "dark",
        backgroundImage: imgRef(img.courthouse),
        items: [
          { _key: key(), _type: "object", title: "Proven Excellence", text: "Our attorneys have secured multi-million dollar judgments, landmark appellate victories, and precedent-setting settlements across diverse practice areas, including First Amendment defense in groundbreaking social media litigation and trademark enforcement for global brands." },
          { _key: key(), _type: "object", title: "Board-Certified Expertise", text: "Anthony Biller is one of a select few Board Certified Specialists in Trademark Law. Our team brings rare specialization to complex IP and technology disputes, and our attorneys are recognized as The Best Lawyers in America and have achieved Super Lawyers status." },
          { _key: key(), _type: "object", title: "Technology-Driven Advantage", text: "We are not afraid of technology, whether tech centered disputes or transactions or using it for our clients. We leverage cutting-edge technologies, advanced legal research platforms, and proprietary case management systems to deliver strategic advantages while also striving to deliver greater value to our clients." },
        ],
      },
      // Attorney Grid
      {
        _key: key(),
        _type: "attorneyGrid",
        heading: "Featured Attorneys",
        showStaff: false,
        colorScheme: "surface",
      },
      // Recognition
      {
        _key: key(),
        _type: "recognitionBand",
        year: "2025 Edition",
        title: "Recognized in Best Law Firms\u00AE",
        tiers: [
          { _key: key(), _type: "object", rank: "Regional Tier 1", label: "Corporate Law" },
          { _key: key(), _type: "object", rank: "Tier 2", label: "Patent Law" },
          { _key: key(), _type: "object", rank: "Tier 3", label: "Litigation \u2013 IP" },
        ],
      },
      // Insights Grid
      {
        _key: key(),
        _type: "insightsGrid",
        eyebrow: "From the Firm",
        heading: "Latest insights",
        linkLabel: "All Insights",
        linkUrl: "/insights",
        count: 3,
      },
      // CTA Band
      {
        _key: key(),
        _type: "ctaBand",
        eyebrow: "Litigation-First \u00B7 Niche by Design",
        heading: "When clients must litigate, we know how to fight and win.",
        body: "We are passionate, unrelenting, and experienced in state and federal trial, administrative, appellate and arbitral proceedings throughout North Carolina and the United States.",
        backgroundImage: imgRef(img.consultation),
        actions: [
          { _key: key(), _type: "object", label: "Contact Us", href: "/contact", variant: "teal" },
          { _key: key(), _type: "object", label: "About the Firm", href: "/about", variant: "ghost" },
        ],
      },
    ],
  });

  // =========================================================================
  // ABOUT PAGE
  // =========================================================================
  console.log("  Creating about page...");
  await client.createOrReplace({
    _id: "page-about",
    _type: "page",
    title: "About",
    slug: { _type: "slug", current: "about" },
    modules: [
      // Hero
      {
        _key: key(),
        _type: "envisageHero",
        heading: "Relentless. Fierce. Undaunted.",
        subtitle: "Excellence is a choice. Service is our calling.",
        backgroundImage: imgRef(img.hero),
        breadcrumbs: [
          { _key: key(), _type: "object", label: "Home", href: "/" },
          { _key: key(), _type: "object", label: "About" },
        ],
      },
      // Intro
      {
        _key: key(),
        _type: "richTextSection",
        alignment: "center",
        body: [
          block("At Envisage Law, daunting challenges, long odds, and entrenched interests do not deter us. We are passionate about what we do, around the clock and every day of the week. It is who we are."),
        ],
      },
      // Built to Fight
      {
        _key: key(),
        _type: "textImageSplit",
        eyebrow: "Our Team",
        heading: "Built to Fight",
        body: [
          block("Our ranks include board-certified specialists, former judicial law clerks and interns, and nationally recognized litigators who made their mark taking on power."),
          block("Our lawyers include a former Division 1 linebacker, an Airborne Ranger, a former presidentially appointed lawyer, and working mothers who have raised and taught many children. We take on cases that define legal precedent, defending fundamental rights in groundbreaking social media and constitutional litigation and enforcing trademark rights for global brands."),
        ],
        image: { ...imgRef(img.consultation), alt: "Two professionals shaking hands across a table" },
        imagePosition: "right",
        colorScheme: "surface",
      },
      // Innovation Meets Tenacity
      {
        _key: key(),
        _type: "textImageSplit",
        eyebrow: "Our Edge",
        heading: "Innovation Meets Tenacity",
        body: [
          block("Change is constant. While others play by the old rules, we rewrite them. In a profession known for its rigidity, we take pride in disrupting the status quo."),
          block("We leverage artificial intelligence, advanced legal research platforms, and proprietary case management systems to deliver more value to our clients."),
        ],
        image: { ...imgRef(img.hero), alt: "Abstract blue digital particle texture representing technology" },
        imagePosition: "left",
      },
      // Outsized Results (Stats)
      {
        _key: key(),
        _type: "statsCounter",
        eyebrow: "Our Track Record",
        heading: "Outsized Results",
        body: "Our attorneys have litigated at every level and in over thirty states, and coordinated litigation and anti-counterfeiting efforts in multiple countries. We have secured multi-million-dollar judgments, landmark appellate victories, and precedent-setting settlements across various practice areas. We want to win every time, and we make no apology for it.",
        colorScheme: "dark",
        stats: [
          { _key: key(), _type: "object", number: 30, suffix: "+", label: "States litigated in" },
          { _key: key(), _type: "object", number: 3, prefix: "$", suffix: "M+", label: "Single-matter judgments secured" },
          { _key: key(), _type: "object", number: 20, prefix: "$", suffix: "M", label: "Credit facility closed" },
          { _key: key(), _type: "object", number: 1, label: "U.S. Supreme Court admitted" },
        ],
      },
      // Areas of Focus
      {
        _key: key(),
        _type: "highlightGrid",
        eyebrow: "Where We Concentrate",
        heading: "Areas of Focus",
        variant: "chips",
        colorScheme: "surface",
        items: [
          { _key: key(), _type: "object", title: "IP Litigation" },
          { _key: key(), _type: "object", title: "Complex Commercial Litigation" },
          { _key: key(), _type: "object", title: "Technology Law" },
          { _key: key(), _type: "object", title: "Regulatory Disputes & Analysis" },
          { _key: key(), _type: "object", title: "Constitutional & First Amendment" },
          { _key: key(), _type: "object", title: "Appellate Practice" },
          { _key: key(), _type: "object", title: "Contracts & Licensing" },
          { _key: key(), _type: "object", title: "Trademark & Copyright" },
        ],
      },
      // Envisage Standard
      {
        _key: key(),
        _type: "highlightGrid",
        eyebrow: "The Envisage Standard",
        heading: "Proven Excellence \u00B7 Board-Certified Expertise \u00B7 Technology-Driven",
        variant: "light",
        items: [
          { _key: key(), _type: "object", title: "Proven Excellence", text: "Multi-million dollar judgments, landmark appellate victories, and precedent-setting settlements across our practice. We defend First Amendment rights in groundbreaking social media litigation and enforce trademark rights for global brands." },
          { _key: key(), _type: "object", title: "Board-Certified Expertise", text: "Anthony Biller is one of a select few Board Certified Specialists in Trademark Law. Our attorneys are recognized as The Best Lawyers in America and have achieved Super Lawyers status." },
          { _key: key(), _type: "object", title: "Technology-Driven Advantage", text: "We are not afraid of technology, whether tech centered disputes or transactions or using it for our clients. We leverage cutting-edge technologies, advanced legal research platforms, and proprietary case management systems to deliver strategic advantages while also striving to deliver greater value to our clients." },
        ],
      },
      // CTA
      {
        _key: key(),
        _type: "ctaBand",
        eyebrow: "Work With Us",
        heading: "Service is our calling.",
        backgroundImage: imgRef(img.consultation),
        actions: [
          { _key: key(), _type: "object", label: "Contact Us", href: "/contact", variant: "teal" },
          { _key: key(), _type: "object", label: "Meet the Team", href: "/legal-team", variant: "ghost" },
        ],
      },
    ],
  });

  // =========================================================================
  // CONTACT PAGE
  // =========================================================================
  console.log("  Creating contact page...");
  await client.createOrReplace({
    _id: "page-contact",
    _type: "page",
    title: "Contact",
    slug: { _type: "slug", current: "contact" },
    modules: [
      // Hero
      {
        _key: key(),
        _type: "envisageHero",
        heading: "Contact Envisage Law",
        subtitle: "Reach an attorney directly. We respond personally, with no intake form to fill out.",
        backgroundImage: imgRef(img.skyline),
        breadcrumbs: [
          { _key: key(), _type: "object", label: "Home", href: "/" },
          { _key: key(), _type: "object", label: "Contact" },
        ],
      },
      // Contact Methods
      {
        _key: key(),
        _type: "contactMethods",
        methods: [
          { _key: key(), _type: "object", icon: "phone", label: "Call", value: "919.268.8998", note: "Speak with our team directly.", href: "tel:9192688998", style: "solid" },
          { _key: key(), _type: "object", icon: "mapPin", label: "Mailing Address", value: "Envisage Law\nPO Box 30099\nRaleigh, NC 27622", note: "Correspondence is received by PO Box only.", style: "solid" },
          { _key: key(), _type: "object", icon: "creditCard", label: "Payments", value: "Online via LawPay", note: "Secure payment link coming soon.", style: "dashed" },
        ],
      },
      // Disclaimer
      {
        _key: key(),
        _type: "richTextSection",
        body: [
          block("Please do not send confidential or time-sensitive information until an attorney\u2013client relationship has been established. Contacting Envisage Law does not by itself create such a relationship."),
        ],
      },
      // Locations
      {
        _key: key(),
        _type: "locationGrid",
        heading: "Where We Work",
        body: "Attorneys are conveniently located in Raleigh, NC, Asheville, NC, and Columbia, TN, serving clients in federal and state courts throughout North Carolina and nationwide.",
        colorScheme: "surface",
        locations: [
          { _key: key(), _type: "object", city: "Raleigh, NC", label: "Primary office" },
          { _key: key(), _type: "object", city: "Asheville, NC", label: "Attorney location" },
          { _key: key(), _type: "object", city: "Columbia, TN", label: "Attorney location" },
        ],
      },
      // Skyline Band
      {
        _key: key(),
        _type: "imageBand",
        image: imgRef(img.skyline),
        heading: "Proudly based in<br />Raleigh, North Carolina.",
        height: 420,
      },
    ],
  });

  // =========================================================================
  // LEGAL TEAM PAGE
  // =========================================================================
  console.log("  Creating legal team page...");
  await client.createOrReplace({
    _id: "page-legal-team",
    _type: "page",
    title: "Legal Team",
    slug: { _type: "slug", current: "legal-team" },
    modules: [
      // Hero
      {
        _key: key(),
        _type: "envisageHero",
        heading: "Built to Fight",
        subtitle: "Our attorneys have litigated at every level and in over thirty states, and coordinated litigation and anti-counterfeiting efforts in multiple countries. We have secured multi-million-dollar judgments, landmark appellate victories, and precedent-setting settlements across various practice areas.",
        backgroundImage: imgRef(img.courthouse),
        breadcrumbs: [
          { _key: key(), _type: "object", label: "Home", href: "/" },
          { _key: key(), _type: "object", label: "Legal Team" },
        ],
      },
      // Attorney & Staff Grid
      {
        _key: key(),
        _type: "attorneyGrid",
        heading: "Attorneys and Legal Team",
        showStaff: true,
      },
      // Recognition
      {
        _key: key(),
        _type: "recognitionBand",
        year: "2025 Edition",
        title: "Recognized in Best Law Firms\u00AE",
        tiers: [
          { _key: key(), _type: "object", rank: "Regional Tier 1", label: "Corporate Law" },
          { _key: key(), _type: "object", rank: "Tier 2", label: "Patent Law" },
          { _key: key(), _type: "object", rank: "Tier 3", label: "Litigation \u2013 IP" },
        ],
      },
      // CTA
      {
        _key: key(),
        _type: "ctaBand",
        eyebrow: "Start a conversation",
        heading: "Call to speak with our team.",
        backgroundImage: imgRef(img.consultation),
        actions: [
          { _key: key(), _type: "object", label: "Contact Us", href: "/contact", variant: "teal" },
        ],
      },
    ],
  });

  // =========================================================================
  // PRACTICE AREAS PAGE
  // =========================================================================
  console.log("  Creating practice areas page...");
  await client.createOrReplace({
    _id: "page-practice-areas",
    _type: "page",
    title: "Practice Areas",
    slug: { _type: "slug", current: "practice-areas" },
    modules: [
      // Hero
      {
        _key: key(),
        _type: "envisageHero",
        heading: "Practice Areas",
        subtitle: "Six clearly delineated niches, the sweet spots where a litigation-first boutique goes deep.",
        backgroundImage: imgRef(img.hero),
        breadcrumbs: [
          { _key: key(), _type: "object", label: "Home", href: "/" },
          { _key: key(), _type: "object", label: "Practice Areas" },
        ],
      },
      // Hub Positioning
      {
        _key: key(),
        _type: "richTextSection",
        eyebrow: "Litigation-First by Design",
        body: [
          block("Envisage handles civil disputes and complex matters. From complex patent infringement to routine breach of contract, we are comfortable helping our clients solve problems. We have six niches in which we particularly enjoy serving our clients."),
        ],
      },
      // Practice Area Grid
      {
        _key: key(),
        _type: "practiceAreaGrid",
        heading: "The Six Niches",
      },
      // We're on your side callout
      {
        _key: key(),
        _type: "richTextSection",
        heading: "We\u2019re on your side",
        colorScheme: "surface",
        body: [
          block("We strive to help clients avoid disputes; when they arise, we work to resolve them and keep clients out of court. When clients must litigate, we know how to fight and win across state, federal trial, administrative, appellate and arbitral proceedings throughout North Carolina and the United States. Envisage litigators are admitted across federal and state courts in NC and federal jurisdictions nationwide, including the Trademark Trial and Appeal Board, federal Courts of Appeal, and the U.S. Supreme Court."),
        ],
      },
      // CTA
      {
        _key: key(),
        _type: "ctaBand",
        eyebrow: "Have a Matter in One of These Niches?",
        heading: "Let\u2019s talk about your case.",
        body: "Direct pathways only. Reach an attorney by phone or email.",
        backgroundImage: imgRef(img.consultation),
        actions: [
          { _key: key(), _type: "object", label: "Contact Us", href: "/contact", variant: "teal" },
          { _key: key(), _type: "object", label: "Meet the Legal Team", href: "/legal-team", variant: "ghost" },
        ],
      },
    ],
  });

  console.log("\n  Done! 5 page documents created.\n");
  console.log("  Visit http://localhost:3000/studio → Pages to see them.\n");
}

main().catch((err) => {
  console.error("\n  Seed failed:", err.message, "\n");
  process.exit(1);
});
