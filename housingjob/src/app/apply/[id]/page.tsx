import { notFound } from "next/navigation";
import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Button, Field, Textarea, Avatar } from "@/components/ui";
import { CompanyMark } from "@/components/JobCard";
import { Screening } from "@/components/Screening";
import { UploadDifferentFile } from "@/components/FileButton";
import { getJob, user, jobs } from "@/lib/data";
import { FiFileText, FiCheck, FiEdit2 } from "react-icons/fi";

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const job = getJob(id);
  if (!job) notFound();

  return (
    <AppScreen
      header={<TopBar title="Apply" subtitle={job.title} />}
      nav={
        <div className="border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <Button href={`/confirmation?job=${job.id}`} variant="primary" full>
            Submit application
          </Button>
        </div>
      }
      contentClassName="px-5 py-5 space-y-6"
    >
      {/* Job summary */}
      <div className="flex items-center gap-3.5 rounded-3xl border border-line-soft bg-surface p-3.5 shadow-[var(--shadow-soft)]">
        <CompanyMark job={job} size={48} />
        <div className="min-w-0">
          <p className="truncate text-[14.5px] font-bold text-ink">{job.title}</p>
          <p className="text-[12.5px] text-muted">
            {job.company} · {job.salary}
          </p>
        </div>
      </div>

      {/* Profile */}
      <section>
        <h2 className="mb-3 text-[15px] font-bold text-ink">Your profile</h2>
        <div className="flex items-center gap-3.5 rounded-3xl bg-brand-50 p-3.5">
          <Avatar initials={user.initials} bg={user.avatarBg} size={48} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14.5px] font-bold text-ink">{user.name}</p>
            <p className="truncate text-[12.5px] text-muted">
              {user.title} · {user.location}
            </p>
          </div>
          <Link
            href="/profile/edit"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-brand-ink"
            aria-label="Edit profile"
          >
            <FiEdit2 />
          </Link>
        </div>
      </section>

      {/* Resume */}
      <section>
        <h2 className="mb-3 text-[15px] font-bold text-ink">Resume / CV</h2>
        <div className="flex items-center gap-3.5 rounded-2xl border-2 border-brand bg-surface p-3.5">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent">
            <FiFileText className="text-xl" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13.5px] font-bold text-ink">Biplab_Paul_CV.pdf</p>
            <p className="text-[12px] text-muted">280 KB · Updated Jun 10</p>
          </div>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white">
            <FiCheck className="text-sm" />
          </span>
        </div>
        <UploadDifferentFile />
      </section>

      {/* Cover letter */}
      <section>
        <Field label="Cover letter" hint="A short, genuine note goes a long way.">
          <Textarea
            rows={5}
            placeholder={`Hi ${job.company} team, I'm excited to apply because…`}
          />
        </Field>
      </section>

      {/* Screening */}
      <section>
        <h2 className="mb-3 text-[15px] font-bold text-ink">Quick questions</h2>
        <div className="space-y-4">
          <Screening
            q="Years of relevant experience?"
            options={["0–1", "2–3", "4–6", "7+"]}
            preselect={2}
          />
          <Screening
            q="When can you start?"
            options={["Immediately", "2 weeks", "1 month"]}
            preselect={1}
          />
        </div>
      </section>
    </AppScreen>
  );
}
