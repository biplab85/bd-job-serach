"use client";

import { useState } from "react";

export function Toggle({ initial = false }: { initial?: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <button
      role="switch"
      aria-checked={on}
      onClick={() => setOn((v) => !v)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
        on ? "bg-brand" : "bg-line"
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform duration-200 ${
          on ? "translate-x-[20px]" : "translate-x-0"
        }`}
      />
    </button>
  );
}
