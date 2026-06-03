"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Button, Field, Textarea } from "@/components/ui";
import { FiCalendar, FiVideo, FiMapPin } from "react-icons/fi";

const DAYS = [
  { d: "Mon", n: "23" },
  { d: "Tue", n: "24" },
  { d: "Wed", n: "25" },
  { d: "Thu", n: "26" },
  { d: "Fri", n: "27" },
];
const SLOTS = ["09:00", "10:30", "11:00", "13:00", "14:30", "16:00"];
const DURATIONS = ["15 min", "30 min", "45 min", "60 min"];

export default function BookInterview() {
  const router = useRouter();
  const [day, setDay] = useState(1);
  const [slot, setSlot] = useState(2);
  const [duration, setDuration] = useState(1);
  const [mode, setMode] = useState<"video" | "onsite">("video");

  return (
    <AppScreen
      header={<TopBar title="Schedule interview" />}
      contentClassName="px-5 py-5 space-y-7"
      nav={
        <div className="border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <Button
            onClick={() => router.push("/confirmation")}
            variant="primary"
            full
          >
            Confirm interview
          </Button>
        </div>
      }
    >
      {/* Mode */}
      <section>
        <h2 className="mb-3 text-[15px] font-bold text-ink">Interview type</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { key: "video", icon: FiVideo, label: "Video call" },
            { key: "onsite", icon: FiMapPin, label: "On-site" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              onClick={() => setMode(key as "video" | "onsite")}
              className={`flex flex-col items-start gap-2 rounded-2xl border-2 p-4 text-left transition ${
                mode === key
                  ? "border-brand bg-brand-50"
                  : "border-line bg-surface"
              }`}
            >
              <Icon className={`text-xl ${mode === key ? "text-brand-ink" : "text-muted"}`} />
              <span className="text-[14px] font-bold text-ink">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Date */}
      <section>
        <h2 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-ink">
          <FiCalendar className="text-brand-ink" /> Pick a day · June
        </h2>
        <div className="no-scrollbar flex gap-2.5 overflow-x-auto">
          {DAYS.map((day_, i) => (
            <button
              key={i}
              onClick={() => setDay(i)}
              className={`flex h-[68px] w-[54px] shrink-0 flex-col items-center justify-center gap-1 rounded-2xl border-2 transition ${
                day === i
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-surface text-ink"
              }`}
            >
              <span className="text-[11px] font-medium opacity-80">{day_.d}</span>
              <span className="font-display text-[18px] font-semibold">{day_.n}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Time */}
      <section>
        <h2 className="mb-3 text-[15px] font-bold text-ink">Available times</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {SLOTS.map((s, i) => (
            <button
              key={s}
              onClick={() => setSlot(i)}
              className={`rounded-xl border-2 py-3 text-[13.5px] font-semibold transition ${
                slot === i
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-surface text-ink-soft"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      {/* Duration */}
      <section>
        <h2 className="mb-3 text-[15px] font-bold text-ink">Duration</h2>
        <div className="flex flex-wrap gap-2.5">
          {DURATIONS.map((d, i) => (
            <button
              key={d}
              onClick={() => setDuration(i)}
              className={`rounded-full px-4 py-2.5 text-[13.5px] font-semibold transition ${
                duration === i
                  ? "bg-brand text-white"
                  : "border border-line bg-surface text-ink-soft"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </section>

      {/* Notes */}
      <Field label="Notes for the interviewer (optional)">
        <Textarea rows={3} placeholder="Anything you'd like them to know…" />
      </Field>
    </AppScreen>
  );
}
