"use client";

import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui";
import { toast } from "@/components/Toast";
import { billingHistory } from "@/lib/data";
import { FiCreditCard, FiCheckCircle, FiDownload, FiZap } from "react-icons/fi";

export default function WalletPage() {
  return (
    <AppScreen header={<TopBar title="Billing" />} contentClassName="px-5 py-5 space-y-6">
      {/* Current plan */}
      <div className="overflow-hidden rounded-3xl bg-night p-5 text-white">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-mint">
            <FiZap /> <span className="text-[12.5px] font-semibold">Current plan</span>
          </span>
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-white">
            ACTIVE
          </span>
        </div>
        <p className="font-display mt-2 text-[26px] font-semibold">Pro</p>
        <p className="text-[13px] text-white/60">Renews Jul 1, 2026 · ৳499/mo</p>
        <div className="mt-4 flex gap-2.5">
          <Button href="/premium" variant="accent" size="md" className="flex-1">
            Change plan
          </Button>
          <button
            onClick={() => toast("Your Pro plan stays active until Jul 1, 2026.")}
            className="flex-1 rounded-full border border-white/20 px-5 text-[14px] font-semibold text-white/80 transition active:scale-[0.97]"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Payment method */}
      <section>
        <h2 className="mb-3 text-[15px] font-bold text-ink">Payment method</h2>
        <div className="flex items-center gap-3.5 rounded-2xl border border-line-soft bg-surface p-4 shadow-[var(--shadow-soft)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-ink">
            <FiCreditCard className="text-xl" />
          </span>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-ink">•••• •••• •••• 4242</p>
            <p className="text-[12px] text-muted">Expires 09/27</p>
          </div>
          <button
            onClick={() => toast("Payment method editing is coming soon.")}
            className="text-[13px] font-semibold text-brand-ink transition active:scale-95"
          >
            Edit
          </button>
        </div>
      </section>

      {/* History */}
      <section>
        <h2 className="mb-3 text-[15px] font-bold text-ink">Billing history</h2>
        <div className="divide-y divide-line-soft overflow-hidden rounded-3xl border border-line-soft bg-surface shadow-[var(--shadow-soft)]">
          {billingHistory.map((b) => (
            <div key={b.id} className="flex items-center gap-3.5 px-4 py-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-ink">
                <FiCheckCircle />
              </span>
              <div className="flex-1">
                <p className="text-[13.5px] font-bold text-ink">{b.plan}</p>
                <p className="text-[12px] text-muted">{b.date}</p>
              </div>
              <span className="text-[14px] font-bold text-ink">৳{b.amount}</span>
              <button
                aria-label={`Download invoice for ${b.plan}, ${b.date}`}
                onClick={() => toast("Invoice downloaded.")}
                className="text-muted transition active:scale-90"
              >
                <FiDownload />
              </button>
            </div>
          ))}
        </div>
      </section>
    </AppScreen>
  );
}
