import Link from "next/link";
import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import type { IconType } from "react-icons";

/* ---------------- Button ---------------- */
type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "accent" | "ghost" | "outline" | "dark";
  size?: "md" | "lg";
  full?: boolean;
  icon?: IconType;
  iconRight?: IconType;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  href,
  variant = "primary",
  size = "lg",
  full,
  icon: Icon,
  iconRight: IconRight,
  className = "",
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 active:scale-[0.97] select-none";
  const sizes = {
    md: "h-11 px-5 text-sm",
    lg: "h-[54px] px-6 text-[15px]",
  };
  const variants = {
    primary: "bg-brand text-white shadow-[var(--shadow-float)] hover:bg-brand-600",
    accent: "bg-accent text-white shadow-[0_8px_24px_-8px_rgba(255,106,61,0.5)] hover:bg-accent-600",
    dark: "bg-night text-white hover:bg-ink-soft",
    outline: "border border-line bg-surface text-ink hover:border-ink/30",
    ghost: "text-ink hover:bg-paper-2",
  };
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${full ? "w-full" : ""} ${className}`;
  const inner = (
    <>
      {Icon && <Icon className="text-[1.15em]" />}
      {children}
      {IconRight && <IconRight className="text-[1.15em]" />}
    </>
  );
  if (href) {
    const external = /^(https?:|mailto:|tel:)/.test(href);
    if (external) {
      const newTab = href.startsWith("http");
      return (
        <a
          href={href}
          className={cls}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}

/* ---------------- IconButton ---------------- */
export function IconButton({
  icon: Icon,
  href,
  label,
  badge,
  variant = "default",
  onClick,
}: {
  icon: IconType;
  href?: string;
  label: string;
  badge?: number;
  variant?: "default" | "ghost" | "solid";
  onClick?: () => void;
}) {
  const styles = {
    default: "bg-surface border border-line text-ink hover:border-ink/30",
    ghost: "text-ink hover:bg-paper-2",
    solid: "bg-brand text-white",
  };
  const cls = `relative inline-flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-95 ${styles[variant]}`;
  const inner = (
    <>
      <Icon className="text-[1.25rem]" />
      {badge ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white ring-2 ring-paper">
          {badge}
        </span>
      ) : null}
    </>
  );
  if (href)
    return (
      <Link href={href} aria-label={label} className={cls}>
        {inner}
      </Link>
    );
  return (
    <button aria-label={label} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ---------------- Field / Input ---------------- */
export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold text-ink-soft">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

const inputBase =
  "w-full rounded-2xl border border-line bg-surface px-4 text-[15px] text-ink placeholder:text-muted/70 outline-none transition-all focus:border-brand focus:ring-4 focus:ring-brand/10";

export function Input({
  icon: Icon,
  className = "",
  ...rest
}: { icon?: IconType } & InputHTMLAttributes<HTMLInputElement>) {
  if (Icon) {
    return (
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.1rem] text-muted" />
        <input className={`${inputBase} h-[52px] pl-11 ${className}`} {...rest} />
      </div>
    );
  }
  return <input className={`${inputBase} h-[52px] ${className}`} {...rest} />;
}

export function Textarea({
  className = "",
  ...rest
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${inputBase} resize-none py-3.5 ${className}`} {...rest} />;
}

/* ---------------- Badge / Pill / Chip ---------------- */
export function Pill({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg bg-paper-2 px-2.5 py-1 text-xs font-medium text-ink-soft">
      {children}
    </span>
  );
}

/* ---------------- Avatar ---------------- */
export function Avatar({
  initials,
  bg = "#0f5a43",
  size = 44,
  ring,
}: {
  initials: string;
  bg?: string;
  size?: number;
  ring?: boolean;
}) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${
        ring ? "ring-2 ring-white" : ""
      }`}
      style={{ background: bg, width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </span>
  );
}

/* ---------------- Section heading ---------------- */
export function SectionHead({
  title,
  action,
  href,
}: {
  title: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className="mb-3.5 flex items-end justify-between">
      <h2 className="text-[17px] font-bold tracking-tight text-ink">{title}</h2>
      {action &&
        (href ? (
          <Link href={href} className="text-[13px] font-semibold text-brand-ink">
            {action}
          </Link>
        ) : (
          <span className="text-[13px] font-semibold text-brand-ink">{action}</span>
        ))}
    </div>
  );
}
