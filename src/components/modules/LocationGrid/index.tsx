import Container from "@/components/ui/Container";
import type { LocationGridProps } from "./types";

export default function LocationGrid({
  heading,
  body,
  locations,
}: LocationGridProps) {
  return (
    <Container>
      {heading && (
        <div className="mb-10 flex items-center gap-5">
          <h2 className="whitespace-nowrap text-sm font-bold uppercase tracking-[0.14em] text-brand-primary">
            {heading}
          </h2>
          <div className="h-px flex-1 bg-brand-border" />
        </div>
      )}
      {locations && locations.length > 0 && (
        <div className="flex flex-wrap gap-14">
          {locations.map((loc) => (
            <div key={loc._key}>
              <div className="text-[30px] font-extrabold text-brand-primary">
                {loc.city}
              </div>
              {loc.label && (
                <div className="mt-2.5 text-sm font-semibold text-brand-muted">
                  {loc.label}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {body && (
        <p className="mt-7 max-w-[720px] text-[19px] font-light leading-[1.65] text-brand-muted">
          {body}
        </p>
      )}
    </Container>
  );
}
