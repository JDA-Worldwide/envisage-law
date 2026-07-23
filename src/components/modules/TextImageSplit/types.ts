import type { SanityImageSource } from "@/components/ui/SanityImage/types";

export interface TextImageSplitProps {
  eyebrow?: string;
  heading: string;
  body?: unknown[];
  image: SanityImageSource;
  imagePosition?: "left" | "right";
}
