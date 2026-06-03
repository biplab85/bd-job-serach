import { notFound } from "next/navigation";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Button, Pill } from "@/components/ui";
import { CompanyMark } from "@/components/JobCard";
import { applications, getApplication, getJob, statusColor } from "@/lib/data";
import { FiCheck, FiVideo, FiCalendar, FiClock, FiMessageCircle } from "react-icons/fi";

const TIMELINE = ["Applied", "Reviewed", "Shortlisted", "Interview", "Decision"];

export function generateStaticParams() {
  return applications.map((a) => ({ id: a.id }));
}

export default async function ApplicationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const app = getApplication(id);
  if (!app) notFound();
  const job = getJob(app.jobId);
  if (!job) notFound();

  const rejected = app.status === "Rejected";
  const isInterview = app.status === "Interview";

  return (
    <AppScreen
      header={<TopBar title="Application" />}
      contentClassName="px-5 py-5 space-y-6"
      nav={
        <div className="flex gap-3 border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <Button href="/messages/c1" variant="outline" icon={FiMessageCircle} className="flex-1">
            Message
          </Button>
          <Button
            href={isInterview ? "/book-interview" : `/jobs/${job.id}`}
            variant="primary"
            className="flex-1"
          >
            {isInterview ? "Reschedule" : "View job"}
          </Button>
        </div>
      }
    >
      {/* Header card */}
      <div className="flex items-center gap-3.5 rounded-3xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)]">
        <CompanyMark job={job} size={52} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-[15px] font-bold text-ink">{job.title}</p>
          <p className="text-[12.5px] text-muted">
            {job.company} · {job.location}
          </p>
        </div>
        <Pill className={statusColor[app.status]}>{app.status}</Pill>
      </div>

      {/* Interview card */}
      {isInterview && (
        <div className="relative overflow-hidden rounded-3xl bg-night p-5 text-white">
          <div
            className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle,#1aa176,transparent 70%)" }}
          />
          <div className="relative flex items-center gap-2 text-mint">
            <FiVideo /> <span className="text-[12.5px] font-semibold">Video interview</span>
          </div>
          <p className="font-display relative mt-2 text-[22px] font-semibold">
            Tue, Jun 24 · 11:00 AM
          </p>
          <div className="relative mt-3 flex gap-4 text-[12.5px] text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <FiCalendar /> 30 minutes
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiClock /> Asia/Dhaka
            </span>
          </div>
          <Button href="/book-interview" variant="accent" full className="mt-4">
            Join / manage interview
          </Button>
        </div>
      )}

      {/* Timeline */}
      <section>
        <h2 className="mb-4 text-[15px] font-bold text-ink">Progress</h2>
        <ol className="relative ml-2 space-y-6 border-l-2 border-line pl-6">
          {TIMELINE.map((stage, i) => {
            const done = !rejected && i <= app.step;
            const current = !rejected && i === app.step;
            return (
              <li key={stage} className="relative">
                <span
                  className={`absolute -left-[33px] flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-paper ${
                    done ? "bg-brand text-white" : "bg-line text-muted"
                  }`}
                >
                  {done ? <FiCheck className="text-[0.8rem]" /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                </span>
                <p
                  className={`text-[14px] font-semibold ${
                    done ? "text-ink" : "text-muted"
                  }`}
                >
                  {stage}
                </p>
                <p className="text-[12px] text-muted">
                  {current
                    ? "In progress"
                    : done
                      ? "Completed"
                      : rejected && i > app.step
                        ? "—"
                        : "Pending"}
                </p>
              </li>
            );
          })}
        </ol>
      </section>

      {rejected && (
        <div className="rounded-2xl bg-paper-2 p-4 text-center text-[13.5px] text-muted">
          This role has been filled. Keep going — better fits are on the way.
        </div>
      )}
    </AppScreen>
  );
}
