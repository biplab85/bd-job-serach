import { notFound } from "next/navigation";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Avatar, Button, Pill, Tag, IconButton } from "@/components/ui";
import { RejectButton, DownloadCvButton } from "@/components/ActionButtons";
import {
  candidates,
  candStatusColor,
  getCandidate,
  getJob,
} from "@/lib/data";
import {
  FiMapPin,
  FiBriefcase,
  FiCheck,
  FiCalendar,
  FiMessageCircle,
} from "react-icons/fi";

export function generateStaticParams() {
  return candidates.map((c) => ({ id: c.id }));
}

export default async function CandidateDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = getCandidate(id);
  if (!c) notFound();
  const job = getJob(c.appliedFor);

  return (
    <AppScreen
      header={
        <TopBar
          title="Candidate"
          right={<DownloadCvButton />}
        />
      }
      contentClassName="pb-6"
      nav={
        <div className="flex items-center gap-2.5 border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <RejectButton name={c.name} />
          <IconButton icon={FiMessageCircle} label="Message" href="/messages/c1" />
          <Button href="/book-interview" variant="primary" icon={FiCalendar} className="flex-1">
            Interview
          </Button>
        </div>
      }
    >
      {/* Hero */}
      <div className="flex flex-col items-center px-6 pt-4 text-center">
        <Avatar initials={c.initials} bg={c.avatarBg} size={76} />
        <h1 className="font-display mt-4 text-[24px] font-semibold tracking-tight text-ink">
          {c.name}
        </h1>
        <p className="mt-1 text-[14px] text-muted">{c.role}</p>
        <div className="mt-3 flex items-center gap-2">
          <Pill className={candStatusColor[c.status]}>{c.status}</Pill>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-[12.5px] font-bold text-brand-ink">
            {c.match}% match
          </span>
        </div>
      </div>

      {/* Quick facts */}
      <div className="mx-5 mt-6 grid grid-cols-2 gap-2 rounded-3xl border border-line-soft bg-surface p-2 shadow-[var(--shadow-soft)]">
        <Fact icon={FiMapPin} label="Location" value={c.location} />
        <Fact icon={FiBriefcase} label="Experience" value={c.experience} />
      </div>

      <div className="space-y-7 px-6 pt-7">
        {job && (
          <div className="rounded-2xl bg-brand-50 p-4">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-brand-ink">
              Applied for
            </p>
            <p className="mt-1 text-[15px] font-bold text-ink">{job.title}</p>
            <p className="text-[12.5px] text-muted">Applied {c.appliedAgo}</p>
          </div>
        )}

        <section>
          <h2 className="mb-2 text-[16px] font-bold text-ink">About</h2>
          <p className="text-[14.5px] leading-relaxed text-ink-soft">{c.about}</p>
        </section>

        <section>
          <h2 className="mb-3 text-[16px] font-bold text-ink">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {c.skills.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </section>

        <div className="flex items-center gap-2 rounded-2xl border border-brand-100 bg-brand-50 p-4">
          <FiCheck className="text-brand-ink" />
          <p className="text-[13px] font-semibold text-brand-ink">
            Strong match — top {100 - c.match + 6}% of applicants for this role.
          </p>
        </div>
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
    <div className="flex items-center gap-3 rounded-2xl px-3 py-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-ink">
        <Icon className="text-[1.1rem]" />
      </span>
      <div>
        <p className="text-[11px] text-muted">{label}</p>
        <p className="text-[13.5px] font-bold text-ink">{value}</p>
      </div>
    </div>
  );
}
