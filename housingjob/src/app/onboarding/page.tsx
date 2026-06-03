"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui";
import { FiSearch, FiZap, FiTrendingUp, FiArrowRight } from "react-icons/fi";
import type { IconType } from "react-icons";

const slides: {
  icon: IconType;
  eyebrow: string;
  title: string;
  body: string;
  ring: string;
}[] = [
  {
    icon: FiSearch,
    eyebrow: "Smart matching",
    title: "Roles made for you",
    body: "We surface jobs that fit your skills, salary expectations and the life you actually want to live.",
    ring: "#0f5a43",
  },
  {
    icon: FiZap,
    eyebrow: "One-tap apply",
    title: "Apply in seconds",
    body: "Build your profile once. Then apply to any role with a single tap — no repetitive forms, ever.",
    ring: "#ff6a3d",
  },
  {
    icon: FiTrendingUp,
    eyebrow: "Stay in the loop",
    title: "Track every step",
    body: "Follow each application from applied to offer, with real-time updates and interview reminders.",
    ring: "#e8a23d",
  },
];

export default function Onboarding() {
  const [i, setI] = useState(0);
  const router = useRouter();
  const slide = slides[i];
  const Icon = slide.icon;
  const last = i === slides.length - 1;

  const next = () => (last ? router.push("/register") : setI((v) => v + 1));

  return (
    <div className="flex h-full flex-col bg-paper px-6 pb-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === i ? "w-7 bg-brand" : "w-2 bg-line"
              }`}
            />
          ))}
        </div>
        <Link href="/login" className="text-[13px] font-semibold text-muted">
          Skip
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <div key={i} className="animate-pop relative mb-10">
          <span
            className="flex h-44 w-44 items-center justify-center rounded-[2.5rem] text-white shadow-[var(--shadow-card)]"
            style={{ background: slide.ring }}
          >
            <Icon className="text-[4.5rem]" />
          </span>
          <span className="absolute -right-3 -top-3 h-10 w-10 animate-float rounded-2xl bg-accent shadow-lg" />
          <span
            className="absolute -bottom-2 -left-4 h-7 w-7 animate-float rounded-xl bg-gold shadow-lg"
            style={{ animationDelay: "0.8s" }}
          />
        </div>

        <div key={`t-${i}`} className="animate-rise">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-brand-ink">
            {slide.eyebrow}
          </p>
          <h1 className="font-display mt-3 text-[34px] font-semibold leading-[1.1] tracking-tight text-ink">
            {slide.title}
          </h1>
          <p className="mx-auto mt-4 max-w-[300px] text-[15px] leading-relaxed text-muted">
            {slide.body}
          </p>
        </div>
      </div>

      <Button onClick={next} variant="primary" full iconRight={last ? FiArrowRight : undefined}>
        {last ? "Create your account" : "Continue"}
      </Button>
    </div>
  );
}
