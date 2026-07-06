/* ============================================================
   Envisage Law — Static Site Data
   Attorneys, practices, articles, and staff
   ============================================================ */

export interface Attorney {
  slug: string;
  name: string;
  role: string;
  niche: string;
  hasProfile: boolean;
  href: string;
  photo: string;
}

export interface StaffMember {
  name: string;
  role: string;
  photo: string;
  initials?: string;
}

export interface PracticeArea {
  slug: string;
  title: string;
  href: string;
  icon: string;
  soon: boolean;
  standfirst: string;
}

export interface Article {
  slug: string;
  tag: string;
  date: string;
  featured?: boolean;
  title: string;
  excerpt: string;
  authorSlug?: string;
  authorName?: string;
}

export const LOGO_URL = "/envisage-law-logo.svg";

export const PHONE = "919.268.8998";
export const PHONE_TEL = "tel:9192688998";

export const attorneys: Attorney[] = [
  {
    slug: "anthony-biller",
    name: 'Anthony J. "Tony" Biller',
    role: "Partner",
    niche: "IP & Technology",
    hasProfile: true,
    href: "/legal-team/anthony-biller",
    photo: "https://envisage.law/wp-content/uploads/2022/08/Anthony-Biller-530-x-548.png",
  },
  {
    slug: "james-lawrence",
    name: "James R. Lawrence III",
    role: "Partner",
    niche: "Regulatory & Healthcare",
    hasProfile: true,
    href: "/legal-team/james-lawrence",
    photo: "https://envisage.law/wp-content/uploads/2021/04/james-lawrence-210408-530-548.jpg",
  },
  {
    slug: "adam-banks",
    name: "Adam P. Banks",
    role: "Partner",
    niche: "Construction · Nonprofit · HOA",
    hasProfile: false,
    href: "/legal-team",
    photo: "https://envisage.law/wp-content/uploads/2021/04/adam-banks-61-210407-530-548.jpg",
  },
  {
    slug: "joelle-harvill",
    name: 'Allison "Joelle" Harvill',
    role: "Attorney",
    niche: "Data Privacy & Security",
    hasProfile: false,
    href: "/legal-team",
    photo: "https://envisage.law/wp-content/uploads/2021/10/Allison-Joelle-Harvill-Attorney-530-x-548.jpg",
  },
  {
    slug: "tara-seidel",
    name: "Tara Seidel",
    role: "Attorney",
    niche: "",
    hasProfile: false,
    href: "/legal-team",
    photo: "https://envisage.law/wp-content/uploads/2022/09/Tara-Seidel-1.png",
  },
  {
    slug: "danielle-rose",
    name: "Danielle Rose",
    role: "Attorney",
    niche: "",
    hasProfile: false,
    href: "/legal-team",
    photo: "https://envisage.law/wp-content/uploads/2023/08/Danielle-Rose-530-x-548.png",
  },
  {
    slug: "sophie-vouvalis",
    name: "Sophie Vouvalis",
    role: "Associate Attorney",
    niche: "",
    hasProfile: false,
    href: "/legal-team",
    photo: "https://envisage.law/wp-content/uploads/2024/10/Sophie-Vouvalis-Attorney-530-x-548.png",
  },
  {
    slug: "jay-thomas",
    name: "Jay C. Thomas",
    role: "Associate Attorney",
    niche: "",
    hasProfile: false,
    href: "/legal-team",
    photo: "https://envisage.law/wp-content/uploads/2024/10/Joy-Thomas-Envisage-Law-530-x-548.png",
  },
];

export const staff: StaffMember[] = [
  {
    name: "Lesley Biller",
    role: "IP Administrator",
    photo: "https://envisage.law/wp-content/uploads/2021/04/lesley-biller-210408-530-548.jpg",
  },
  {
    name: "April Bowes",
    role: "NC Certified Paralegal",
    photo: "https://envisage.law/wp-content/uploads/2022/09/April-Bowes-Envisage-Law.png",
  },
  {
    name: "Sarah McGrath",
    role: "Paralegal",
    photo: "https://envisage.law/wp-content/uploads/2025/09/Sarah-McGrath-Legal-Administrative-Assistant.jpg",
  },
  {
    name: "Jennifer Partridge",
    role: "Paralegal",
    photo: "",
    initials: "JP",
  },
];

export const practices: PracticeArea[] = [
  {
    slug: "ip-technology",
    title: "IP & Technology",
    href: "/practice-areas/ip-technology",
    icon: "ip",
    soon: false,
    standfirst:
      "We are comfortable in the technology trenches - such as helping clients with technology development contracts and litigating software disputes.",
  },
  {
    slug: "regulatory-healthcare",
    title: "Regulatory & Healthcare",
    href: "/practice-areas/regulatory-healthcare",
    icon: "regulatory",
    soon: false,
    standfirst:
      "Positioning clients for success under FDA, HIPAA, FIFRA and complex federal and state regulatory regimes.",
  },
  {
    slug: "construction-commercial",
    title: "Construction & Commercial",
    href: "/practice-areas/construction-commercial",
    icon: "construction",
    soon: false,
    standfirst:
      "Litigation for construction firms, contractors and developers across North Carolina and nationwide.",
  },
  {
    slug: "nonprofit-ministry",
    title: "Nonprofit & Ministry",
    href: "/practice-areas/nonprofit-ministry",
    icon: "nonprofit",
    soon: false,
    standfirst:
      "Counsel for nonprofits, religious organizations and churches on disputes and governance.",
  },
  {
    slug: "hoa-community",
    title: "HOA & Community Association",
    href: "/practice-areas/hoa-community",
    icon: "hoa",
    soon: false,
    standfirst:
      "Representing HOA boards, homeowners and community associations across North Carolina.",
  },
  {
    slug: "data-privacy",
    title: "Data Privacy & Security",
    href: "/practice-areas/data-privacy",
    icon: "data",
    soon: false,
    standfirst:
      "Guiding companies that handle regulated data through cross-border and multi-party matters.",
  },
];

export const articles: Article[] = [
  {
    slug: "protecting-your-brand-trademark-selection-clearance",
    tag: "IP & Technology",
    date: "December 1, 2025",
    featured: true,
    title: "Protecting Your Brand: A Strategic Guide to Trademark Selection and Clearance",
    excerpt:
      "The biblical principle that \u201Ca good name is more desirable than great riches\u201D (Proverbs 22:1) resonates profoundly in today\u2019s marketplace, where your brand identity represents the cornerstone of your business\u2019s goodwill and reputation.",
    authorSlug: "anthony-biller",
  },
  {
    slug: "nc-personal-privacy-protection-act-nonprofits",
    tag: "Nonprofit & Ministry",
    date: "November 1, 2025",
    title: "North Carolina\u2019s New Personal Privacy Protection Act: What Nonprofits Need to Know",
    excerpt:
      "Starting December 1, 2025, a new North Carolina law gives nonprofits stronger tools to protect their supporters\u2019 privacy. Known as the Personal Privacy Protection Act (Session Law 2025-79), this law is now part of Chapter 55A, the state\u2019s Nonprofit Corporation Act.",
    authorSlug: "joelle-harvill",
  },
  {
    slug: "open-source-ai-and-the-law",
    tag: "Data Privacy & Security",
    date: "October 20, 2025",
    title: "Open Source, AI, and the Law: A Week of Insight and Innovation",
    excerpt:
      "On October 13, 2025, I kicked off a week immersed in the dynamic intersection of technology and law. My journey began at All Things Open 2025\u2014the largest open-source, tech, and web conference on the East Coast\u2014hosted in Raleigh, North Carolina, one of the nation\u2019s fastest-growing technology hubs.",
    authorSlug: "joelle-harvill",
  },
  {
    slug: "nc-supreme-court-greenlights-claims-insurance-agent",
    tag: "Construction & Commercial",
    date: "May 30, 2025",
    title: "North Carolina Supreme Court Greenlights Claims Against Insurance Agent",
    excerpt:
      "Last week, in an opinion with implications for small businesses and insurance brokers, the Supreme Court of North Carolina ruled that a homeowner who \u201Ctrusted\u201D in an insurance agent\u2019s \u201Cassurance that it would accurately fill out the application\u201D stated a claim for negligence and punitive damages.",
    authorSlug: "james-lawrence",
  },
  {
    slug: "neuralink-files-telepathy-telekinesis-trademarks",
    tag: "IP & Technology",
    date: "March 9, 2025",
    title: "Neuralink Files \u2018Telepathy\u2019 and \u2018Telekinesis\u2019 Trademarks",
    excerpt:
      "Elon Musk\u2019s brain implant company Neuralink has filed trademark applications for futuristic terms like \u2018Telepathy\u2019 and \u2018Telekinesis\u2019 with the United States Patent and Trademark Office, signaling ambitious plans for brain-computer interface technology that could revolutionize human-machine interaction and communication.",
    authorSlug: "anthony-biller",
  },
  {
    slug: "envisage-law-expands-western-north-carolina",
    tag: "Firm News",
    date: "January 25, 2025",
    title: "Envisage Law Expands Into Vibrant Western North Carolina",
    excerpt:
      "Exciting news for Western North Carolina! We\u2019re thrilled to announce that Adam Banks, a partner at Envisage Law, has relocated to Asheville.",
    authorName: "Envisage Law",
  },
  {
    slug: "big-four-camels-nose-lawfirm-tent",
    tag: "Firm News",
    date: "January 19, 2025",
    title: "The Big Four\u2019s Camel\u2019s Nose Is About to Get in the Lawfirm Tent",
    excerpt:
      "KPMG, one of the Big Four accounting firms, has taken a significant step towards entering the US legal services market. On January 14, 2025, the Arizona Supreme Court\u2019s Committee on Alternative Business Structures unanimously recommended that KPMG Law US, a subsidiary of KPMG, be granted a license to operate as an alternative business structure (ABS) in Arizona.",
    authorSlug: "anthony-biller",
  },
  {
    slug: "understanding-nc-land-use-approvals",
    tag: "Construction & Commercial",
    date: "August 27, 2024",
    title: "Understanding North Carolina Land Use Approvals",
    excerpt:
      "More than 500 counties and municipalities in North Carolina have adopted some sort of zoning and land use ordinance. In general terms, these ordinances have two broad functions.",
    authorName: "Michael B. Kent, Jr.",
  },
  {
    slug: "court-rules-covid-19-orders-violated-constitution",
    tag: "Regulatory & Healthcare",
    date: "May 5, 2024",
    title: "Court Rules That COVID-19 Orders Violated Constitution",
    excerpt:
      "The North Carolina Court of Appeals recently issued an important decision addressing one of Governor Cooper\u2019s COVID-19 \u2018lockdown\u2019 orders. In North Carolina Bar & Tavern Association v. Cooper, the Court ruled that the order violated the North Carolina Constitution by allowing some businesses to reopen while forcing others to remain closed.",
    authorName: "Michael B. Kent, Jr.",
  },
  {
    slug: "short-term-rental-regulation-north-carolina",
    tag: "Construction & Commercial",
    date: "March 24, 2024",
    title: "Short-Term Rental Regulation in North Carolina",
    excerpt:
      "As one of the most visited states in America, North Carolina has seen a surge in short-term rentals (think Airbnb or Vrbo). This growing sector of the economy has brought both opportunities and challenges.",
    authorName: "Michael B. Kent, Jr.",
  },
  {
    slug: "federal-court-upholds-property-rights",
    tag: "Regulatory & Healthcare",
    date: "February 17, 2024",
    title: "Federal Court Upholds Property Rights Against Government Intrusion",
    excerpt:
      "Last month, a federal appeals court issued an important decision curbing the government\u2019s ability to use a criminal investigation of one party to search and seize property belonging to another. In Snitko v. United States, the Ninth Circuit Court of Appeals held that federal agents violated the constitutional rights of several hundred citizens when they opened and attempted to seize the contents of safe deposit boxes located at a raided facility.",
    authorName: "Michael B. Kent, Jr.",
  },
  {
    slug: "corporate-transparency-act-goes-into-effect",
    tag: "Construction & Commercial",
    date: "January 5, 2024",
    title: "The Corporate Transparency Act Goes Into Effect",
    excerpt:
      "The Corporate Transparency Act (31 U.S.C. \u00A7 5336 and regulations at 31 C.F.R. 1010.380), goes into effect in January 2024 and may impact your small business by requiring you to report information about your business ownership to the federal government. Failure to comply with these reporting requirements could result in the imposition of civil and criminal penalties.",
    authorSlug: "tara-seidel",
  },
  {
    slug: "importance-of-recording-leases-options-real-estate",
    tag: "Construction & Commercial",
    date: "December 17, 2023",
    title: "The Importance of Recording Leases, Options, and Other Interests in Real Estate",
    excerpt:
      "Do leases, options, and similar \u2018non-ownership\u2019 interests in real estate need to be recorded with the register of deeds? The North Carolina Court of Appeals addressed this issue earlier this year in Greaseoutlet.com, LLC v. MK South II, LLC.",
    authorName: "Michael B. Kent, Jr.",
  },
  {
    slug: "suit-challenging-covid-19-lockdown-orders",
    tag: "Regulatory & Healthcare",
    date: "September 16, 2023",
    title: "Suit Challenging COVID-19 \u201CLockdown\u201D Orders Allowed to Continue",
    excerpt:
      "The North Carolina Court of Appeals this month addressed important issues concerning the scope of governmental emergency powers. In Howell v. Cooper, the Court held that the doctrine of \u2018sovereign immunity\u2019 did not bar a lawsuit challenging the constitutionality of Governor Cooper\u2019s COVID-19 \u2018lockdown\u2019 orders.",
    authorName: "Michael B. Kent, Jr.",
  },
  {
    slug: "envisage-attorneys-snag-prestigious-accolades",
    tag: "Firm News",
    date: "October 4, 2021",
    title: "Envisage Attorneys Snag Several Prestigious Accolades",
    excerpt:
      "Tony has again been recognized in the exclusive ranks of The Best Lawyers in America for intellectual property litigation and patent law.",
    authorName: "Envisage Law",
  },
  {
    slug: "envisage-law-taps-former-hhs-fda-chief-counsel",
    tag: "Firm News",
    date: "May 10, 2021",
    title: "Envisage Law Taps Former HHS Deputy General Counsel and FDA Chief Counsel to Lead Health Care and Life Sciences Practice",
    excerpt:
      "Envisage Law, a full-service business law firm, today announced the hire of James Lawrence to lead the firm\u2019s Health Care and Life Sciences Practice. Lawrence joins Envisage after serving as a Deputy General Counsel in the United States Department of Health and Human Services and as Chief Counsel of the Food and Drug Administration.",
    authorName: "Envisage Law",
  },
];

export const STOCK_IMAGES = {
  heroParticles:
    "https://images.unsplash.com/photo-1766068472262-253151e7fdf7?fm=jpg&q=80&w=2400&auto=format&fit=crop",
  courthouse:
    "https://images.unsplash.com/photo-1750365501430-395251fe4b7e?fm=jpg&q=80&w=2400&auto=format&fit=crop",
  consultation:
    "https://images.unsplash.com/photo-1758518730384-be3d205838e8?fm=jpg&q=80&w=2400&auto=format&fit=crop",
  raleighSkyline:
    "https://images.unsplash.com/photo-1676934556859-624fa21e2588?fm=jpg&q=80&w=2400&auto=format&fit=crop",
} as const;

export const NAV_ITEMS = [
  { label: "About", href: "/about" },
  {
    label: "Practice Areas",
    href: "/practice-areas",
    children: practices.map((p) => ({
      label: p.title,
      href: p.href,
      description: p.standfirst.split(".")[0],
    })),
  },
  { label: "Legal Team", href: "/legal-team" },
  { label: "Insights", href: "/insights" },
];
