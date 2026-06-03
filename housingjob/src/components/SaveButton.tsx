"use client";

import { useState } from "react";
import { FiBookmark } from "react-icons/fi";

export function SaveButton({
  initial = false,
  tone = "light",
}: {
  initial?: boolean;
  tone?: "light" | "dark";
}) {
  const [saved, setSaved] = useState(initial);
  const base =
    tone === "dark"
      ? saved
        ? "bg-white/20 text-white"
        : "bg-white/10 text-white/80"
      : saved
        ? "bg-brand text-white"
        : "bg-paper-2 text-ink-soft";
  return (
    <button
      aria-label={saved ? "Remove bookmark" : "Save job"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSaved((s) => !s);
      }}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all active:scale-90 ${base}`}
    >
      <FiBookmark className={`text-[1.1rem] ${saved ? "fill-current" : ""}`} />
    </button>
  );
}
