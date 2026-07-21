export interface CtaBandProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  primaryButton?: {
    label: string;
    url: string;
    isExternal?: boolean;
  };
  secondaryButton?: {
    label: string;
    url: string;
    isExternal?: boolean;
  };
}
