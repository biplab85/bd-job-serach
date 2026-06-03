"use client";

import { useState } from "react";
import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { plans } from "@/lib/data";
import { FiCheck, FiZap, FiAward } from "react-icons/fi";

export default function PremiumPage() {
  const [yearly, setYearly] = useState(false);
  const [selected, setSelected] = useState("pro");
  const factor = yearly ? 10 : 1; // 2 months free yearly

  return (
    <AppScreen
      header={<TopBar title="HousingJob Pro" />}
      contentClassName="pb-8"
      nav={
        <div className="border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <Link
            href="/wallet"
            className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-brand px-6 text-[15px] font-semibold text-white shadow-[var(--shadow-float)] transition active:scale-[0.97]"
          >
            <FiZap /> Continue with {plans.find((p) => p.id === selected)?.name}
          </Link>
        </div>
      }
    >
      {/* Hero */}
      <div className="mx-5 mt-3 overflow-hidden rounded-3xl bg-brand-700 p-6 text-center text-white">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white">
          <FiAward className="text-2xl" />
        </span>
        <h1 className="font-display mt-4 text-[26px] font-semibold leading-tight tracking-tight">
          Get hired faster
        </h1>
        <p className="mx-auto mt-2 max-w-[280px] text-[14px] leading-relaxed text-white/75">
          Stand out to recruiters, unlock salary insights and let AI sharpen every application.
        </p>
      </div>

      {/* Billing toggle */}
      <div className="mt-6 flex justify-center">
        <div className="inline-flex rounded-full border border-line bg-surface p-1">
          {[
            { key: false, label: "Monthly" },
            { key: true, label: "Yearly" },
          ].map((o) => (
            <button
              key={String(o.key)}
              onClick={() => setYearly(o.key)}
              className={`rounded-full px-5 py-2 text-[13px] font-semibold transition ${
                yearly === o.key ? "bg-brand text-white" : "text-ink-soft"
              }`}
            >
              {o.label}
              {o.key && yearly === o.key && (
                <span className="ml-1 text-[11px] text-mint">−17%</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="space-y-4 px-5 pt-6">
        {plans.map((p) => {
          const active = selected === p.id;
          const price = p.price * factor;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`w-full rounded-3xl border-2 p-5 text-left transition ${
                active
                  ? "border-brand bg-brand-50/60 shadow-[var(--shadow-card)]"
                  : "border-line-soft bg-surface shadow-[var(--shadow-soft)]"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-[18px] font-bold tracking-tight text-ink">{p.name}</h2>
                  {p.highlighted && (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-white">
                      Popular
                    </span>
                  )}
                </div>
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                    active ? "border-brand bg-brand text-white" : "border-line"
                  }`}
                >
                  {active && <FiCheck className="text-[0.8rem]" />}
                </span>
              </div>
              <p className="mt-1 text-[12.5px] text-muted">{p.tagline}</p>
              <p className="mt-3">
                <span className="font-display text-[28px] font-semibold text-ink">
                  {price === 0 ? "Free" : `৳${price}`}
                </span>
                {price > 0 && (
                  <span className="text-[13px] text-muted"> /{yearly ? "yr" : "mo"}</span>
                )}
              </p>
              <ul className="mt-4 space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-ink">
                      <FiCheck className="text-[0.8rem]" />
                    </span>
                    <span className="text-[13.5px] text-ink-soft">{f}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>

      <p className="px-5 pt-6 text-center text-[11.5px] text-muted">
        Cancel anytime. Prices in BDT and include all taxes.
      </p>
    </AppScreen>
  );
}
