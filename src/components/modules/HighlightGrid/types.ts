export interface HighlightGridItem {
  _key: string;
  title: string;
  text?: string;
}

export interface HighlightGridProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
  backgroundImage?: { asset: { _ref: string } };
  items?: HighlightGridItem[];
  variant?: "numbered" | "dark" | "light" | "chips";
}
