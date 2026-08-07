import { stegaClean } from "@sanity/client/stega";
import PortableText from "@/components/ui/PortableText";
import CtaButtons from "@/components/ui/CtaButtons";
import type { RichTextSectionProps } from "./types";

export default function RichTextSection({
  eyebrow,
  heading,
  body,
  ctas,
  alignment,
}: RichTextSectionProps) {
  const centered = stegaClean(alignment) === "center";

  return (
    <div className={`px-6 ${centered ? "mx-auto max-w-[880px] text-center" : "mx-auto max-w-[880px]"}`}>
      {eyebrow && (
        <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">
          {eyebrow}
        </p>
      )}
      {heading && (
        <h2 className="mb-5 text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">
          {heading}
        </h2>
      )}
      {body && body.length > 0 && (
        <div className="text-[clamp(18px,2.2vw,24px)] font-light leading-[1.55] text-brand-primary">
          <PortableText value={body} />
        </div>
      )}
      <CtaButtons ctas={ctas} className="mt-8" />
    </div>
  );
}
