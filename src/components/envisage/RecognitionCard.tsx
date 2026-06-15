export default function RecognitionCard() {
  const tiers = [
    { rank: "Regional Tier 1", label: "Corporate Law" },
    { rank: "Tier 2", label: "Patent Law" },
    { rank: "Tier 3", label: "Litigation \u2013 IP" },
  ];

  return (
    <section className="border-y border-brand-border bg-brand-surface">
      <div className="mx-auto max-w-[var(--max-width-content)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[980px] flex-wrap items-stretch overflow-hidden rounded-xl border border-brand-border bg-white shadow-sm">
          {/* Seal */}
          <div className="flex flex-1 items-center gap-[18px] border-r border-brand-border px-9 py-[30px]" style={{ flexBasis: 320 }}>
            <svg className="h-14 w-14 flex-none" viewBox="0 0 56 56" fill="none" aria-hidden="true">
              <circle cx="28" cy="28" r="26" fill="#fff" stroke="#FEB300" strokeWidth="2.5" />
              <circle cx="28" cy="28" r="20.5" stroke="rgba(0,31,70,.14)" strokeWidth="1" />
              <path d="M28 17 L30.59 24.44 L38.46 24.6 L32.18 29.36 L34.47 36.9 L28 32.4 L21.53 36.9 L23.82 29.36 L17.54 24.6 L25.41 24.44 Z" fill="#001F46" />
            </svg>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-secondary-dark">2025 Edition</span>
              <span className="text-[17px] font-extrabold leading-[1.25] text-brand-primary">Recognized in Best Law Firms&reg;</span>
            </div>
          </div>
          {/* Tiers */}
          <div className="flex" style={{ flex: "2 1 420px" }}>
            {tiers.map((t, i) => (
              <div key={i} className={`flex flex-1 flex-col items-center justify-center gap-[7px] px-4 py-[30px] text-center ${i > 0 ? "border-l border-brand-border" : ""}`}>
                <span className="inline-block self-center whitespace-nowrap rounded-full bg-[rgba(74,144,164,0.12)] px-3 py-[5px] text-[11px] font-extrabold uppercase tracking-[0.1em] text-brand-secondary-dark">
                  {t.rank}
                </span>
                <span className="text-[15px] font-bold leading-[1.3] text-brand-primary">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
