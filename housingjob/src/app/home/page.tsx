import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { BottomNav } from "@/components/BottomNav";
import { IconButton, Avatar, SectionHead } from "@/components/ui";
import { CategoryTile } from "@/components/CategoryCard";
import { FeaturedJobCard, JobCard } from "@/components/JobCard";
import {
  categories,
  featuredJobs,
  jobs,
  user,
} from "@/lib/data";
import {
  FiBell,
  FiSearch,
  FiSliders,
  FiTrendingUp,
  FiGrid,
  FiBarChart2,
  FiAward,
} from "react-icons/fi";

export default function Home() {
  return (
    <AppScreen
      nav={<BottomNav />}
      contentClassName="pb-6"
      header={
        <header className="flex items-center justify-between px-5 pb-2 pt-5">
          <Link href="/profile" className="flex items-center gap-3">
            <Avatar initials={user.initials} bg={user.avatarBg} size={46} />
            <div>
              <p className="text-[12.5px] text-muted">Good morning 👋</p>
              <p className="-mt-0.5 text-[15px] font-bold tracking-tight text-ink">
                {user.firstName} Paul
              </p>
            </div>
          </Link>
          <IconButton icon={FiBell} href="/notifications" label="Notifications" badge={3} />
        </header>
      }
    >
      {/* Search */}
      <div className="px-5 pt-2">
        <Link
          href="/search"
          className="flex items-center gap-3 rounded-2xl border border-line-soft bg-surface px-4 py-3.5 shadow-[var(--shadow-soft)]"
        >
          <FiSearch className="text-xl text-muted" />
          <span className="flex-1 text-[14.5px] text-muted">Search jobs, companies…</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-white">
            <FiSliders className="text-[1.05rem]" />
          </span>
        </Link>
      </div>

      {/* Stat banner */}
      <div className="px-5 pt-5">
        <div className="relative overflow-hidden rounded-3xl bg-night p-5 text-white">
          <div
            className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full opacity-25"
            style={{ background: "radial-gradient(circle,#1aa176,transparent 70%)" }}
          />
          <div className="relative flex items-center justify-between">
            <div>
              <p className="text-[13px] text-white/60">Your job search</p>
              <p className="font-display mt-1 text-[26px] font-semibold leading-none">
                {user.stats.applied} applications
              </p>
              <div className="mt-3 flex gap-4 text-[12.5px]">
                <span className="text-mint">
                  <b className="text-white">{user.stats.interviews}</b> interviews
                </span>
                <span className="text-mint">
                  <b className="text-white">{user.stats.saved}</b> saved
                </span>
              </div>
            </div>
            <Link
              href="/applications"
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-white"
            >
              <FiTrendingUp className="text-xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* Quick access */}
      <div className="grid grid-cols-3 gap-3 px-5 pt-5">
        {[
          { href: "/companies", icon: FiGrid, label: "Companies", tint: "bg-brand-50 text-brand-ink" },
          { href: "/salary", icon: FiBarChart2, label: "Salary", tint: "bg-accent-50 text-accent" },
          { href: "/premium", icon: FiAward, label: "Go Pro", tint: "bg-[#fbf0db] text-gold dark:bg-gold-50" },
        ].map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="flex flex-col items-center gap-2 rounded-2xl border border-line-soft bg-surface py-3.5 shadow-[var(--shadow-soft)] transition active:scale-95"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${q.tint}`}>
              <q.icon className="text-[1.2rem]" />
            </span>
            <span className="text-[12px] font-semibold text-ink">{q.label}</span>
          </Link>
        ))}
      </div>

      {/* Categories */}
      <section className="pt-7">
        <div className="px-5">
          <SectionHead title="Browse by category" action="See all" href="/categories" />
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-1">
          {categories.map((c) => (
            <CategoryTile key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="pt-7">
        <div className="px-5">
          <SectionHead title="Featured for you" action="View all" href="/jobs" />
        </div>
        <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 pb-2">
          {featuredJobs().map((j) => (
            <FeaturedJobCard key={j.id} job={j} />
          ))}
        </div>
      </section>

      {/* Recent */}
      <section className="px-5 pt-7">
        <SectionHead title="Recent jobs" action="See all" href="/jobs" />
        <div className="stagger space-y-3">
          {jobs.slice(0, 4).map((j, idx) => (
            <div key={j.id} style={{ ["--i" as string]: idx }}>
              <JobCard job={j} />
            </div>
          ))}
        </div>
      </section>
    </AppScreen>
  );
}
