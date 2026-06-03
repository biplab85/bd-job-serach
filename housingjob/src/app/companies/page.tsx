"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { companies, companyOpenings } from "@/lib/data";
import { FiSearch, FiX, FiStar, FiMapPin, FiUsers } from "react-icons/fi";

export default function CompaniesPage() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const query = q.trim().toLowerCase();
    return companies.filter(
      (c) =>
        !query ||
        `${c.name} ${c.industry} ${c.location}`.toLowerCase().includes(query),
    );
  }, [q]);

  return (
    <AppScreen
      header={<TopBar title="Companies" subtitle={`${companies.length} employers hiring`} />}
      contentClassName="px-5 py-4 pb-8"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-4 shadow-[var(--shadow-soft)] focus-within:border-brand focus-within:ring-4 focus-within:ring-brand/10">
        <FiSearch className="text-xl text-muted" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search companies"
          className="h-[50px] flex-1 bg-transparent text-[15px] text-ink outline-none placeholder:text-muted/70"
        />
        {q && (
          <button onClick={() => setQ("")} aria-label="Clear" className="text-muted">
            <FiX className="text-lg" />
          </button>
        )}
      </div>

      <div className="stagger mt-4 space-y-3">
        {list.map((c, idx) => (
          <Link
            key={c.id}
            href={`/companies/${c.id}`}
            style={{ ["--i" as string]: idx }}
            className="block rounded-3xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
          >
            <div className="flex items-center gap-3.5">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl font-display text-xl font-semibold text-white"
                style={{ background: c.logoBg }}
              >
                {c.logo}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[15.5px] font-bold tracking-tight text-ink">
                  {c.name}
                </h3>
                <p className="truncate text-[12.5px] text-muted">{c.industry}</p>
                <div className="mt-1.5 flex items-center gap-3 text-[12px] text-muted">
                  <span className="inline-flex items-center gap-1 font-semibold text-ink">
                    <FiStar className="text-gold" /> {c.rating}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <FiMapPin className="text-brand-ink" /> {c.location}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3.5 flex items-center justify-between border-t border-line-soft pt-3">
              <span className="inline-flex items-center gap-1.5 text-[12.5px] text-muted">
                <FiUsers className="text-brand-ink" /> {c.size} employees
              </span>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-[12px] font-bold text-brand-ink">
                {companyOpenings(c.id)} open roles
              </span>
            </div>
          </Link>
        ))}
        {list.length === 0 && (
          <p className="py-16 text-center text-[14px] text-muted">No companies found.</p>
        )}
      </div>
    </AppScreen>
  );
}
