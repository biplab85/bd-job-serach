import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import Logo from "@/components/Logo";
import { FiTarget, FiHeart, FiZap } from "react-icons/fi";

export default function AboutPage() {
  const stats = [
    { v: "48k+", l: "Open roles" },
    { v: "9k+", l: "Companies" },
    { v: "120k+", l: "Hires made" },
  ];
  const values = [
    { icon: FiTarget, t: "Right matches", d: "We optimise for fit, not just volume." },
    { icon: FiZap, t: "Respect your time", d: "No endless forms, no ghosting." },
    { icon: FiHeart, t: "Human first", d: "Hiring should feel personal and fair." },
  ];
  return (
    <AppScreen header={<TopBar title="About" />} contentClassName="px-5 py-6 space-y-7">
      <div className="rounded-3xl bg-brand-700 p-6 text-white">
        <Logo tone="dark" size={36} />
        <h1 className="font-display mt-5 text-[26px] font-semibold leading-snug tracking-tight">
          We&apos;re rebuilding the way the world finds work.
        </h1>
        <p className="mt-3 text-[14px] leading-relaxed text-white/75">
          HousingJob connects people with opportunities that fit their skills and their
          lives — through smart matching and a hiring experience that finally respects
          everyone&apos;s time.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stats.map((s) => (
          <div
            key={s.l}
            className="rounded-2xl border border-line-soft bg-surface py-4 text-center shadow-[var(--shadow-soft)]"
          >
            <p className="font-display text-[20px] font-semibold text-brand-ink">{s.v}</p>
            <p className="text-[11.5px] text-muted">{s.l}</p>
          </div>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-[15px] font-bold text-ink">What we believe</h2>
        <div className="space-y-3">
          {values.map((v) => (
            <div
              key={v.t}
              className="flex items-start gap-3.5 rounded-2xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-ink">
                <v.icon className="text-xl" />
              </span>
              <div>
                <p className="text-[14.5px] font-bold text-ink">{v.t}</p>
                <p className="text-[13px] text-muted">{v.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-center text-[12px] text-muted">
        Made with care in Dhaka · HousingJob v1.0.0
      </p>
    </AppScreen>
  );
}
