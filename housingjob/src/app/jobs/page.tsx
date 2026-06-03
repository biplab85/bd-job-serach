import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { IconButton } from "@/components/ui";
import { JobCard } from "@/components/JobCard";
import { categories, getCategory, jobs, jobsByCategory } from "@/lib/data";
import { FiSearch } from "react-icons/fi";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const active = category ? getCategory(category) : null;
  const list = category ? jobsByCategory(category) : jobs;

  return (
    <AppScreen
      contentClassName="pb-8"
      header={
        <TopBar
          title={active ? active.name : "All jobs"}
          subtitle={`${list.length} opportunities`}
          right={<IconButton icon={FiSearch} href="/search" label="Search" variant="ghost" />}
        />
      }
    >
      {/* category filter chips */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-4">
        <Link
          href="/jobs"
          className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
            !category ? "bg-brand text-white" : "border border-line bg-surface text-ink-soft"
          }`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/jobs?category=${c.slug}`}
            className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
              category === c.slug
                ? "bg-brand text-white"
                : "border border-line bg-surface text-ink-soft"
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      <div className="stagger space-y-3 px-5">
        {list.map((j, idx) => (
          <div key={j.id} style={{ ["--i" as string]: idx }}>
            <JobCard job={j} />
          </div>
        ))}
        {list.length === 0 && (
          <p className="py-16 text-center text-[14px] text-muted">
            No roles in this category yet. Check back soon.
          </p>
        )}
      </div>
    </AppScreen>
  );
}
