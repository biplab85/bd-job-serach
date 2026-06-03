"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/BottomNav";
import { JobCard } from "@/components/JobCard";
import { jobs, categories } from "@/lib/data";
import {
  FiSearch,
  FiX,
  FiChevronLeft,
  FiSliders,
  FiCheck,
} from "react-icons/fi";

const TYPES = ["Full-time", "Part-time", "Contract", "Remote"];
const LEVELS = ["Junior", "Mid", "Senior", "Lead"];
const LOCATIONS = ["Dhaka", "Chattogram", "Remote"];
const SALARY_PRESETS = [
  { k: 0, label: "Any" },
  { k: 50, label: "৳50k+" },
  { k: 80, label: "৳80k+" },
  { k: 100, label: "৳100k+" },
  { k: 120, label: "৳120k+" },
];
const SORTS = [
  { key: "relevance", label: "Relevance" },
  { key: "newest", label: "Newest" },
  { key: "salary", label: "Salary: high to low" },
];
const POPULAR = ["Designer", "React", "Remote", "Marketing", "Data"];

type Filters = {
  types: string[];
  cats: string[];
  levels: string[];
  locs: string[];
  minK: number;
  sort: string;
};
const EMPTY: Filters = { types: [], cats: [], levels: [], locs: [], minK: 0, sort: "relevance" };

const lowerK = (salary: string) => {
  const m = salary.match(/(\d+)k/);
  return m ? parseInt(m[1], 10) : 0;
};
const postedMins = (posted: string) => {
  const m = posted.match(/(\d+)\s*([hd])/);
  if (!m) return 99999;
  return parseInt(m[1], 10) * (m[2] === "h" ? 60 : 1440);
};
const toggle = (arr: string[], v: string) =>
  arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

export default function SearchPage() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Filters>(EMPTY);

  const activeCount =
    filters.types.length +
    filters.cats.length +
    filters.levels.length +
    filters.locs.length +
    (filters.minK > 0 ? 1 : 0) +
    (filters.sort !== "relevance" ? 1 : 0);

  const runFilter = (f: Filters, query: string) => {
    const ql = query.trim().toLowerCase();
    const list = jobs.filter((j) => {
      if (ql && !`${j.title} ${j.company} ${j.tags.join(" ")} ${j.category}`.toLowerCase().includes(ql))
        return false;
      if (f.types.length && !f.types.includes(j.type)) return false;
      if (f.cats.length && !f.cats.includes(j.category)) return false;
      if (f.levels.length && !f.levels.some((l) => j.level.toLowerCase().includes(l.toLowerCase()))) return false;
      if (f.locs.length && !f.locs.some((l) => j.location.toLowerCase().includes(l.toLowerCase()))) return false;
      if (f.minK > 0 && lowerK(j.salary) < f.minK) return false;
      return true;
    });
    if (f.sort === "salary") list.sort((a, b) => lowerK(b.salary) - lowerK(a.salary));
    if (f.sort === "newest") list.sort((a, b) => postedMins(a.posted) - postedMins(b.posted));
    return list;
  };

  const results = useMemo(() => runFilter(filters, q), [q, filters]);
  const draftCount = useMemo(() => runFilter(draft, q).length, [q, draft]);

  const openSheet = () => {
    setDraft(filters);
    setOpen(true);
  };
  const apply = () => {
    setFilters(draft);
    setOpen(false);
  };

  // active filter chips (label + clear fn)
  const chips: { label: string; clear: () => void }[] = [
    ...filters.types.map((t) => ({ label: t, clear: () => setFilters((f) => ({ ...f, types: toggle(f.types, t) })) })),
    ...filters.cats.map((c) => ({
      label: categories.find((x) => x.slug === c)?.name ?? c,
      clear: () => setFilters((f) => ({ ...f, cats: toggle(f.cats, c) })),
    })),
    ...filters.levels.map((l) => ({ label: l, clear: () => setFilters((f) => ({ ...f, levels: toggle(f.levels, l) })) })),
    ...filters.locs.map((l) => ({ label: l, clear: () => setFilters((f) => ({ ...f, locs: toggle(f.locs, l) })) })),
    ...(filters.minK > 0 ? [{ label: `৳${filters.minK}k+`, clear: () => setFilters((f) => ({ ...f, minK: 0 })) }] : []),
  ];

  return (
    <div className="relative flex h-full flex-col">
      {/* Header */}
      <div className="px-5 pb-3 pt-5">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition active:scale-95"
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <h1 className="font-display text-[24px] font-semibold tracking-tight text-ink">Search</h1>
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          <div className="flex flex-1 items-center gap-3 rounded-2xl border border-line bg-surface px-4 shadow-[var(--shadow-soft)] focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
            <FiSearch className="text-xl text-muted" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Job title, company or skill"
              className="h-[50px] flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted/70"
            />
            {q && (
              <button onClick={() => setQ("")} aria-label="Clear" className="text-muted">
                <FiX className="text-lg" />
              </button>
            )}
          </div>
          <button
            onClick={openSheet}
            aria-label="Filters"
            className={`relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl transition active:scale-95 ${
              activeCount ? "bg-brand text-white" : "border border-line bg-surface text-ink"
            }`}
          >
            <FiSliders className="text-xl" />
            {activeCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-bold text-white ring-2 ring-paper">
                {activeCount}
              </span>
            )}
          </button>
        </div>

        {/* Active filter chips */}
        {chips.length > 0 && (
          <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
            {chips.map((c, i) => (
              <button
                key={i}
                onClick={c.clear}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1.5 text-[12.5px] font-semibold text-brand-ink"
              >
                {c.label} <FiX className="text-[0.95rem]" />
              </button>
            ))}
            <button
              onClick={() => setFilters(EMPTY)}
              className="shrink-0 rounded-full px-2 py-1.5 text-[12.5px] font-semibold text-muted underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      <main className="no-scrollbar flex-1 overflow-y-auto pb-6">
        {!q && chips.length === 0 && (
          <div className="px-5 pt-1">
            <p className="text-[13px] font-bold text-ink-soft">Popular right now</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {POPULAR.map((p) => (
                <button
                  key={p}
                  onClick={() => setQ(p)}
                  className="rounded-full bg-paper-2 px-3.5 py-2 text-[13px] font-medium text-ink-soft transition hover:bg-line-soft"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="px-5 pt-4">
          <p className="mb-3 text-[13px] text-muted">
            {results.length} result{results.length === 1 ? "" : "s"}
            {q && <> for “{q}”</>}
            {filters.sort !== "relevance" && <> · {SORTS.find((s) => s.key === filters.sort)?.label}</>}
          </p>
          <div className="space-y-3">
            {results.map((j) => (
              <JobCard key={j.id} job={j} />
            ))}
            {results.length === 0 && (
              <div className="py-16 text-center">
                <p className="text-[15px] font-semibold text-ink">No matches found</p>
                <p className="mt-1 text-[13.5px] text-muted">Try fewer filters or another keyword.</p>
                {activeCount > 0 && (
                  <button
                    onClick={() => setFilters(EMPTY)}
                    className="mt-4 rounded-full bg-brand px-5 py-2.5 text-[13.5px] font-semibold text-white"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />

      {/* Advanced filter sheet */}
      {open && (
        <div className="absolute inset-0 z-40">
          <button
            aria-label="Close filters"
            onClick={() => setOpen(false)}
            className="animate-fade absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />
          <div className="animate-sheet absolute inset-x-0 bottom-0 flex max-h-[88%] flex-col rounded-t-[1.75rem] bg-paper shadow-[0_-12px_40px_-12px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between px-5 pb-2 pt-4">
              <span className="mx-auto h-1.5 w-10 rounded-full bg-line" />
            </div>
            <div className="flex items-center justify-between px-5 pb-2">
              <h2 className="text-[18px] font-bold tracking-tight text-ink">Filters</h2>
              <button
                onClick={() => setDraft(EMPTY)}
                className="text-[13px] font-semibold text-brand-ink"
              >
                Reset
              </button>
            </div>

            <div className="no-scrollbar flex-1 space-y-6 overflow-y-auto px-5 pb-4 pt-2">
              <Group title="Job type">
                <ChipRow
                  options={TYPES}
                  selected={draft.types}
                  onToggle={(v) => setDraft((d) => ({ ...d, types: toggle(d.types, v) }))}
                />
              </Group>

              <Group title="Category">
                <ChipRow
                  options={categories.map((c) => ({ label: c.name, value: c.slug }))}
                  selected={draft.cats}
                  onToggle={(v) => setDraft((d) => ({ ...d, cats: toggle(d.cats, v) }))}
                />
              </Group>

              <Group title="Experience level">
                <ChipRow
                  options={LEVELS}
                  selected={draft.levels}
                  onToggle={(v) => setDraft((d) => ({ ...d, levels: toggle(d.levels, v) }))}
                />
              </Group>

              <Group title="Location">
                <ChipRow
                  options={LOCATIONS}
                  selected={draft.locs}
                  onToggle={(v) => setDraft((d) => ({ ...d, locs: toggle(d.locs, v) }))}
                />
              </Group>

              <Group title="Minimum salary">
                <div className="flex flex-wrap gap-2">
                  {SALARY_PRESETS.map((s) => (
                    <button
                      key={s.k}
                      onClick={() => setDraft((d) => ({ ...d, minK: s.k }))}
                      className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                        draft.minK === s.k ? "bg-brand text-white" : "border border-line bg-surface text-ink-soft"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </Group>

              <Group title="Sort by">
                <div className="space-y-1">
                  {SORTS.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setDraft((d) => ({ ...d, sort: s.key }))}
                      className="flex w-full items-center justify-between rounded-xl px-1 py-2.5 text-left text-[14px] text-ink"
                    >
                      {s.label}
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                          draft.sort === s.key ? "border-brand bg-brand text-white" : "border-line"
                        }`}
                      >
                        {draft.sort === s.key && <FiCheck className="text-[0.8rem]" />}
                      </span>
                    </button>
                  ))}
                </div>
              </Group>
            </div>

            <div className="border-t border-line-soft bg-paper px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5">
              <button
                onClick={apply}
                className="h-[54px] w-full rounded-full bg-brand text-[15px] font-semibold text-white shadow-[var(--shadow-float)] transition active:scale-[0.98]"
              >
                Show {draftCount} result{draftCount === 1 ? "" : "s"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-[14px] font-bold text-ink">{title}</h3>
      {children}
    </div>
  );
}

function ChipRow({
  options,
  selected,
  onToggle,
}: {
  options: (string | { label: string; value: string })[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const value = typeof o === "string" ? o : o.value;
        const label = typeof o === "string" ? o : o.label;
        const on = selected.includes(value);
        return (
          <button
            key={value}
            onClick={() => onToggle(value)}
            className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition active:scale-95 ${
              on ? "bg-brand text-white" : "border border-line bg-surface text-ink-soft"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
