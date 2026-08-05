import type { CtaButtonItem } from "@/components/ui/CtaButtons";

export interface RichTextSectionProps {
  eyebrow?: string;
  heading?: string;
  body?: unknown[];
  ctas?: CtaButtonItem[];
  alignment?: "left" | "center";
}
