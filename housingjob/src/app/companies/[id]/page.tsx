import { notFound } from "next/navigation";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Button, Tag } from "@/components/ui";
import { JobCard } from "@/components/JobCard";
import { ShareButton } from "@/components/ShareButton";
import { companies, getCompany, jobsByCompany } from "@/lib/data";
import {
  FiStar,
  FiMapPin,
  FiUsers,
  FiCalendar,
  FiCheck,
  FiGlobe,
} from "react-icons/fi";

export function generateStaticParams() {
  return companies.map((c) => ({ id: c.id }));
}

export default async function CompanyProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = getCompany(id);
  if (!c) notFound();
  const openJobs = jobsByCompany(c.id);

  return (
    <AppScreen
      header={
        <TopBar
          title="Company"
          right={<ShareButton title={c.name} text={`${c.name} is hiring on HousingJob`} />}
        />
      }
      contentClassName="pb-8"
      nav={
        <div className="flex items-center gap-3 border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <Button href={c.website} variant="outline" icon={FiGlobe} className="flex-1">
            Website
          </Button>
          <Button href="#openings" variant="primary" className="flex-1">
            View {openJobs.length} jobs
          </Button>
        </div>
      }
    >
      {/* Hero */}
      <div className="flex flex-col items-center px-6 pt-4 text-center">
        <span
          className="flex h-20 w-20 items-center justify-center rounded-3xl font-display text-3xl font-semibold text-white"
          style={{ background: c.logoBg }}
        >
          {c.logo}
        </span>
        <h1 className="font-display mt-4 text-[24px] font-semibold tracking-tight text-ink">
          {c.name}
        </h1>
        <p className="mt-1 text-[14px] text-muted">{c.industry}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fbf0db] px-3 py-1.5 text-[12.5px] font-bold text-gold dark:bg-gold-50">
            <FiStar /> {c.rating} · {c.reviewCount}
          </span>
          <span className="rounded-full border border-line px-3.5 py-1.5 text-[12.5px] font-semibold text-brand-ink">
            Follow
          </span>
        </div>
      </div>

      {/* Facts */}
      <div className="mx-5 mt-6 grid grid-cols-3 gap-2 rounded-3xl border border-line-soft bg-surface p-2 shadow-[var(--shadow-soft)]">
        <Fact icon={FiMapPin} label="HQ" value={c.location.split(",")[0]} />
        <Fact icon={FiUsers} label="Size" value={c.size} />
        <Fact icon={FiCalendar} label="Founded" value={c.founded} />
      </div>

      <div className="space-y-7 px-6 pt-7">
        <section>
          <h2 className="mb-2 text-[16px] font-bold text-ink">About</h2>
          <p className="text-[14.5px] leading-relaxed text-ink-soft">{c.about}</p>
        </section>

        <section>
          <h2 className="mb-3 text-[16px] font-bold text-ink">Culture</h2>
          <div className="flex flex-wrap gap-2">
            {c.culture.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-[16px] font-bold text-ink">Benefits</h2>
          <ul className="grid grid-cols-1 gap-2.5">
            {c.benefits.map((b) => (
              <li key={b} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-ink">
                  <FiCheck className="text-[0.8rem]" />
                </span>
                <span className="text-[14px] text-ink-soft">{b}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Reviews */}
        <section>
          <h2 className="mb-3 text-[16px] font-bold text-ink">Employee reviews</h2>
          <div className="space-y-3">
            {c.reviews.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[14px] font-bold text-ink">{r.name}</p>
                    <p className="text-[12px] text-muted">{r.role}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#fbf0db] px-2.5 py-1 text-[12px] font-bold text-gold dark:bg-gold-50">
                    <FiStar /> {r.rating}
                  </span>
                </div>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                  “{r.text}”
                </p>
                <p className="mt-1.5 text-[11.5px] text-muted">{r.time}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open jobs */}
        <section id="openings">
          <h2 className="mb-3 text-[16px] font-bold text-ink">
            Open roles ({openJobs.length})
          </h2>
          <div className="space-y-3">
            {openJobs.length ? (
              openJobs.map((j) => <JobCard key={j.id} job={j} />)
            ) : (
              <p className="py-6 text-center text-[13.5px] text-muted">
                No open roles right now.
              </p>
            )}
          </div>
        </section>
      </div>
    </AppScreen>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: import("react-icons").IconType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 py-3">
      <Icon className="text-[1.15rem] text-brand-ink" />
      <span className="text-[13.5px] font-bold text-ink">{value}</span>
      <span className="text-[11px] text-muted">{label}</span>
    </div>
  );
}
