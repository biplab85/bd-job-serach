import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { BottomNav } from "@/components/BottomNav";
import { Pill } from "@/components/ui";
import { CompanyMark } from "@/components/JobCard";
import { applications, getJob, statusColor, user } from "@/lib/data";
import { FiChevronRight } from "react-icons/fi";

const STEPS = ["Applied", "Reviewed", "Shortlisted", "Interview"];

export default function ApplicationsPage() {
  const filters = ["All", "Active", "Interviews", "Closed"];
  return (
    <AppScreen
      nav={<BottomNav />}
      contentClassName="pb-6"
      header={
        <div className="px-5 pb-3 pt-5">
          <h1 className="font-display text-[24px] font-semibold tracking-tight text-ink">
            Applications
          </h1>
          <p className="text-[13px] text-muted">
            {user.stats.applied} total · {user.stats.interviews} interviews
          </p>
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
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
        </div>
      }
    >
      <div className="stagger space-y-3 px-5 pt-2">
        {applications.map((a, idx) => {
          const job = getJob(a.jobId);
          if (!job) return null;
          const rejected = a.status === "Rejected";
          return (
            <Link
              key={a.id}
              href={`/applications/${a.id}`}
              style={{ ["--i" as string]: idx }}
              className="block rounded-3xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center gap-3.5">
                <CompanyMark job={job} size={48} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14.5px] font-bold text-ink">{job.title}</p>
                  <p className="text-[12.5px] text-muted">
                    {job.company} · Applied {a.appliedOn}
                  </p>
                </div>
                <Pill className={statusColor[a.status]}>{a.status}</Pill>
              </div>

              {/* progress */}
              <div className="mt-4 flex items-center gap-1.5">
                {STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      rejected
                        ? "bg-line"
                        : i <= a.step
                          ? "bg-brand"
                          : "bg-line"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-[11.5px] text-muted">
                  {rejected ? "Not selected" : `Stage: ${STEPS[Math.min(a.step, 3)]}`}
                </span>
                <FiChevronRight className="text-muted" />
              </div>
            </Link>
          );
        })}
      </div>
    </AppScreen>
  );
}
