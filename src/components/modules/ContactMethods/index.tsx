import { cn } from "@/lib/utils";
import type { ContactMethodsProps, ContactMethod } from "./types";

function MethodCard({ method }: { method: ContactMethod }) {
  const isDashed = method.style === "dashed";
  const card = (
    <div
      className={cn(
        "rounded-lg bg-white p-10",
        isDashed
          ? "border-2 border-dashed border-brand-border"
          : "border border-brand-border",
        method.href &&
          "transition-all hover:-translate-y-1 hover:border-brand-secondary hover:shadow-md"
      )}
    >
      <div className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-muted">
        {method.label}
      </div>
      <div className="whitespace-pre-line text-[22px] font-extrabold leading-[1.3] text-brand-primary">
        {method.value}
      </div>
      {method.note && (
        <div className="mt-2 text-sm text-brand-muted">{method.note}</div>
      )}
    </div>
  );

  if (method.href) {
    return (
      <a href={method.href} aria-label={method.label}>
        {card}
      </a>
    );
  }

  return card;
}

export default function ContactMethods({
  heading,
  methods,
}: ContactMethodsProps) {
  if (!methods?.length) return null;

  return (
    <div className="px-6">
      {heading && (
        <h2 className="mb-8 text-2xl font-extrabold text-brand-primary">
          {heading}
        </h2>
      )}
      <div className="grid gap-6 sm:grid-cols-3">
        {methods.map((m) => (
          <MethodCard key={m._key} method={m} />
        ))}
      </div>
    </div>
  );
}
