import Link from "next/link";
import { FiMapPin, FiClock, FiArrowUpRight } from "react-icons/fi";
import { Job } from "@/lib/data";
import { Tag } from "./ui";
import { SaveButton } from "./SaveButton";

export function CompanyMark({ job, size = 50 }: { job: Job; size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-2xl font-display text-lg font-semibold text-white"
      style={{ background: job.logoBg, width: size, height: size }}
    >
      {job.companyLogo}
    </span>
  );
}

/* Light list card */
export function JobCard({ job, saved }: { job: Job; saved?: boolean }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="block rounded-3xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
    >
      <div className="flex items-start gap-3.5">
        <CompanyMark job={job} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15.5px] font-bold tracking-tight text-ink">
            {job.title}
          </h3>
          <p className="mt-0.5 text-[13px] text-muted">{job.company}</p>
        </div>
        <SaveButton initial={saved} />
      </div>

      <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <FiMapPin className="text-brand-ink" /> {job.location}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FiClock className="text-brand-ink" /> {job.type}
        </span>
      </div>

      <div className="mt-3.5 flex items-center justify-between border-t border-line-soft pt-3.5">
        <span className="text-[15px] font-bold text-ink">
          {job.salary}
          <span className="text-xs font-medium text-muted"> /mo</span>
        </span>
        <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-brand-ink">
          Details <FiArrowUpRight />
        </span>
      </div>
    </Link>
  );
}

/* Bold featured card for carousels */
export function FeaturedJobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="relative block w-[280px] shrink-0 overflow-hidden rounded-[1.75rem] bg-brand p-5 text-white shadow-[var(--shadow-card)]"
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
      />
      <div className="relative flex items-center justify-between">
        <span
          className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 font-display text-lg font-semibold backdrop-blur"
        >
          {job.companyLogo}
        </span>
        <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
          Featured
        </span>
      </div>
      <h3 className="relative mt-4 text-[19px] font-bold leading-snug tracking-tight">
        {job.title}
      </h3>
      <p className="relative mt-1 text-[13px] text-white/70">
        {job.company} · {job.location}
      </p>
      <div className="relative mt-4 flex items-center gap-2">
        {job.tags.slice(0, 2).map((t) => (
          <span
            key={t}
            className="rounded-full bg-white/12 px-2.5 py-1 text-[11px] font-medium text-white/90"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="relative mt-5 flex items-center justify-between border-t border-white/15 pt-4">
        <span className="text-[17px] font-bold">{job.salary}</span>
        <span className="text-[12px] text-white/70">{job.posted}</span>
      </div>
    </Link>
  );
}

/* Tiny row for compact lists */
export function JobRow({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="flex items-center gap-3.5 rounded-2xl p-2.5 transition-colors hover:bg-paper-2"
    >
      <CompanyMark job={job} size={46} />
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[14.5px] font-bold tracking-tight text-ink">{job.title}</h3>
        <p className="truncate text-[12.5px] text-muted">
          {job.company} · {job.location}
        </p>
      </div>
      <span className="shrink-0 text-[13px] font-bold text-brand-ink">{job.salary}</span>
    </Link>
  );
}

export function JobTagRow({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  );
}
