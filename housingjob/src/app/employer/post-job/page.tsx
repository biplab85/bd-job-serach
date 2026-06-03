"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Button, Field, Input, Textarea } from "@/components/ui";
import { categories } from "@/lib/data";
import { FiBriefcase, FiMapPin, FiDollarSign } from "react-icons/fi";

const TYPES = ["Full-time", "Part-time", "Contract", "Remote"];
const LEVELS = ["Junior", "Mid", "Senior", "Lead"];

function Chips({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition active:scale-95 ${
            value === o ? "bg-brand text-white" : "border border-line bg-surface text-ink-soft"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

export default function PostJob() {
  const router = useRouter();
  const [type, setType] = useState("Full-time");
  const [level, setLevel] = useState("Mid");
  const [cat, setCat] = useState(categories[0].name);

  return (
    <AppScreen
      header={<TopBar title="Post a job" />}
      contentClassName="px-5 py-5 space-y-6"
      nav={
        <div className="border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <Button onClick={() => router.push("/employer")} variant="primary" full>
            Publish job
          </Button>
        </div>
      }
    >
      <Field label="Job title">
        <Input icon={FiBriefcase} placeholder="e.g. Senior Product Designer" />
      </Field>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-ink-soft">Category</p>
        <Chips options={categories.map((c) => c.name)} value={cat} onChange={setCat} />
      </div>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-ink-soft">Employment type</p>
        <Chips options={TYPES} value={type} onChange={setType} />
      </div>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-ink-soft">Experience level</p>
        <Chips options={LEVELS} value={level} onChange={setLevel} />
      </div>

      <Field label="Location">
        <Input icon={FiMapPin} placeholder="Dhaka, BD or Remote" />
      </Field>

      <div>
        <p className="mb-2 text-[13px] font-semibold text-ink-soft">Monthly salary (৳)</p>
        <div className="flex items-center gap-3">
          <Input icon={FiDollarSign} type="number" placeholder="Min" />
          <span className="text-muted">–</span>
          <Input icon={FiDollarSign} type="number" placeholder="Max" />
        </div>
      </div>

      <Field label="Job description">
        <Textarea rows={4} placeholder="Describe the role, team and what success looks like…" />
      </Field>

      <Field label="Requirements" hint="One per line.">
        <Textarea rows={4} placeholder={"3+ years experience\nStrong portfolio\nGreat communication"} />
      </Field>
    </AppScreen>
  );
}
