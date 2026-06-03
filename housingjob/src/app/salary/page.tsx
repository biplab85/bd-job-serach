"use client";

import { useState } from "react";
import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { salaryRoles, demandColor } from "@/lib/data";
import { FiTrendingUp, FiArrowRight, FiMapPin } from "react-icons/fi";

export default function SalaryPage() {
  const [i, setI] = useState(0);
  const role = salaryRoles[i];

  const globalMax = Math.max(...role.levels.map((l) => l.max));
  const overallMin = Math.min(...role.levels.map((l) => l.min));
  const overallMax = Math.max(...role.levels.map((l) => l.max));
  const locMax = Math.max(...role.topLocations.map((l) => l.avg));

  return (
    <AppScreen
      header={<TopBar title="Salary insights" />}
      contentClassName="pb-8"
    >
      {/* Role selector */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-4">
        {salaryRoles.map((r, idx) => (
          <button
            key={r.role}
            onClick={() => setI(idx)}
            className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
              i === idx ? "bg-brand text-white" : "border border-line bg-surface text-ink-soft"
            }`}
          >
            {r.role}
          </button>
        ))}
      </div>

      {/* Headline card */}
      <div className="mx-5 overflow-hidden rounded-3xl bg-night p-5 text-white">
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-white/60">{role.role} · monthly</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/12 px-2.5 py-1 text-[12px] font-bold text-mint">
            <FiTrendingUp /> {role.trend}
          </span>
        </div>
        <p className="font-display mt-2 text-[30px] font-semibold leading-none">
          ৳{overallMin}k–{overallMax}k
        </p>
        <div className="mt-3 flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-[11.5px] font-bold ${demandColor[role.demand]}`}>
            {role.demand} demand
          </span>
          <span className="text-[12px] text-white/55">across {role.topLocations.length} regions</span>
        </div>
      </div>

      {/* By level */}
      <section className="px-5 pt-7">
        <h2 className="mb-4 text-[16px] font-bold text-ink">By experience level</h2>
        <div className="space-y-4">
          {role.levels.map((l) => {
            const left = (l.min / globalMax) * 100;
            const width = ((l.max - l.min) / globalMax) * 100;
            return (
              <div key={l.label}>
                <div className="mb-1.5 flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-ink">{l.label}</span>
                  <span className="font-bold text-brand-ink">
                    ৳{l.min}k–{l.max}k
                  </span>
                </div>
                <div className="h-3 w-full overflow-hidden rounded-full bg-paper-2">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ marginLeft: `${left}%`, width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* By location */}
      <section className="px-5 pt-7">
        <h2 className="mb-4 text-[16px] font-bold text-ink">Top paying locations</h2>
        <div className="space-y-4">
          {role.topLocations.map((loc) => (
            <div key={loc.city}>
              <div className="mb-1.5 flex items-center justify-between text-[13px]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-ink">
                  <FiMapPin className="text-brand-ink" /> {loc.city}
                </span>
                <span className="font-bold text-ink">৳{loc.avg}k</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-paper-2">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${(loc.avg / locMax) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="px-5 pt-8">
        <Link
          href={`/jobs?category=${role.category}`}
          className="flex items-center justify-between rounded-3xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-card)]"
        >
          <div>
            <p className="text-[14.5px] font-bold text-ink">See {role.role} jobs</p>
            <p className="text-[12.5px] text-muted">Find roles that match this pay band</p>
          </div>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
            <FiArrowRight />
          </span>
        </Link>
      </div>

      <p className="px-5 pt-5 text-center text-[11.5px] text-muted">
        Estimates based on aggregated, anonymised listings. Updated monthly.
      </p>
    </AppScreen>
  );
}
