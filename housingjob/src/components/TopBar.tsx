"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { FiChevronLeft } from "react-icons/fi";

export function TopBar({
  title,
  subtitle,
  back = true,
  right,
  border = true,
}: {
  title?: ReactNode;
  subtitle?: string;
  back?: boolean;
  right?: ReactNode;
  border?: boolean;
}) {
  const router = useRouter();
  return (
    <header
      className={`relative z-20 flex h-[60px] shrink-0 items-center gap-2 bg-paper/85 px-4 backdrop-blur-xl ${
        border ? "border-b border-line-soft" : ""
      }`}
    >
      {back && (
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink transition active:scale-95"
        >
          <FiChevronLeft className="text-xl" />
        </button>
      )}
      <div className="min-w-0 flex-1">
        {title && (
          <h1 className="truncate text-[16px] font-bold leading-tight tracking-tight text-ink">
            {title}
          </h1>
        )}
        {subtitle && <p className="truncate text-xs text-muted">{subtitle}</p>}
      </div>
      {right && <div className="flex shrink-0 items-center gap-1.5">{right}</div>}
    </header>
  );
}
