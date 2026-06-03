export function LegalBody({
  updated,
  sections,
}: {
  updated: string;
  sections: { h: string; p: string }[];
}) {
  return (
    <div>
      <p className="mb-6 inline-block rounded-full bg-paper-2 px-3 py-1 text-[12px] font-semibold text-muted">
        {updated}
      </p>
      <div className="space-y-6">
        {sections.map((s) => (
          <section key={s.h}>
            <h2 className="mb-1.5 text-[15px] font-bold text-ink">{s.h}</h2>
            <p className="text-[14px] leading-relaxed text-ink-soft">{s.p}</p>
          </section>
        ))}
      </div>
      <p className="mt-8 text-center text-[12.5px] text-muted">
        Questions? Reach us at hello@housingjob.app
      </p>
    </div>
  );
}
