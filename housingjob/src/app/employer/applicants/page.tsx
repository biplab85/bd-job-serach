import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Avatar, Pill } from "@/components/ui";
import {
  candidates,
  candidatesForJob,
  candStatusColor,
  getJob,
} from "@/lib/data";
import { FiMapPin, FiBriefcase, FiChevronRight } from "react-icons/fi";

export default async function ApplicantsPage({
  searchParams,
}: {
  searchParams: Promise<{ job?: string }>;
}) {
  const { job: jobId } = await searchParams;
  const job = jobId ? getJob(jobId) : undefined;
  const list = jobId ? candidatesForJob(jobId) : candidates;
  const filters = ["All", "New", "Shortlisted", "Interview"];

  return (
    <AppScreen
      header={
        <TopBar
          title="Applicants"
          subtitle={job ? job.title : `${list.length} candidates`}
        />
      }
      contentClassName="pb-8"
    >
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-4">
        {filters.map((f, i) => (
          <span
            key={f}
            className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold ${
              i === 0 ? "bg-brand text-white" : "border border-line bg-surface text-ink-soft"
            }`}
          >
            {f}
          </span>
        ))}
      </div>

      <div className="stagger space-y-3 px-5">
        {list.map((c, idx) => {
          const appliedJob = getJob(c.appliedFor);
          return (
            <Link
              key={c.id}
              href={`/employer/applicants/${c.id}`}
              style={{ ["--i" as string]: idx }}
              className="block rounded-3xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start gap-3.5">
                <Avatar initials={c.initials} bg={c.avatarBg} size={48} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="flex-1 truncate text-[15px] font-bold tracking-tight text-ink">
                      {c.name}
                    </h3>
                    <span className="shrink-0 rounded-lg bg-brand-50 px-2 py-0.5 text-[12px] font-bold text-brand-ink">
                      {c.match}% match
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-[12.5px] text-muted">{c.role}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <FiMapPin className="text-brand-ink" /> {c.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FiBriefcase className="text-brand-ink" /> {c.experience}
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-line-soft pt-3">
                <Pill className={candStatusColor[c.status]}>{c.status}</Pill>
                <span className="inline-flex items-center gap-1 text-[12.5px] text-muted">
                  {appliedJob ? appliedJob.title.split(" ").slice(0, 2).join(" ") : ""} · {c.appliedAgo}
                  <FiChevronRight />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </AppScreen>
  );
}
