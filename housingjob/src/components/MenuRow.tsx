import Link from "next/link";
import { ReactNode } from "react";
import type { IconType } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

export function MenuRow({
  icon: Icon,
  label,
  href = "#",
  value,
  trailing,
  danger,
  tint = "bg-paper-2",
}: {
  icon: IconType;
  label: string;
  href?: string;
  value?: string;
  trailing?: ReactNode;
  danger?: boolean;
  tint?: string;
}) {
  const linkable = href && href !== "#";
  const cls =
    "flex w-full items-center gap-3.5 px-4 py-3 text-left transition-colors hover:bg-paper-2";
  const inner = (
    <>
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          danger ? "bg-accent-50 text-accent" : `${tint} text-brand-ink`
        }`}
      >
        <Icon className="text-[1.15rem]" />
      </span>
      <span
        className={`flex-1 text-[14.5px] font-semibold ${
          danger ? "text-accent" : "text-ink"
        }`}
      >
        {label}
      </span>
      {value && <span className="text-[13px] text-muted">{value}</span>}
      {trailing ?? (linkable ? <FiChevronRight className="text-muted" /> : null)}
    </>
  );

  if (linkable) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return <div className={cls}>{inner}</div>;
}

export function MenuGroup({ children }: { children: ReactNode }) {
  return (
    <div className="divide-y divide-line-soft overflow-hidden rounded-3xl border border-line-soft bg-surface shadow-[var(--shadow-soft)]">
      {children}
    </div>
  );
}
