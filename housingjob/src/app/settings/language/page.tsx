"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui";
import { FiCheck } from "react-icons/fi";

const LANGUAGES = [
  { code: "en", name: "English", native: "English" },
  { code: "bn", name: "Bangla", native: "বাংলা" },
  { code: "hi", name: "Hindi", native: "हिन्दी" },
  { code: "ar", name: "Arabic", native: "العربية" },
  { code: "es", name: "Spanish", native: "Español" },
  { code: "fr", name: "French", native: "Français" },
  { code: "pt", name: "Portuguese", native: "Português" },
  { code: "id", name: "Indonesian", native: "Bahasa Indonesia" },
];

export default function LanguagePage() {
  const router = useRouter();
  const [selected, setSelected] = useState("en");

  return (
    <AppScreen
      header={<TopBar title="Language" />}
      contentClassName="px-5 py-5"
      nav={
        <div className="border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <Button onClick={() => router.back()} variant="primary" full>
            Save
          </Button>
        </div>
      }
    >
      <p className="mb-4 text-[13.5px] text-muted">Choose your preferred language.</p>
      <div className="divide-y divide-line-soft overflow-hidden rounded-3xl border border-line-soft bg-surface shadow-[var(--shadow-soft)]">
        {LANGUAGES.map((l) => {
          const active = selected === l.code;
          return (
            <button
              key={l.code}
              onClick={() => setSelected(l.code)}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-paper-2"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 font-display text-[15px] font-semibold text-brand-ink">
                {l.native.slice(0, 1)}
              </span>
              <div className="flex-1">
                <p className="text-[14.5px] font-semibold text-ink">{l.name}</p>
                <p className="text-[12.5px] text-muted">{l.native}</p>
              </div>
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition ${
                  active ? "border-brand bg-brand text-white" : "border-line"
                }`}
              >
                {active && <FiCheck className="text-[0.8rem]" />}
              </span>
            </button>
          );
        })}
      </div>
    </AppScreen>
  );
}
