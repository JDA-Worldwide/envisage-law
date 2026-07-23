export interface EnvisageHeroAction {
  _key: string;
  label: string;
  href: string;
  variant?: "teal" | "ghost";
}

export interface EnvisageHeroBreadcrumb {
  _key: string;
  label: string;
  href?: string;
}

export interface EnvisageHeroProps {
  eyebrow?: string;
  heading: string;
  accentText?: string;
  subtitle?: string;
  actions?: EnvisageHeroAction[];
  breadcrumbs?: EnvisageHeroBreadcrumb[];
  backgroundImage?: { asset: { _ref: string } };
  isHome?: boolean;
}
