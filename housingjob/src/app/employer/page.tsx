import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { Avatar, Button, Pill, SectionHead, IconButton } from "@/components/ui";
import {
  employer,
  employerPosts,
  getJob,
  postStatusColor,
  candidates,
  candStatusColor,
} from "@/lib/data";
import {
  FiPlus,
  FiUsers,
  FiEye,
  FiBriefcase,
  FiTrendingUp,
  FiChevronRight,
  FiRepeat,
} from "react-icons/fi";
import type { IconType } from "react-icons";

export default function EmployerDashboard() {
  const totalApplicants = employerPosts.reduce((s, p) => s + p.applicants, 0);
  const totalViews = employerPosts.reduce((s, p) => s + p.views, 0);
  const totalNew = employerPosts.reduce((s, p) => s + p.new, 0);
  const active = employerPosts.filter((p) => p.status === "Active").length;

  const stats: { icon: IconType; label: string; value: string; tint: string }[] = [
    { icon: FiBriefcase, label: "Active posts", value: String(active), tint: "bg-brand-50 text-brand-ink" },
    { icon: FiUsers, label: "Applicants", value: String(totalApplicants), tint: "bg-accent-50 text-accent" },
    { icon: FiEye, label: "Views", value: totalViews.toLocaleString(), tint: "bg-brand-50 text-brand-ink" },
    { icon: FiTrendingUp, label: "New / week", value: String(totalNew), tint: "bg-accent-50 text-accent" },
  ];

  return (
    <AppScreen
      contentClassName="pb-8"
      header={
        <header className="flex items-center justify-between px-5 pb-2 pt-5">
          <div className="flex items-center gap-3">
            <Avatar initials={employer.initials} bg={employer.logoBg} size={46} />
            <div>
              <p className="text-[12.5px] text-muted">Recruiter</p>
              <p className="-mt-0.5 text-[15px] font-bold tracking-tight text-ink">
                {employer.name}
              </p>
            </div>
          </div>
          <IconButton icon={FiRepeat} href="/home" label="Switch to job seeker" />
        </header>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 px-5 pt-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-3xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)]"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.tint}`}>
              <s.icon className="text-[1.2rem]" />
            </span>
            <p className="font-display mt-3 text-[24px] font-semibold leading-none text-ink">
              {s.value}
            </p>
            <p className="mt-1 text-[12.5px] text-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Post CTA */}
      <div className="px-5 pt-4">
        <Button href="/employer/post-job" variant="primary" full icon={FiPlus}>
          Post a new job
        </Button>
      </div>

      {/* Posts */}
      <section className="px-5 pt-7">
        <SectionHead title="Your job posts" />
        <div className="space-y-3">
          {employerPosts.map((p) => {
            const job = getJob(p.jobId);
            if (!job) return null;
            return (
              <Link
                key={p.jobId}
                href={`/employer/applicants?job=${p.jobId}`}
                className="block rounded-3xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-[15px] font-bold tracking-tight text-ink">
                      {job.title}
                    </h3>
                    <p className="mt-0.5 text-[12.5px] text-muted">{job.location} · {job.type}</p>
                  </div>
                  <Pill className={postStatusColor[p.status]}>{p.status}</Pill>
                </div>
                <div className="mt-3.5 flex items-center gap-4 border-t border-line-soft pt-3 text-[12.5px] text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <FiUsers className="text-brand-ink" /> {p.applicants} applicants
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <FiEye className="text-brand-ink" /> {p.views}
                  </span>
                  {p.new > 0 && (
                    <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-white">
                      {p.new} new
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Latest applicants */}
      <section className="px-5 pt-7">
        <SectionHead title="Latest applicants" action="View all" href="/employer/applicants" />
        <div className="divide-y divide-line-soft overflow-hidden rounded-3xl border border-line-soft bg-surface shadow-[var(--shadow-soft)]">
          {candidates.slice(0, 4).map((c) => (
            <Link
              key={c.id}
              href={`/employer/applicants/${c.id}`}
              className="flex items-center gap-3.5 px-4 py-3 transition-colors hover:bg-paper-2"
            >
              <Avatar initials={c.initials} bg={c.avatarBg} size={42} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-bold text-ink">{c.name}</p>
                <p className="truncate text-[12px] text-muted">{c.role}</p>
              </div>
              <span className="text-right">
                <span className="block text-[13px] font-bold text-brand-ink">{c.match}%</span>
                <Pill className={`${candStatusColor[c.status]} mt-0.5`}>{c.status}</Pill>
              </span>
              <FiChevronRight className="text-muted" />
            </Link>
          ))}
        </div>
      </section>
    </AppScreen>
  );
}
