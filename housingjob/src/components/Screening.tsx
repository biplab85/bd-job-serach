"use client";

import { useState } from "react";

export function Screening({
  q,
  options,
  preselect,
}: {
  q: string;
  options: string[];
  preselect: number;
}) {
  const [sel, setSel] = useState(preselect);
  return (
    <div>
      <p className="mb-2 text-[13.5px] font-semibold text-ink-soft">{q}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o, i) => (
          <button
            key={o}
            type="button"
            onClick={() => setSel(i)}
            className={`rounded-full px-3.5 py-2 text-[13px] font-semibold transition active:scale-95 ${
              i === sel
                ? "bg-brand text-white"
                : "border border-line bg-surface text-ink-soft"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
