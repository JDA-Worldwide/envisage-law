import { stegaClean } from "@sanity/client/stega";
import SanityImage from "@/components/ui/SanityImage";
import PortableText from "@/components/ui/PortableText";
import type { TextImageSplitProps } from "./types";

export default function TextImageSplit({
  eyebrow,
  heading,
  body,
  image,
  imagePosition,
}: TextImageSplitProps) {
  const imgLeft = stegaClean(imagePosition) === "left";

  return (
    <div className="px-6">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className={imgLeft ? "lg:order-last" : ""}>
          {eyebrow && (
            <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">
              {eyebrow}
            </p>
          )}
          <h2 className="mb-5 text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">
            {heading}
          </h2>
          {body && body.length > 0 && (
            <div className="text-[19px] font-light leading-[1.65] text-brand-muted">
              <PortableText value={body} />
            </div>
          )}
        </div>
        <div
          className={`overflow-hidden rounded-lg shadow-md ${imgLeft ? "lg:order-first" : ""}`}
          style={{ aspectRatio: "4/3" }}
        >
          {image && (
            <SanityImage
              image={image}
              width={700}
              height={525}
              className="h-full w-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
