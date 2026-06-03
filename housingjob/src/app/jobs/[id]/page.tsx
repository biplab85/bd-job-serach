import { notFound } from "next/navigation";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Button, Tag } from "@/components/ui";
import { CompanyMark } from "@/components/JobCard";
import { SaveButton } from "@/components/SaveButton";
import { ShareButton } from "@/components/ShareButton";
import { getJob, jobs } from "@/lib/data";
import {
  FiMapPin,
  FiClock,
  FiBriefcase,
  FiUsers,
  FiCalendar,
  FiCheck,
} from "react-icons/fi";

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export default async function JobDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJob(id);
  if (!job) notFound();

  const stats = [
    { icon: FiBriefcase, label: "Type", value: job.type },
    { icon: FiUsers, label: "Openings", value: String(job.openings) },
    { icon: FiCalendar, label: "Closes", value: job.deadline.split(",")[0] },
  ];

  return (
    <AppScreen
      header={
        <TopBar
          title="Job details"
          right={
            <>
              <ShareButton title={job.title} text={`${job.title} at ${job.company} — on HousingJob`} />
              <SaveButton />
            </>
          }
        />
      }
      nav={
        <div className="flex items-center gap-3 border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <div className="leading-tight">
            <p className="text-[11px] text-muted">Salary</p>
            <p className="text-[17px] font-bold text-ink">{job.salary}</p>
          </div>
          <Button href={`/apply/${job.id}`} variant="primary" className="flex-1">
            Apply now
          </Button>
        </div>
      }
      contentClassName="pb-6"
    >
      {/* Hero */}
      <div className="flex flex-col items-center px-6 pt-4 text-center">
        <CompanyMark job={job} size={72} />
        <h1 className="font-display mt-4 text-[25px] font-semibold leading-tight tracking-tight text-ink">
          {job.title}
        </h1>
        <p className="mt-1.5 text-[14px] text-muted">
          {job.company} · {job.location}
        </p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[12.5px] font-semibold text-brand-ink">
            <FiClock /> {job.level}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1.5 text-[12.5px] font-semibold text-accent-600">
            <FiMapPin /> {job.location}
          </span>
        </div>
      </div>

      {/* Stat strip */}
      <div className="mx-5 mt-6 grid grid-cols-3 gap-2 rounded-3xl border border-line-soft bg-surface p-2 shadow-[var(--shadow-soft)]">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-1 py-3">
            <s.icon className="text-[1.15rem] text-brand-ink" />
            <span className="text-[14px] font-bold text-ink">{s.value}</span>
            <span className="text-[11px] text-muted">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Sections */}
      <div className="space-y-7 px-6 pt-7">
        <Section title="About the role">
          <p className="text-[14.5px] leading-relaxed text-ink-soft">{job.about}</p>
        </Section>

        <Section title="What you'll do">
          <ul className="space-y-2.5">
            {job.responsibilities.map((r) => (
              <ListItem key={r}>{r}</ListItem>
            ))}
          </ul>
        </Section>

        <Section title="What we're looking for">
          <ul className="space-y-2.5">
            {job.requirements.map((r) => (
              <ListItem key={r}>{r}</ListItem>
            ))}
          </ul>
        </Section>

        <Section title="Skills">
          <div className="flex flex-wrap gap-2">
            {job.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>
        </Section>

        <div className="flex items-center gap-3.5 rounded-3xl border border-line-soft bg-surface p-4">
          <CompanyMark job={job} size={50} />
          <div className="min-w-0 flex-1">
            <p className="text-[14.5px] font-bold text-ink">{job.company}</p>
            <p className="text-[12.5px] text-muted">Posted {job.posted}</p>
          </div>
          <span className="rounded-full border border-line px-3.5 py-1.5 text-[12.5px] font-semibold text-brand-ink">
            Follow
          </span>
        </div>
      </div>
    </AppScreen>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-[16px] font-bold tracking-tight text-ink">{title}</h2>
      {children}
    </section>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-ink">
        <FiCheck className="text-[0.85rem]" />
      </span>
      <span className="text-[14.5px] leading-relaxed text-ink-soft">{children}</span>
    </li>
  );
}
