"use client";

import { useState } from "react";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Button, Field, Input, Textarea } from "@/components/ui";
import { user } from "@/lib/data";
import { FiUser, FiBriefcase, FiPlus, FiBookOpen, FiX } from "react-icons/fi";

type Exp = { role: string; company: string; period: string };

export default function CreateCv() {
  const [experiences, setExperiences] = useState<Exp[]>(
    user.experience.map((e) => ({ role: e.role, company: e.company, period: e.period })),
  );
  const [skills, setSkills] = useState<string[]>(user.skills);

  const [addingExp, setAddingExp] = useState(false);
  const [draftExp, setDraftExp] = useState<Exp>({ role: "", company: "", period: "" });
  const [skillDraft, setSkillDraft] = useState("");

  const saveExp = () => {
    if (!draftExp.role.trim()) return;
    setExperiences((xs) => [...xs, draftExp]);
    setDraftExp({ role: "", company: "", period: "" });
    setAddingExp(false);
  };

  const addSkill = () => {
    const s = skillDraft.trim();
    if (!s || skills.includes(s)) {
      setSkillDraft("");
      return;
    }
    setSkills((xs) => [...xs, s]);
    setSkillDraft("");
  };

  return (
    <AppScreen
      header={<TopBar title="Edit CV" />}
      contentClassName="px-5 py-5 space-y-7"
      nav={
        <div className="border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <Button href="/cv" variant="primary" full>
            Save CV
          </Button>
        </div>
      }
    >
      <Block title="Personal details" icon={FiUser}>
        <Field label="Full name">
          <Input defaultValue={user.name} />
        </Field>
        <Field label="Professional title">
          <Input defaultValue={user.title} />
        </Field>
      </Block>

      <Block title="Professional summary" icon={FiBookOpen}>
        <Textarea rows={4} defaultValue={user.about} />
      </Block>

      <Block title="Experience" icon={FiBriefcase}>
        {experiences.map((e, i) => (
          <div
            key={`${e.role}-${i}`}
            className="flex items-start gap-2 rounded-2xl border border-line-soft bg-paper-2/40 p-3.5"
          >
            <div className="min-w-0 flex-1">
              <p className="text-[14px] font-bold text-ink">{e.role}</p>
              <p className="text-[12.5px] text-muted">
                {[e.company, e.period].filter(Boolean).join(" · ")}
              </p>
            </div>
            <button
              aria-label={`Remove ${e.role}`}
              onClick={() => setExperiences((xs) => xs.filter((_, idx) => idx !== i))}
              className="shrink-0 rounded-full p-1 text-muted transition hover:text-accent active:scale-90"
            >
              <FiX />
            </button>
          </div>
        ))}

        {addingExp ? (
          <div className="space-y-2.5 rounded-2xl border border-dashed border-brand/50 bg-brand-50/40 p-3.5">
            <Input
              autoFocus
              placeholder="Role (e.g. Product Designer)"
              value={draftExp.role}
              onChange={(e) => setDraftExp((d) => ({ ...d, role: e.target.value }))}
            />
            <Input
              placeholder="Company"
              value={draftExp.company}
              onChange={(e) => setDraftExp((d) => ({ ...d, company: e.target.value }))}
            />
            <Input
              placeholder="Period (e.g. 2023 — Present)"
              value={draftExp.period}
              onChange={(e) => setDraftExp((d) => ({ ...d, period: e.target.value }))}
            />
            <div className="flex gap-2 pt-1">
              <Button onClick={saveExp} variant="primary" size="md" className="flex-1">
                Add
              </Button>
              <Button
                onClick={() => {
                  setAddingExp(false);
                  setDraftExp({ role: "", company: "", period: "" });
                }}
                variant="outline"
                size="md"
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setAddingExp(true)}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-line py-3 text-[13.5px] font-semibold text-brand-ink transition hover:bg-brand-50 active:scale-[0.99]"
          >
            <FiPlus /> Add experience
          </button>
        )}
      </Block>

      <Block title="Skills" icon={FiPlus}>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 rounded-lg bg-paper-2 px-2.5 py-1 text-xs font-medium text-ink-soft"
            >
              {s}
              <button
                aria-label={`Remove ${s}`}
                onClick={() => setSkills((xs) => xs.filter((x) => x !== s))}
                className="text-muted transition hover:text-accent"
              >
                <FiX className="text-[0.85rem]" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Add a skill"
            value={skillDraft}
            onChange={(e) => setSkillDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill();
              }
            }}
          />
          <Button onClick={addSkill} variant="outline" size="md" icon={FiPlus}>
            Add
          </Button>
        </div>
      </Block>
    </AppScreen>
  );
}

function Block({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: import("react-icons").IconType;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-ink">
        <Icon className="text-brand-ink" /> {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
