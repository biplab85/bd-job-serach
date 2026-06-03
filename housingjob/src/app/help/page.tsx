"use client";

import { useState } from "react";
import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Input } from "@/components/ui";
import { FiSearch, FiChevronDown, FiMessageCircle, FiMail, FiPhone } from "react-icons/fi";

const FAQS = [
  {
    q: "How do I apply for a job?",
    a: "Open any job, tap “Apply now”, review your profile and CV, add a short cover letter, then submit. You can track it from the Applications tab.",
  },
  {
    q: "Can I edit my application after submitting?",
    a: "You can update your CV and profile anytime. New applications will use the latest version, but already-submitted ones stay as sent.",
  },
  {
    q: "How does job matching work?",
    a: "We match roles to your skills, salary expectations and preferences, then rank them so the best fits appear first on your home feed.",
  },
  {
    q: "Is HousingJob free to use?",
    a: "Yes — searching, applying and tracking are completely free for job seekers.",
  },
  {
    q: "How do I delete my account?",
    a: "Go to Settings → Account. Reach out to support and we'll remove your data within 30 days.",
  },
];

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <AppScreen header={<TopBar title="Help & support" />} contentClassName="px-5 py-5 space-y-6">
      <Input icon={FiSearch} placeholder="Search for help" />

      {/* Contact */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: FiMessageCircle, l: "Live chat", href: "/messages", external: false },
          { icon: FiMail, l: "Email us", href: "mailto:support@housingjob.app", external: true },
          { icon: FiPhone, l: "Call", href: "tel:+8809600000000", external: true },
        ].map((c) => {
          const cls =
            "flex flex-col items-center gap-2 rounded-2xl border border-line-soft bg-surface py-4 shadow-[var(--shadow-soft)] transition active:scale-95";
          const inner = (
            <>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-ink">
                <c.icon className="text-xl" />
              </span>
              <span className="text-[12px] font-semibold text-ink">{c.l}</span>
            </>
          );
          return c.external ? (
            <a key={c.l} href={c.href} className={cls}>
              {inner}
            </a>
          ) : (
            <Link key={c.l} href={c.href} className={cls}>
              {inner}
            </Link>
          );
        })}
      </div>

      {/* FAQ */}
      <section>
        <h2 className="mb-3 text-[15px] font-bold text-ink">Frequently asked</h2>
        <div className="space-y-2.5">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className="overflow-hidden rounded-2xl border border-line-soft bg-surface shadow-[var(--shadow-soft)]"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                >
                  <span className="flex-1 text-[14px] font-semibold text-ink">{f.q}</span>
                  <FiChevronDown
                    className={`shrink-0 text-muted transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-4 text-[13.5px] leading-relaxed text-muted">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </AppScreen>
  );
}
