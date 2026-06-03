import Link from "next/link";
import { Category } from "@/lib/data";

export function CategoryCard({ category }: { category: Category }) {
  const Icon = category.icon;
  return (
    <Link
      href={`/jobs?category=${category.slug}`}
      className="group flex items-center gap-3 rounded-2xl border border-line-soft bg-surface p-3 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${category.tint} text-brand-ink transition-transform group-hover:scale-105`}
      >
        <Icon className="text-[1.3rem]" />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[13.5px] font-bold tracking-tight text-ink">
          {category.name}
        </p>
        <p className="text-[11.5px] text-muted">{category.openings} jobs</p>
      </div>
    </Link>
  );
}

/* Round icon tile used in the home category strip */
export function CategoryTile({ category }: { category: Category }) {
  const Icon = category.icon;
  return (
    <Link
      href={`/jobs?category=${category.slug}`}
      className="flex w-[72px] shrink-0 flex-col items-center gap-2"
    >
      <span
        className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.tint} text-brand-ink shadow-[var(--shadow-soft)] transition-transform active:scale-95`}
      >
        <Icon className="text-2xl" />
      </span>
      <span className="text-center text-[11.5px] font-semibold leading-tight text-ink-soft">
        {category.name}
      </span>
    </Link>
  );
}
