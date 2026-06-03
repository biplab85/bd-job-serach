"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { TopBar } from "@/components/TopBar";
import { AppScreen } from "@/components/AppScreen";
import { toast } from "@/components/Toast";
import { FiShield, FiArrowRight } from "react-icons/fi";

export default function Otp() {
  const [code, setCode] = useState(["", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const set = (idx: number, val: string) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[idx] = v;
    setCode(next);
    if (v && idx < 3) refs.current[idx + 1]?.focus();
  };

  const onKey = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[idx] && idx > 0) refs.current[idx - 1]?.focus();
  };

  return (
    <AppScreen header={<TopBar />} contentClassName="px-6 pb-8">
      <span className="mt-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-ink">
        <FiShield className="text-3xl" />
      </span>

      <h1 className="font-display mt-6 text-[30px] font-semibold leading-tight tracking-tight text-ink">
        Verify your number
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        We sent a 4-digit code to{" "}
        <span className="font-semibold text-ink">+880 1735 ••• 356</span>.
      </p>

      <div className="mt-8 flex justify-between gap-3">
        {code.map((c, idx) => (
          <input
            key={idx}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            value={c}
            inputMode="numeric"
            onChange={(e) => set(idx, e.target.value)}
            onKeyDown={(e) => onKey(idx, e)}
            className={`h-[68px] w-full rounded-2xl border-2 bg-surface text-center font-display text-3xl font-semibold text-ink outline-none transition-all ${
              c ? "border-brand" : "border-line"
            } focus:border-brand focus:ring-4 focus:ring-brand/10`}
          />
        ))}
      </div>

      <p className="mt-6 text-center text-[14px] text-muted">
        Didn&apos;t get the code?{" "}
        <button
          onClick={() => toast("A new code has been sent.")}
          className="font-semibold text-brand-ink"
        >
          Resend code
        </button>
      </p>

      <div className="mt-8">
        <Button onClick={() => router.push("/home")} variant="primary" full iconRight={FiArrowRight}>
          Verify & continue
        </Button>
      </div>
    </AppScreen>
  );
}
