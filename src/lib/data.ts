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
    href: "/attorneys/anthony-biller",
    photo: "https://envisage.law/wp-content/uploads/2022/08/Anthony-Biller-530-x-548.png",
  },
  {
    slug: "james-lawrence",
    name: "James R. Lawrence III",
    role: "Partner",
    niche: "Regulatory & Healthcare",
    hasProfile: true,
    href: "/attorneys/james-lawrence",
    photo: "https://envisage.law/wp-content/uploads/2021/04/james-lawrence-210408-530-548.jpg",
  },
  {
    slug: "adam-banks",
    name: "Adam P. Banks",
    role: "Partner",
    niche: "Construction · Nonprofit · HOA",
    hasProfile: false,
    href: "/attorneys",
    photo: "https://envisage.law/wp-content/uploads/2021/04/adam-banks-61-210407-530-548.jpg",
  },
  {
    slug: "joelle-harvill",
    name: 'Allison "Joelle" Harvill',
    role: "Attorney",
    niche: "Data Privacy & Security",
    hasProfile: false,
    href: "/attorneys",
    photo: "https://envisage.law/wp-content/uploads/2021/10/Allison-Joelle-Harvill-Attorney-530-x-548.jpg",
  },
  {
    slug: "tara-seidel",
    name: "Tara Seidel",
    role: "Attorney",
    niche: "",
    hasProfile: false,
    href: "/attorneys",
    photo: "https://envisage.law/wp-content/uploads/2022/09/Tara-Seidel-1.png",
  },
  {
    slug: "danielle-rose",
    name: "Danielle Rose",
    role: "Attorney",
    niche: "",
    hasProfile: false,
    href: "/attorneys",
    photo: "https://envisage.law/wp-content/uploads/2023/08/Danielle-Rose-530-x-548.png",
  },
  {
    slug: "sophie-vouvalis",
    name: "Sophie Vouvalis",
    role: "Associate Attorney",
    niche: "",
    hasProfile: false,
    href: "/attorneys",
    photo: "https://envisage.law/wp-content/uploads/2024/10/Sophie-Vouvalis-Attorney-530-x-548.png",
  },
  {
    slug: "jay-thomas",
    name: "Jay C. Thomas",
    role: "Associate Attorney",
    niche: "",
    hasProfile: false,
    href: "/attorneys",
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
    name: "Jennifer",
    role: "Paralegal",
    photo: "",
    initials: "J",
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
      "Protecting identities, content, ideas, and secrets. Trademark portfolios, patents, copyright, and trade secrets, managed worldwide.",
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
      "Counsel for nonprofits, religious organizations and ministry boards on disputes and governance.",
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
    slug: "trademark-portfolio-strategy",
    tag: "IP & Technology",
    date: "May 28, 2026",
    featured: true,
    title: "Building a Trademark Portfolio That Scales With Your Business",
    excerpt:
      "How selection, clearance, registration, policing, and enforcement work best as an ongoing relationship that grows alongside your business.",
  },
  {
    slug: "social-media-first-amendment",
    tag: "Regulatory & Healthcare",
    date: "May 12, 2026",
    title: "The First Amendment Meets Social Media: Lessons From Recent Litigation",
    excerpt:
      "Path-breaking reinstatement cases are redrawing the line between platform moderation and protected speech. What it means for clients facing deplatforming.",
  },
  {
    slug: "fda-administrative-procedure",
    tag: "Regulatory & Healthcare",
    date: "Apr 30, 2026",
    title: "Navigating the Administrative Procedure Act in an Era of Agency Rulemaking",
    excerpt:
      "Federal agencies publish tens of thousands of pages of rules each year. How regulated businesses can position themselves for success and challenge overreach.",
  },
  {
    slug: "trade-secret-departing-employees",
    tag: "IP & Technology",
    date: "Apr 16, 2026",
    title: "Trade Secret Protection When Key Employees Leave",
    excerpt:
      "Policies, agreements, and the practical steps that determine whether your most valuable information walks out the door with a departing employee.",
  },
  {
    slug: "construction-payment-disputes",
    tag: "Construction & Commercial",
    date: "Mar 27, 2026",
    title: "Resolving Construction Payment Disputes Before They Reach the Courthouse",
    excerpt:
      "Lien rights, contract mechanics, and early-resolution strategies for contractors and developers facing payment and delay claims.",
  },
  {
    slug: "hipaa-data-breach-response",
    tag: "Data Privacy & Security",
    date: "Mar 9, 2026",
    title: "HIPAA and the First 72 Hours After a Data Breach",
    excerpt:
      "A practical framework for regulated organizations responding to a security incident involving protected health information.",
  },
  {
    slug: "nonprofit-board-governance",
    tag: "Nonprofit & Ministry",
    date: "Feb 21, 2026",
    title: "Governance Essentials for Nonprofit and Ministry Boards",
    excerpt:
      "Fiduciary duties, conflict policies, and the governance structures that keep mission-driven organizations out of disputes.",
  },
  {
    slug: "appellate-strategy-federal",
    tag: "IP & Technology",
    date: "Feb 4, 2026",
    title: "Preserving the Record: Appellate Strategy Begins at Trial",
    excerpt:
      "How objections, evidentiary rulings, and jury instructions at trial determine whether an appeal can be won.",
  },
  {
    slug: "hoa-enforcement-limits",
    tag: "HOA & Community Association",
    date: "Jan 19, 2026",
    title: "The Limits of HOA Enforcement Authority in North Carolina",
    excerpt:
      "What community association boards can and cannot do when enforcing covenants, and how to avoid liability in the process.",
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
  { label: "Attorneys", href: "/attorneys" },
  { label: "Insights", href: "/insights" },
];
