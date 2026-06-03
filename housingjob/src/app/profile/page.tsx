import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { BottomNav } from "@/components/BottomNav";
import { IconButton, Tag } from "@/components/ui";
import { MenuRow, MenuGroup } from "@/components/MenuRow";
import { ThemeIconButton } from "@/components/ThemeToggle";
import { user } from "@/lib/data";
import {
  FiSettings,
  FiFileText,
  FiBookmark,
  FiHelpCircle,
  FiInfo,
  FiLogOut,
  FiEdit2,
  FiBriefcase,
  FiMapPin,
  FiGrid,
  FiBarChart2,
  FiAward,
  FiUsers,
  FiArrowRight,
} from "react-icons/fi";

export default function ProfilePage() {
  return (
    <AppScreen nav={<BottomNav />} contentClassName="pb-6">
      {/* Cover + avatar */}
      <div className="relative">
        <div className="relative h-32 bg-brand-700">
          <div className="pointer-events-none absolute inset-0 texture-grain opacity-[0.12]" />
          <div className="absolute right-4 top-4 flex gap-1.5">
            <ThemeIconButton />
            <IconButton icon={FiSettings} href="/settings" label="Settings" />
          </div>
        </div>
        <div className="relative z-10 px-5">
          <div className="-mt-12 flex items-end justify-between">
            <span
              className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] font-display text-3xl font-semibold text-white ring-4 ring-paper"
              style={{ background: user.avatarBg }}
            >
              {user.initials}
            </span>
            <Link
              href="/profile/edit"
              className="mb-1 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-[13px] font-semibold text-ink"
            >
              <FiEdit2 /> Edit
            </Link>
          </div>
          <h1 className="font-display mt-3 text-[24px] font-semibold tracking-tight text-ink">
            {user.name}
          </h1>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <FiBriefcase className="text-brand-ink" /> {user.title}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <FiMapPin className="text-brand-ink" /> {user.location}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-5 mt-5 grid grid-cols-3 divide-x divide-line-soft rounded-3xl border border-line-soft bg-surface py-4 shadow-[var(--shadow-soft)]">
        {[
          { v: user.stats.applied, l: "Applied" },
          { v: user.stats.interviews, l: "Interviews" },
          { v: user.stats.saved, l: "Saved" },
        ].map((s) => (
          <div key={s.l} className="flex flex-col items-center">
            <span className="font-display text-[22px] font-semibold text-ink">{s.v}</span>
            <span className="text-[12px] text-muted">{s.l}</span>
          </div>
        ))}
      </div>

      {/* Completion */}
      <div className="mx-5 mt-4 rounded-3xl bg-brand-50 p-4">
        <div className="flex items-center justify-between text-[13px]">
          <span className="font-semibold text-brand-ink">Profile strength</span>
          <span className="font-bold text-brand-ink">{user.profileComplete}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-100">
          <div className="h-full rounded-full bg-brand" style={{ width: `${user.profileComplete}%` }} />
        </div>
        <p className="mt-2 text-[12px] text-brand-ink/80">
          Add a portfolio link to reach 100% and rank higher.
        </p>
      </div>

      {/* About */}
      <section className="px-5 pt-6">
        <h2 className="mb-2 text-[15px] font-bold text-ink">About</h2>
        <p className="text-[14px] leading-relaxed text-ink-soft">{user.about}</p>
      </section>

      {/* Skills */}
      <section className="px-5 pt-6">
        <h2 className="mb-3 text-[15px] font-bold text-ink">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {user.skills.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>
      </section>

      {/* Premium upsell */}
      <section className="px-5 pt-6">
        <Link
          href="/premium"
          className="flex items-center gap-3 overflow-hidden rounded-3xl bg-brand-700 p-4 text-white shadow-[var(--shadow-card)]"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent">
            <FiAward className="text-2xl" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-bold">Upgrade to Pro</p>
            <p className="text-[12.5px] text-white/70">Get noticed faster & unlock insights</p>
          </div>
          <FiArrowRight className="shrink-0 text-xl" />
        </Link>
      </section>

      {/* Explore */}
      <section className="px-5 pt-4">
        <MenuGroup>
          <MenuRow icon={FiGrid} label="Companies" href="/companies" />
          <MenuRow icon={FiBarChart2} label="Salary insights" href="/salary" />
          <MenuRow icon={FiFileText} label="My CV / Resume" href="/cv" />
          <MenuRow icon={FiBookmark} label="Saved jobs" href="/saved" value={`${user.stats.saved}`} />
        </MenuGroup>
      </section>

      {/* Recruiter */}
      <section className="px-5 pt-4">
        <MenuGroup>
          <MenuRow icon={FiUsers} label="Switch to recruiter" href="/employer" tint="bg-accent-50" />
        </MenuGroup>
      </section>

      {/* Account */}
      <section className="px-5 pt-4">
        <MenuGroup>
          <MenuRow icon={FiSettings} label="Settings" href="/settings" />
          <MenuRow icon={FiHelpCircle} label="Help & support" href="/help" />
          <MenuRow icon={FiInfo} label="About HousingJob" href="/about" />
        </MenuGroup>
        <div className="mt-3">
          <MenuGroup>
            <MenuRow icon={FiLogOut} label="Log out" href="/login" danger />
          </MenuGroup>
        </div>
      </section>
    </AppScreen>
  );
}
