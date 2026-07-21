export interface ContactMethod {
  _key: string;
  icon: "phone" | "mapPin" | "creditCard" | "email";
  label: string;
  value: string;
  note?: string;
  href?: string;
  style?: "solid" | "dashed";
}

export interface ContactMethodsProps {
  heading?: string;
  methods?: ContactMethod[];
}
