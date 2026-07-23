export interface LocationItem {
  _key: string;
  city: string;
  label?: string;
}

export interface LocationGridProps {
  heading?: string;
  body?: string;
  locations?: LocationItem[];
}
