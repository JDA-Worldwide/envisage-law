import { cn } from "@/lib/utils";
import { stegaClean } from "@sanity/client/stega";
import { PhoneIcon, MapPinIcon, CreditCardIcon, EmailIcon } from "@/components/envisage/Icons";
import type { ContactMethodsProps, ContactMethod } from "./types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  phone: PhoneIcon,
  mapPin: MapPinIcon,
  creditCard: CreditCardIcon,
  email: EmailIcon,
};

function MethodCard({ method }: { method: ContactMethod }) {
  const isDashed = stegaClean(method.style) === "dashed";
  const iconKey = stegaClean(method.icon);
  const IconComponent = iconKey ? iconMap[iconKey] : null;
  const showPending = isDashed && !method.href;

  const card = (
    <div
      className={cn(
        "h-full rounded-lg bg-white p-10",
        isDashed
          ? "border-2 border-dashed border-brand-border"
          : "border border-brand-border",
        method.href &&
          "transition-all hover:-translate-y-1 hover:border-brand-secondary hover:shadow-md focus-visible:ring-2 focus-visible:ring-brand-secondary focus-visible:ring-offset-2"
      )}
    >
      {IconComponent && (
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-brand-primary text-white">
          <IconComponent className="h-[26px] w-[26px]" />
        </div>
      )}
      <div className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-muted">
        {method.label}
      </div>
      <div className="whitespace-pre-line text-[22px] font-extrabold leading-[1.3] text-brand-primary">
        {method.value}
      </div>
      {method.note && (
        <div className="mt-2 text-sm text-brand-muted">
          {showPending && (
            <span className="mr-2 rounded-full bg-[rgba(254,179,0,0.12)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-accent">
              Pending
            </span>
          )}
          {method.note}
        </div>
      )}
    </div>
  );

  if (method.href) {
    return (
      <a href={method.href} aria-label={method.label} className="block h-full">
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
