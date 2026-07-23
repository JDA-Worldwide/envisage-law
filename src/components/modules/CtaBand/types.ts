export interface CtaBandAction {
  _key: string;
  label: string;
  href: string;
  variant?: "teal" | "ghost";
}

export interface CtaBandProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  backgroundImage?: { asset: { _ref: string } };
  actions?: CtaBandAction[];
}
