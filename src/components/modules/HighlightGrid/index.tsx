import { stegaClean } from "@sanity/client/stega";
import Container from "@/components/ui/Container";
import { urlFor } from "@/sanity/lib/image";
import type { HighlightGridProps } from "./types";

export default function HighlightGrid({
  eyebrow,
  heading,
  body,
  backgroundImage,
  items,
  variant,
}: HighlightGridProps) {
  const v = stegaClean(variant) ?? "light";

  if (v === "dark") return <DarkVariant eyebrow={eyebrow} heading={heading} backgroundImage={backgroundImage} items={items} />;
  if (v === "numbered") return <NumberedVariant eyebrow={eyebrow} heading={heading} items={items} />;
  if (v === "chips") return <ChipsVariant eyebrow={eyebrow} heading={heading} items={items} />;
  return <LightVariant eyebrow={eyebrow} heading={heading} body={body} items={items} />;
}

function NumberedVariant({ eyebrow, heading, items }: HighlightGridProps) {
  return (
    <section className="mx-auto max-w-container py-section px-6">
      {(eyebrow || heading) && (
        <div className="mb-14 text-center">
          {eyebrow && (
            <p className={`text-[18px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark ${heading ? "mb-[18px]" : ""}`}>
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">
              {heading}
            </h2>
          )}
        </div>
      )}
      <div className="grid gap-10 lg:grid-cols-3">
        {(items ?? []).map((item) => (
          <div key={item._key} className="border-t-[3px] border-brand-primary pt-7">
            <h3 className="mb-3.5 text-[26px] font-extrabold text-brand-primary">{item.title}</h3>
            {item.text && (
              <p className="text-[15.5px] leading-[1.65] text-brand-muted">{item.text}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function DarkVariant({ eyebrow, heading, backgroundImage, items }: HighlightGridProps) {
  const bgUrl = backgroundImage?.asset
    ? urlFor(backgroundImage).width(2400).quality(80).auto("format").url()
    : "";

  return (
    <section className="relative overflow-hidden py-section">
      {bgUrl && (
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${bgUrl}')` }}
        />
      )}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[rgba(0,31,70,0.93)] to-[rgba(0,31,70,0.9)]" />
      <Container className="relative z-[2]">
        {(eyebrow || heading) && (
          <div className="text-center">
            {eyebrow && (
              <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-[#6fb0c2]">
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-white">
                {heading}
              </h2>
            )}
          </div>
        )}
        <div className="mt-14 grid gap-11 lg:grid-cols-3">
          {(items ?? []).map((item) => (
            <div key={item._key}>
              <h3 className="mb-3.5 flex items-start gap-3 text-[21px] font-extrabold text-white">
                <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-brand-accent" aria-hidden="true" />
                {item.title}
              </h3>
              {item.text && (
                <p className="text-[15px] leading-[1.65] text-white/90">{item.text}</p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function LightVariant({ eyebrow, heading, body, items }: HighlightGridProps) {
  return (
    <section className="mx-auto max-w-container py-section px-6">
      {(eyebrow || heading) && (
        <div className="mb-14 text-center">
          {eyebrow && (
            <p className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">
              {eyebrow}
            </p>
          )}
          {heading && (
            <h2 className="text-[clamp(30px,4vw,46px)] font-extrabold text-brand-primary">
              {heading}
            </h2>
          )}
          {body && (
            <p className="mx-auto mt-4 max-w-[700px] text-base text-brand-muted">{body}</p>
          )}
        </div>
      )}
      <div className="grid gap-11 lg:grid-cols-3">
        {(items ?? []).map((item) => (
          <div key={item._key} className="border-t-2 border-brand-border pt-[22px]">
            <h3 className="mb-3.5 flex items-start gap-3 text-[21px] font-extrabold text-brand-primary">
              <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-brand-accent" aria-hidden="true" />
              {item.title}
            </h3>
            {item.text && (
              <p className="text-[15px] leading-[1.65] text-brand-muted">{item.text}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ChipsVariant({ eyebrow, heading, items }: HighlightGridProps) {
  return (
    <section className="mx-auto max-w-container py-section-sm px-6">
      {eyebrow && (
        <p className="mb-2 text-center text-[13px] font-bold uppercase tracking-[0.18em] text-brand-secondary-dark">
          {eyebrow}
        </p>
      )}
      {heading && (
        <h2 className="mb-10 text-center text-[clamp(24px,3vw,34px)] font-extrabold text-brand-primary">
          {heading}
        </h2>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(items ?? []).map((item) => (
          <div key={item._key} className="flex items-center gap-3 rounded-md border border-brand-border bg-white px-5 py-5">
            <span className="h-2.5 w-2.5 flex-none rounded-full bg-brand-accent" />
            <span className="text-[18px] font-bold text-brand-primary">{item.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
