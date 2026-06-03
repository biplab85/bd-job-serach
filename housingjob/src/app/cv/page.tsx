import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { IconButton, Button, Tag, Avatar } from "@/components/ui";
import { user } from "@/lib/data";
import { FiDownload, FiEdit2, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function CvPage() {
  return (
    <AppScreen
      header={
        <TopBar
          title="My CV"
          right={<IconButton icon={FiDownload} label="Download" variant="ghost" />}
        />
      }
      contentClassName="px-5 py-5 space-y-6"
      nav={
        <div className="border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <Button href="/cv/create" variant="primary" full icon={FiEdit2}>
            Edit CV
          </Button>
        </div>
      }
    >
      {/* Header */}
      <div className="flex items-center gap-4 rounded-3xl bg-night p-5 text-white">
        <Avatar initials={user.initials} bg="#1aa176" size={60} />
        <div className="min-w-0">
          <p className="font-display text-[20px] font-semibold leading-tight">{user.name}</p>
          <p className="text-[13px] text-white/70">{user.title}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 px-1 text-[12.5px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <FiMail className="text-brand-ink" /> {user.email}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FiPhone className="text-brand-ink" /> {user.phone}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <FiMapPin className="text-brand-ink" /> {user.location}
        </span>
      </div>

      <CvSection title="Summary">
        <p className="text-[14px] leading-relaxed text-ink-soft">{user.about}</p>
      </CvSection>

      <CvSection title="Experience">
        <ol className="relative ml-2 space-y-5 border-l-2 border-line pl-5">
          {user.experience.map((e) => (
            <li key={e.role} className="relative">
              <span
                className={`absolute -left-[27px] top-1 h-3 w-3 rounded-full ring-4 ring-paper ${
                  e.current ? "bg-brand" : "bg-line"
                }`}
              />
              <p className="text-[14.5px] font-bold text-ink">{e.role}</p>
              <p className="text-[13px] text-muted">{e.company}</p>
              <p className="text-[12px] text-muted">{e.period}</p>
            </li>
          ))}
        </ol>
      </CvSection>

      <CvSection title="Education">
        {user.education.map((e) => (
          <div key={e.degree}>
            <p className="text-[14.5px] font-bold text-ink">{e.degree}</p>
            <p className="text-[13px] text-muted">
              {e.school} · {e.period}
            </p>
          </div>
        ))}
      </CvSection>

      <CvSection title="Skills">
        <div className="flex flex-wrap gap-2">
          {user.skills.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </CvSection>
    </AppScreen>
  );
}

function CvSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)]">
      <h2 className="mb-3 text-[13px] font-bold uppercase tracking-wide text-brand-ink">
        {title}
      </h2>
      {children}
    </section>
  );
}
