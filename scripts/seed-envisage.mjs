/**
 * Envisage Law — Seed Script
 *
 * Migrates hardcoded data from src/lib/data.ts into Sanity documents.
 *
 * Usage:
 *   node scripts/seed-envisage.mjs            # skip if data exists
 *   node scripts/seed-envisage.mjs --force     # overwrite existing
 *
 * Required env vars (from .env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_TOKEN          (needs write permissions)
 */

import { createClient } from "@sanity/client";
import { randomUUID } from "crypto";
import https from "https";
import http from "http";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const key = () => randomUUID().slice(0, 8);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function downloadBuffer(url) {
  const lib = url.startsWith("https") ? https : http;
  return new Promise((resolve, reject) => {
    lib
      .get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return downloadBuffer(res.headers.location).then(resolve, reject);
        }
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
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

function imageRef(assetId, alt) {
  return {
    _type: "image",
    asset: { _type: "reference", _ref: assetId },
    alt,
  };
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

function ref(id) {
  return { _type: "reference", _ref: id };
}

// ---------------------------------------------------------------------------
// Data (mirrored from src/lib/data.ts)
// ---------------------------------------------------------------------------

const attorneys = [
  {
    _id: "attorney-anthony-biller",
    slug: "anthony-biller",
    name: 'Anthony J. "Tony" Biller',
    role: "Partner",
    niche: "IP & Technology",
    email: "ajbiller@envisage.law",
    phone: "(984) 344-9191",
    photo: "https://envisage.law/wp-content/uploads/2022/08/Anthony-Biller-530-x-548.png",
    order: 1,
    credentialTitle: "Board Certified Specialist",
    credentialSubtitle: "NC State Bar · Trademark Law",
    bio: [
      "Tony is a litigator and business attorney. He helps clients investigate, identify and solve business and legal problems ranging from all forms of lawsuits and legal disputes to setting up, operating or ending a business, and detailed contract and licensing negotiations.",
      "He has litigated hundreds of commercial disputes in federal and state trial and appellate courts nationwide. He helps clients select, screen, register and manage trademarks and portfolios worldwide, and has extensive experience with patent, copyright, and trade secret needs and policies. The North Carolina State Bar recognizes Tony as a certified trademark specialist.",
      "Given the recent dramatic expansion of government regulation, he has been heavily engaged in constitutional litigation in trial and appellate courts across the country. Prior to starting Envisage, Tony was an office managing partner for an AmLaw 200 firm, and before that an executive committee partner in a North Carolina boutique patent law firm.",
      "Before private practice, Tony served as a U.S. District Court judicial clerk to the Honorable William L. Osteen, Sr. He began his legal career after serving four years as an Army Airborne Ranger in the 82nd Airborne Division, where he advanced to Captain.",
    ],
    practiceAreaTags: [
      { label: "Trademarks, Copyrights & Trade Secrets", practiceAreaSlug: "ip-technology" },
      { label: "Litigation" },
      { label: "Business Transactions" },
      { label: "Corporate & Business Law" },
      { label: "Regulatory", practiceAreaSlug: "regulatory-healthcare" },
    ],
    profileSections: [
      {
        _type: "keyValueList",
        title: "Court Admissions",
        entries: [
          { label: "State", value: "North Carolina" },
          { label: "Federal Trial Courts", value: "U.S. Court of Federal Claims · U.S. District Courts for the M.D.N.C., E.D.N.C., W.D.N.C., W.D. Michigan, and Colorado" },
          { label: "Appellate Courts", value: "U.S. Courts of Appeals for the Federal, Fourth, Sixth, and Eleventh Circuits · U.S. Supreme Court" },
        ],
      },
      {
        _type: "bulletList",
        title: "Education",
        items: [
          "Campbell University, J.D., magna cum laude, Managing Editor of the Campbell Law Review (1997)",
          "Purdue University, B.A., Distinguished Military Graduate",
          "Erasmus University Rotterdam (1989)",
        ],
      },
      {
        _type: "bulletList",
        title: "Honors & Recognition",
        items: [
          "NC State Bar Board Certified Specialist, Trademark Law (2013–present)",
          "NC Supreme Court 2023 Pro Bono Honor Society",
          "Best Lawyers in America®, Litigation – IP / Patent Law (2018–2025)",
          "Influencers in Law (2019)",
          "Legal Elite Hall of Fame (2013)",
          "Lexology Client Choice Award (2013)",
        ],
      },
      {
        _type: "bulletList",
        title: "Prior Experience",
        items: [
          "Managing Partner, Raleigh Office, Michael Best & Friedrich LLP (2018–2020)",
          "Member / Executive Committee, Coats & Bennett PLLC (2000–2018)",
          "Litigation Associate, Maupin Taylor & Ellis PA (1998–2000)",
          "Judicial Clerk, Hon. William L. Osteen, Sr., M.D.N.C. (1997–1998)",
          "Captain, U.S. Army, 82nd Airborne Division (1990–1994)",
        ],
      },
      {
        _type: "bulletList",
        title: "Representative Matters",
        items: [
          "Obtained a finding of willful patent infringement, permanent injunction, and $3M summary-judgment award against a Fortune 100 retailer for a textile manufacturer (E.D.N.C.)",
          "Co-chaired jury trial winning willful trademark infringement and cybersquatting verdict for a luxury retail brand (W.D.N.C.)",
          "Won summary judgment of non-infringement between restaurant chains (S.D. Fla.) and argued/won the appeal (11th Cir.)",
          "Obtained preliminary injunction for NC bowlers on state constitutional claims against executive orders and defended emergency appeal to the NC Supreme Court",
          "Led seizure of counterfeit health-supplement products in the M.D.N.C.",
        ],
      },
      {
        _type: "bulletList",
        title: "Memberships & Community Involvement",
        items: [
          "ABA litigation & IP groups · International Trademark Association · Federalist Society",
          "Alliance Defending Freedom, National Litigation Honor Corps",
          "Board of Directors, Answers in Genesis and Capitol Commission",
          "Married 30+ years, 10 children; soccer coach",
        ],
      },
    ],
  },
  {
    _id: "attorney-james-lawrence",
    slug: "james-lawrence",
    name: "James R. Lawrence III",
    role: "Partner",
    niche: "Regulatory & Healthcare",
    email: "jlawrence@envisage.law",
    phone: null,
    order: 2,
    credentialTitle: "Former FDA Chief Counsel",
    credentialSubtitle: "Leads Health Care & Life Sciences",
    bio: [
      "James helps clients solve business, legal, and regulatory problems across the full lifecycle of businesses and nonprofits, in the courtroom and the board room alike. As a former general counsel, his practice spans litigation, IP, complex commercial transactions, corporate governance, M&A, and labor & employment.",
      "He litigates patent, trademark, copyright, trade secret, unfair competition, and complex commercial disputes, serving as lead counsel in trials and appeals. A biomedical engineer, James leads Envisage's Health Care and Life Sciences practice and understands medical technology from a developer's perspective.",
      "He served as Deputy General Counsel at the U.S. Department of Health and Human Services and as Chief Counsel of the FDA, working during the COVID-19 pandemic on regulatory reform and drug pricing. That work gave him a rare perspective on the Administrative Procedure Act, the Food, Drug, and Cosmetic Act, and HIPAA.",
      "Among his litigation victories, James served as lead counsel for independent journalist and former New York Times reporter Alex Berenson in his lawsuit against Twitter, a path-breaking case that led to Berenson's reinstatement, the first known reinstatement of its kind, covered by national outlets and discussed on national podcasts.",
      "A native of Raleigh, he earned a B.S. in Biomedical Engineering, magna cum laude, from NC State and a J.D. with honors from UNC\u2013Chapel Hill, where he was an Articles Editor on the North Carolina Law Review and a Judicial Extern to the Hon. Paul M. Newby on the NC Supreme Court.",
    ],
    photo: "https://envisage.law/wp-content/uploads/2021/04/james-lawrence-210408-530-548.jpg",
    practiceAreaTags: [
      { label: "Regulatory", practiceAreaSlug: "regulatory-healthcare" },
      { label: "Litigation" },
      { label: "Intellectual Property", practiceAreaSlug: "ip-technology" },
      { label: "Complex Commercial Transactions" },
      { label: "Corporate Governance" },
      { label: "M&A" },
      { label: "Labor & Employment" },
      { label: "Corporate Investigations" },
    ],
    profileSections: [
      {
        _type: "keyValueList",
        title: "Court Admissions",
        entries: [
          { label: "State", value: "All NC State Courts · NC Business Court" },
          { label: "Federal Trial Courts", value: "U.S. District Courts E.D.N.C., M.D.N.C., W.D.N.C., E.D. Tenn." },
          { label: "Appellate Courts", value: "U.S. Courts of Appeals for the Fourth and Federal Circuits" },
        ],
      },
      {
        _type: "bulletList",
        title: "Education",
        items: [
          "UNC\u2013Chapel Hill School of Law, J.D., with honors. Articles Editor, NC Law Review; Joyner Award",
          "NC State University, B.S. Biomedical Engineering, magna cum laude. Benjamin Franklin Scholar",
        ],
      },
      {
        _type: "bulletList",
        title: "Honors",
        items: ["Tau Beta Pi", "Phi Beta Kappa", "Phi Kappa Phi"],
      },
      {
        _type: "bulletList",
        title: "Prior Employment",
        items: [
          "U.S. Department of Health & Human Services",
          "Michael Best & Friedrich LLP",
          "Crown Laboratories",
          "Coats & Bennett",
          "Accenture",
          "AVOS Life Sciences (acquired by Syneos Health)",
        ],
      },
      {
        _type: "bulletList",
        title: "Representative Matters",
        items: [
          "Lead trial counsel for a plaintiff life-sciences company in a false designation of origin / false advertising / UDTPA action (confidential settlement)",
          "Represented a life-sciences company in its acquisition by a private equity firm, covering all aspects of diligence, negotiation, and closing",
          "Lead trademark trial counsel to an apparel company in a bankruptcy adversary proceeding",
          "Closed a $20M senior secured credit facility as counsel to borrower",
          "Won partial summary judgment on a dispositive contract issue for a plaintiff academic association in a contract/copyright dispute",
        ],
      },
    ],
  },
  {
    _id: "attorney-adam-banks",
    slug: "adam-banks",
    name: "Adam P. Banks",
    role: "Partner",
    niche: "Construction · Nonprofit · HOA",
    email: null,
    phone: null,
    photo: "https://envisage.law/wp-content/uploads/2021/04/adam-banks-61-210407-530-548.jpg",
    order: 3,
    bio: [],
    practiceAreaTags: [],
    profileSections: [],
  },
  {
    _id: "attorney-joelle-harvill",
    slug: "joelle-harvill",
    name: 'Allison "Joelle" Harvill',
    role: "Attorney",
    niche: "Data Privacy & Security",
    email: null,
    phone: null,
    photo: "https://envisage.law/wp-content/uploads/2021/10/Allison-Joelle-Harvill-Attorney-530-x-548.jpg",
    order: 4,
    bio: [],
    practiceAreaTags: [],
    profileSections: [],
  },
  {
    _id: "attorney-tara-seidel",
    slug: "tara-seidel",
    name: "Tara Seidel",
    role: "Attorney",
    niche: "",
    email: null,
    phone: null,
    photo: "https://envisage.law/wp-content/uploads/2022/09/Tara-Seidel-1.png",
    order: 5,
    bio: [],
    practiceAreaTags: [],
    profileSections: [],
  },
  {
    _id: "attorney-danielle-rose",
    slug: "danielle-rose",
    name: "Danielle Rose",
    role: "Attorney",
    niche: "",
    email: null,
    phone: null,
    photo: "https://envisage.law/wp-content/uploads/2023/08/Danielle-Rose-530-x-548.png",
    order: 6,
    bio: [],
    practiceAreaTags: [],
    profileSections: [],
  },
  {
    _id: "attorney-sophie-vouvalis",
    slug: "sophie-vouvalis",
    name: "Sophie Vouvalis",
    role: "Associate Attorney",
    niche: "",
    email: null,
    phone: null,
    photo: "https://envisage.law/wp-content/uploads/2024/10/Sophie-Vouvalis-Attorney-530-x-548.png",
    order: 7,
    bio: [],
    practiceAreaTags: [],
    profileSections: [],
  },
  {
    _id: "attorney-jay-thomas",
    slug: "jay-thomas",
    name: "Jay C. Thomas",
    role: "Associate Attorney",
    niche: "",
    email: null,
    phone: null,
    photo: "https://envisage.law/wp-content/uploads/2024/10/Joy-Thomas-Envisage-Law-530-x-548.png",
    order: 8,
    bio: [],
    practiceAreaTags: [],
    profileSections: [],
  },
];

const staffMembers = [
  {
    _id: "staff-lesley-biller",
    name: "Lesley Biller",
    role: "IP Administrator",
    photo: "https://envisage.law/wp-content/uploads/2021/04/lesley-biller-210408-530-548.jpg",
    order: 1,
  },
  {
    _id: "staff-april-bowes",
    name: "April Bowes",
    role: "NC Certified Paralegal",
    photo: "https://envisage.law/wp-content/uploads/2022/09/April-Bowes-Envisage-Law.png",
    order: 2,
  },
  {
    _id: "staff-sarah-mcgrath",
    name: "Sarah McGrath",
    role: "Paralegal",
    photo: "https://envisage.law/wp-content/uploads/2025/09/Sarah-McGrath-Legal-Administrative-Assistant.jpg",
    order: 3,
  },
  {
    _id: "staff-jennifer-partridge",
    name: "Jennifer Partridge",
    role: "Paralegal",
    photo: null,
    initials: "JP",
    order: 4,
  },
];

const practiceAreas = [
  {
    _id: "practice-ip-technology",
    slug: "ip-technology",
    title: "IP & Technology",
    icon: "ip",
    order: 1,
    standfirst: "We are comfortable in the technology trenches - such as helping clients with technology development contracts and litigating software disputes.",
    heroSubtitle: "Protecting the identities, content, ideas and secrets that give your business its competitive advantage.",
    capabilities: [
      "Trademark research, clearance, registration and maintenance",
      "Patent, trademark, copyright and trade secret infringement, defense and invalidity studies",
      "Copyright registrations and agreements",
      "Trade secret protection and policies",
      "Licensing",
      "Nationwide IP litigation experience",
    ],
    featuredCapability: {
      eyebrow: "Featured Capability · Ongoing Relationship",
      title: "Trademark Portfolio Management",
      description: "Portfolio selection, clearance, registration, policing, and enforcement, managed worldwide as an ongoing relationship rather than a single filing. We treat your marks as a living asset, watching for conflicts and acting before they become disputes.",
      tags: ["Selection", "Clearance", "Registration", "Policing", "Enforcement"],
    },
    anchoringAttorneyId: "attorney-anthony-biller",
    anchoringHeading: "Led by a Board-Certified Trademark Specialist",
    anchoringRoleLabel: "Partner · NC Board Certified Specialist, Trademark Law",
    anchoringDescription: "Tony has litigated hundreds of commercial disputes in federal and state trial courts and appellate courts nationwide, and helps clients select, screen, register and manage trademarks and portfolios worldwide. The North Carolina State Bar recognizes him as a certified trademark specialist.",
    ctaHeading: "Discuss an IP or technology matter",
    body: [
      "We help clients protect their identities, content, ideas and secrets. Intellectual property may be what gives your business a competitive advantage, recognition, or even an existence in the marketplace.",
      "We work with businesses, inventors, startups, and marketing teams alike to identify, clear, protect, manage and exploit these most important assets, helping clients extract maximum value. We manage portfolios worldwide and combine technical legal advice with practical, business-oriented solutions.",
    ],
  },
  {
    _id: "practice-regulatory-healthcare",
    slug: "regulatory-healthcare",
    title: "Regulatory & Healthcare",
    icon: "regulatory",
    order: 2,
    standfirst: "Positioning clients for success under FDA, HIPAA, FIFRA and complex federal and state regulatory regimes.",
    heroSubtitle: "Positioning clients for success under FDA, HIPAA, FIFRA and complex federal and state regulatory regimes.",
    anchoringAttorneyId: "attorney-james-lawrence",
    anchoringHeading: "Led by James R. Lawrence III",
    anchoringDescription: "James leads the firm's Health Care and Life Sciences practice, bringing rare insider perspective from his service as FDA Chief Counsel and HHS Deputy General Counsel.",
    ctaHeading: "Discuss a regulatory or healthcare matter",
    body: [],
    capabilities: [],
  },
  {
    _id: "practice-construction-commercial",
    slug: "construction-commercial",
    title: "Construction & Commercial",
    icon: "construction",
    order: 3,
    standfirst: "Litigation for construction firms, contractors and developers across North Carolina and nationwide.",
    heroSubtitle: "Litigation for construction firms, contractors, and developers across North Carolina and nationwide.",
    anchoringAttorneyId: "attorney-adam-banks",
    anchoringHeading: "Led by Adam P. Banks",
    anchoringDescription: "Adam anchors the firm's construction, commercial litigation, nonprofit, and HOA practices, bringing extensive trial and appellate experience to disputes across North Carolina and nationwide.",
    ctaHeading: "Discuss a construction matter",
    body: [
      "We represent construction firms, contractors, and developers in payment, delay, defect, and commercial disputes across North Carolina and nationwide.",
      "Lien rights, contract mechanics, and early-resolution strategy sit at the center of the work, escalating to trial when a matter demands it. We bring decades of litigation experience to disputes that range from subcontractor payment claims to complex multi-party construction defect actions.",
    ],
    capabilities: [],
  },
  {
    _id: "practice-nonprofit-ministry",
    slug: "nonprofit-ministry",
    title: "Nonprofit & Ministry",
    icon: "nonprofit",
    order: 4,
    standfirst: "Counsel for nonprofits, religious organizations and churches on disputes and governance.",
    heroSubtitle: "Counsel for nonprofits, religious organizations and churches on disputes and governance.",
    anchoringAttorneyId: "attorney-adam-banks",
    anchoringHeading: "Led by Adam P. Banks",
    anchoringDescription: "Adam represents nonprofits, churches, and religious organizations in governance disputes, employment matters, and regulatory compliance across North Carolina.",
    ctaHeading: "Discuss a nonprofit or ministry matter",
    body: [],
    capabilities: [],
  },
  {
    _id: "practice-hoa-community",
    slug: "hoa-community",
    title: "HOA & Community Association",
    icon: "hoa",
    order: 5,
    standfirst: "Representing HOA boards, homeowners and community associations across North Carolina.",
    heroSubtitle: "Representing HOA boards, homeowners and community associations across North Carolina.",
    anchoringAttorneyId: "attorney-adam-banks",
    anchoringHeading: "Led by Adam P. Banks",
    anchoringDescription: "Adam represents HOA boards, homeowners, and community associations in covenant enforcement, governance disputes, and collections across North Carolina.",
    ctaHeading: "Discuss an HOA or community association matter",
    body: [],
    capabilities: [],
  },
  {
    _id: "practice-data-privacy",
    slug: "data-privacy",
    title: "Data Privacy & Security",
    icon: "data",
    order: 6,
    standfirst: "Guiding companies that handle regulated data through cross-border and multi-party matters.",
    heroSubtitle: "Guiding companies that handle regulated data through cross-border and multi-party matters.",
    anchoringAttorneyId: "attorney-joelle-harvill",
    anchoringHeading: 'Led by Allison "Joelle" Harvill',
    anchoringDescription: "Joelle guides companies through data privacy compliance, breach response, and cross-border data matters.",
    ctaHeading: "Discuss a data privacy matter",
    body: [],
    capabilities: [],
  },
];

const articles = [
  { slug: "protecting-your-brand-trademark-selection-clearance", tag: "IP & Technology", date: "2025-12-01", featured: true, title: "Protecting Your Brand: A Strategic Guide to Trademark Selection and Clearance", excerpt: "The biblical principle that \u201Ca good name is more desirable than great riches\u201D (Proverbs 22:1) resonates profoundly in today\u2019s marketplace, where your brand identity represents the cornerstone of your business\u2019s goodwill and reputation.", authorId: "attorney-anthony-biller" },
  { slug: "nc-personal-privacy-protection-act-nonprofits", tag: "Nonprofit & Ministry", date: "2025-11-01", title: "North Carolina\u2019s New Personal Privacy Protection Act: What Nonprofits Need to Know", excerpt: "Starting December 1, 2025, a new North Carolina law gives nonprofits stronger tools to protect their supporters\u2019 privacy. Known as the Personal Privacy Protection Act (Session Law 2025-79), this law is now part of Chapter 55A, the state\u2019s Nonprofit Corporation Act.", authorId: "attorney-joelle-harvill" },
  { slug: "open-source-ai-and-the-law", tag: "Data Privacy & Security", date: "2025-10-20", title: "Open Source, AI, and the Law: A Week of Insight and Innovation", excerpt: "On October 13, 2025, I kicked off a week immersed in the dynamic intersection of technology and law. My journey began at All Things Open 2025\u2014the largest open-source, tech, and web conference on the East Coast\u2014hosted in Raleigh, North Carolina, one of the nation\u2019s fastest-growing technology hubs.", authorId: "attorney-joelle-harvill" },
  { slug: "nc-supreme-court-greenlights-claims-insurance-agent", tag: "Construction & Commercial", date: "2025-05-30", title: "North Carolina Supreme Court Greenlights Claims Against Insurance Agent", excerpt: "Last week, in an opinion with implications for small businesses and insurance brokers, the Supreme Court of North Carolina ruled that a homeowner who \u201Ctrusted\u201D in an insurance agent\u2019s \u201Cassurance that it would accurately fill out the application\u201D stated a claim for negligence and punitive damages.", authorId: "attorney-james-lawrence" },
  { slug: "neuralink-files-telepathy-telekinesis-trademarks", tag: "IP & Technology", date: "2025-03-09", title: "Neuralink Files \u2018Telepathy\u2019 and \u2018Telekinesis\u2019 Trademarks", excerpt: "Elon Musk\u2019s brain implant company Neuralink has filed trademark applications for futuristic terms like \u2018Telepathy\u2019 and \u2018Telekinesis\u2019 with the United States Patent and Trademark Office, signaling ambitious plans for brain-computer interface technology that could revolutionize human-machine interaction and communication.", authorId: "attorney-anthony-biller" },
  { slug: "envisage-law-expands-western-north-carolina", tag: "Firm News", date: "2025-01-25", title: "Envisage Law Expands Into Vibrant Western North Carolina", excerpt: "Exciting news for Western North Carolina! We\u2019re thrilled to announce that Adam Banks, a partner at Envisage Law, has relocated to Asheville.", authorName: "Envisage Law" },
  { slug: "big-four-camels-nose-lawfirm-tent", tag: "Firm News", date: "2025-01-19", title: "The Big Four\u2019s Camel\u2019s Nose Is About to Get in the Lawfirm Tent", excerpt: "KPMG, one of the Big Four accounting firms, has taken a significant step towards entering the US legal services market. On January 14, 2025, the Arizona Supreme Court\u2019s Committee on Alternative Business Structures unanimously recommended that KPMG Law US, a subsidiary of KPMG, be granted a license to operate as an alternative business structure (ABS) in Arizona.", authorId: "attorney-anthony-biller" },
  { slug: "understanding-nc-land-use-approvals", tag: "Construction & Commercial", date: "2024-08-27", title: "Understanding North Carolina Land Use Approvals", excerpt: "More than 500 counties and municipalities in North Carolina have adopted some sort of zoning and land use ordinance. In general terms, these ordinances have two broad functions.", authorName: "Michael B. Kent, Jr." },
  { slug: "court-rules-covid-19-orders-violated-constitution", tag: "Regulatory & Healthcare", date: "2024-05-05", title: "Court Rules That COVID-19 Orders Violated Constitution", excerpt: "The North Carolina Court of Appeals recently issued an important decision addressing one of Governor Cooper\u2019s COVID-19 \u2018lockdown\u2019 orders. In North Carolina Bar & Tavern Association v. Cooper, the Court ruled that the order violated the North Carolina Constitution by allowing some businesses to reopen while forcing others to remain closed.", authorName: "Michael B. Kent, Jr." },
  { slug: "short-term-rental-regulation-north-carolina", tag: "Construction & Commercial", date: "2024-03-24", title: "Short-Term Rental Regulation in North Carolina", excerpt: "As one of the most visited states in America, North Carolina has seen a surge in short-term rentals (think Airbnb or Vrbo). This growing sector of the economy has brought both opportunities and challenges.", authorName: "Michael B. Kent, Jr." },
  { slug: "federal-court-upholds-property-rights", tag: "Regulatory & Healthcare", date: "2024-02-17", title: "Federal Court Upholds Property Rights Against Government Intrusion", excerpt: "Last month, a federal appeals court issued an important decision curbing the government\u2019s ability to use a criminal investigation of one party to search and seize property belonging to another. In Snitko v. United States, the Ninth Circuit Court of Appeals held that federal agents violated the constitutional rights of several hundred citizens when they opened and attempted to seize the contents of safe deposit boxes located at a raided facility.", authorName: "Michael B. Kent, Jr." },
  { slug: "corporate-transparency-act-goes-into-effect", tag: "Construction & Commercial", date: "2024-01-05", title: "The Corporate Transparency Act Goes Into Effect", excerpt: "The Corporate Transparency Act (31 U.S.C. \u00A7 5336 and regulations at 31 C.F.R. 1010.380), goes into effect in January 2024 and may impact your small business by requiring you to report information about your business ownership to the federal government. Failure to comply with these reporting requirements could result in the imposition of civil and criminal penalties.", authorId: "attorney-tara-seidel" },
  { slug: "importance-of-recording-leases-options-real-estate", tag: "Construction & Commercial", date: "2023-12-17", title: "The Importance of Recording Leases, Options, and Other Interests in Real Estate", excerpt: "Do leases, options, and similar \u2018non-ownership\u2019 interests in real estate need to be recorded with the register of deeds? The North Carolina Court of Appeals addressed this issue earlier this year in Greaseoutlet.com, LLC v. MK South II, LLC.", authorName: "Michael B. Kent, Jr." },
  { slug: "suit-challenging-covid-19-lockdown-orders", tag: "Regulatory & Healthcare", date: "2023-09-16", title: "Suit Challenging COVID-19 \u201CLockdown\u201D Orders Allowed to Continue", excerpt: "The North Carolina Court of Appeals this month addressed important issues concerning the scope of governmental emergency powers. In Howell v. Cooper, the Court held that the doctrine of \u2018sovereign immunity\u2019 did not bar a lawsuit challenging the constitutionality of Governor Cooper\u2019s COVID-19 \u2018lockdown\u2019 orders.", authorName: "Michael B. Kent, Jr." },
  { slug: "envisage-attorneys-snag-prestigious-accolades", tag: "Firm News", date: "2021-10-04", title: "Envisage Attorneys Snag Several Prestigious Accolades", excerpt: "Tony has again been recognized in the exclusive ranks of The Best Lawyers in America for intellectual property litigation and patent law.", authorName: "Envisage Law" },
  { slug: "envisage-law-taps-former-hhs-fda-chief-counsel", tag: "Firm News", date: "2021-05-10", title: "Envisage Law Taps Former HHS Deputy General Counsel and FDA Chief Counsel to Lead Health Care and Life Sciences Practice", excerpt: "Envisage Law, a full-service business law firm, today announced the hire of James Lawrence to lead the firm\u2019s Health Care and Life Sciences Practice. Lawrence joins Envisage after serving as a Deputy General Counsel in the United States Department of Health and Human Services and as Chief Counsel of the Food and Drug Administration.", authorName: "Envisage Law" },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("\n  Seeding Envisage Law content...\n");

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
    console.error("  Error: NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN must be set.");
    console.error("  Make sure .env.local is populated before running this script.\n");
    process.exit(1);
  }

  const checkIds = ["attorney-anthony-biller", "practice-ip-technology"];
  const existing = await client.fetch(`count(*[_id in $ids])`, { ids: checkIds });

  if (existing > 0 && !process.argv.includes("--force")) {
    console.log("  Envisage seed data already exists. Run with --force to overwrite.\n");
    process.exit(0);
  }

  // -------------------------------------------------------------------------
  // 1. Upload attorney & staff photos
  // -------------------------------------------------------------------------
  console.log("  Uploading attorney photos...");

  const photoAssets = {};

  for (const a of attorneys) {
    if (!a.photo) continue;
    process.stdout.write(`    ${a.slug}...`);
    try {
      photoAssets[a._id] = await uploadImage(a.photo, `attorney-${a.slug}.jpg`);
      console.log(" done");
    } catch (err) {
      console.log(` FAILED: ${err.message}`);
    }
  }

  console.log("\n  Uploading staff photos...");

  for (const s of staffMembers) {
    if (!s.photo) continue;
    const staffKey = s._id;
    process.stdout.write(`    ${s.name}...`);
    try {
      photoAssets[staffKey] = await uploadImage(s.photo, `staff-${s.name.toLowerCase().replace(/\s+/g, "-")}.jpg`);
      console.log(" done");
    } catch (err) {
      console.log(` FAILED: ${err.message}`);
    }
  }

  // -------------------------------------------------------------------------
  // 2. Create attorneys (without practiceAreaTag refs — those need practice areas)
  // -------------------------------------------------------------------------
  console.log("\n  Creating attorneys...");

  for (const a of attorneys) {
    const doc = {
      _id: a._id,
      _type: "attorney",
      name: a.name,
      slug: { _type: "slug", current: a.slug },
      role: a.role,
      order: a.order,
      ...(a.niche && { niche: a.niche }),
      ...(a.email && { email: a.email }),
      ...(a.phone && { phone: a.phone }),
      ...(a.credentialTitle && { credentialTitle: a.credentialTitle }),
      ...(a.credentialSubtitle && { credentialSubtitle: a.credentialSubtitle }),
      ...(photoAssets[a._id] && {
        photo: imageRef(photoAssets[a._id], `${a.name}, ${a.role} at Envisage Law`),
      }),
      ...(a.bio?.length && {
        bio: a.bio.map((text) => block(text)),
      }),
      ...(a.profileSections?.length && {
        profileSections: a.profileSections.map((section) => ({
          _key: key(),
          _type: section._type,
          title: section.title,
          ...(section.items && { items: section.items }),
          ...(section.entries && {
            entries: section.entries.map((e) => ({
              _key: key(),
              _type: "object",
              label: e.label,
              value: e.value,
            })),
          }),
        })),
      }),
    };

    await client.createOrReplace(doc);
    console.log(`    ${a.name}`);
  }

  // -------------------------------------------------------------------------
  // 3. Create practice areas (attorneys exist now, so refs are valid)
  // -------------------------------------------------------------------------
  console.log("\n  Creating practice areas...");

  for (const pa of practiceAreas) {
    const doc = {
      _id: pa._id,
      _type: "practiceArea",
      title: pa.title,
      slug: { _type: "slug", current: pa.slug },
      icon: pa.icon,
      standfirst: pa.standfirst,
      heroSubtitle: pa.heroSubtitle,
      order: pa.order,
      ctaHeading: pa.ctaHeading,
      ...(pa.body?.length && {
        body: pa.body.map((text) => block(text)),
      }),
      ...(pa.capabilities?.length && { capabilities: pa.capabilities }),
      ...(pa.featuredCapability && { featuredCapability: pa.featuredCapability }),
      ...(pa.anchoringAttorneyId && {
        anchoringAttorney: ref(pa.anchoringAttorneyId),
      }),
      ...(pa.anchoringHeading && { anchoringHeading: pa.anchoringHeading }),
      ...(pa.anchoringRoleLabel && { anchoringRoleLabel: pa.anchoringRoleLabel }),
      ...(pa.anchoringDescription && { anchoringDescription: pa.anchoringDescription }),
    };

    await client.createOrReplace(doc);
    console.log(`    ${pa.title}`);
  }

  // -------------------------------------------------------------------------
  // 3b. Patch attorneys with practiceAreaTag refs (practice areas exist now)
  // -------------------------------------------------------------------------
  const paSlugToId = {};
  for (const pa of practiceAreas) {
    paSlugToId[pa.slug] = pa._id;
  }

  for (const a of attorneys) {
    if (!a.practiceAreaTags?.length) continue;

    await client.patch(a._id).set({
      practiceAreaTags: a.practiceAreaTags.map((tag) => ({
        _key: key(),
        _type: "object",
        label: tag.label,
        ...(tag.practiceAreaSlug && paSlugToId[tag.practiceAreaSlug] && {
          practiceAreaRef: ref(paSlugToId[tag.practiceAreaSlug]),
        }),
      })),
    }).commit();
  }
  console.log("  Patched attorney practice area tags.");

  // -------------------------------------------------------------------------
  // 4. Create staff members
  // -------------------------------------------------------------------------
  console.log("\n  Creating staff members...");

  for (const s of staffMembers) {
    const doc = {
      _id: s._id,
      _type: "staffMember",
      name: s.name,
      role: s.role,
      order: s.order,
      ...(s.initials && { initials: s.initials }),
      ...(photoAssets[s._id] && {
        photo: imageRef(photoAssets[s._id], s.name),
      }),
    };

    await client.createOrReplace(doc);
    console.log(`    ${s.name}`);
  }

  // -------------------------------------------------------------------------
  // 5. Create insights (articles)
  // -------------------------------------------------------------------------
  console.log("\n  Creating insights...");

  for (const article of articles) {
    const doc = {
      _id: `insight-${article.slug}`,
      _type: "insight",
      title: article.title,
      slug: { _type: "slug", current: article.slug },
      category: article.tag,
      publishedAt: new Date(article.date).toISOString(),
      excerpt: article.excerpt,
      ...(article.featured && { featured: true }),
      ...(article.authorId && { author: ref(article.authorId) }),
      ...(article.authorName && { authorName: article.authorName }),
    };

    await client.createOrReplace(doc);
    console.log(`    ${article.title.slice(0, 60)}...`);
  }

  // -------------------------------------------------------------------------
  // 6. Update global settings
  // -------------------------------------------------------------------------
  console.log("\n  Updating global settings...");

  await client.createIfNotExists({
    _id: "globalSettings",
    _type: "globalSettings",
    siteTitle: "Envisage Law",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  });
  await client.patch("globalSettings").set({
    siteTitle: "Envisage Law",
    phone: "919.268.8998",
    phoneTel: "9192688998",
    mailingAddress: "Envisage Law\nPO Box 30099\nRaleigh, NC 27622",
  }).commit();

  // -------------------------------------------------------------------------
  // Done
  // -------------------------------------------------------------------------

  console.log("\n  Seed complete! Envisage Law content has been created.\n");
  console.log("  Visit http://localhost:3000/studio to review the content.\n");
}

main().catch((err) => {
  console.error("\n  Seed failed:", err.message, "\n");
  process.exit(1);
});
