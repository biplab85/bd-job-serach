import { CSSProperties } from "react";

type LogoProps = {
  /** size of the square mark in px */
  size?: number;
  /** show the wordmark next to the mark */
  showWord?: boolean;
  /** "dark" = for use on dark/emerald backgrounds (light text) */
  tone?: "light" | "dark";
  className?: string;
  style?: CSSProperties;
};

/**
 * HousingJob brand mark — a house roof fused with a briefcase,
 * set in an emerald tile with a coral latch accent.
 */
export function LogoMark({ size = 40 }: { size?: number }) {
  const r = size * 0.3;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id="hj-tile" x1="0" y1="0" x2="48" y2="48">
          <stop offset="0" stopColor="#137a59" />
          <stop offset="1" stopColor="#0c4a38" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx={r} fill="url(#hj-tile)" />
      {/* roof / briefcase handle */}
      <path
        d="M16 21V18.5C16 17.12 17.12 16 18.5 16h11c1.38 0 2.5 1.12 2.5 2.5V21"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* house roof apex */}
      <path
        d="M13 23.5 24 14l11 9.5"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* briefcase / house body */}
      <rect
        x="14"
        y="22"
        width="20"
        height="14"
        rx="3.5"
        stroke="#ffffff"
        strokeWidth="2.4"
      />
      {/* coral latch */}
      <rect x="21" y="26.5" width="6" height="5" rx="1.6" fill="#ff6a3d" />
    </svg>
  );
}

export default function Logo({
  size = 40,
  showWord = true,
  tone = "light",
  className = "",
  style,
}: LogoProps) {
  const wordColor = tone === "dark" ? "text-white" : "text-ink";
  const accentColor = tone === "dark" ? "text-mint" : "text-brand-ink";
  return (
    <span
      className={`inline-flex items-center gap-2.5 ${className}`}
      style={style}
    >
      <LogoMark size={size} />
      {showWord && (
        <span
          className={`font-display font-semibold tracking-tight leading-none ${wordColor}`}
          style={{ fontSize: size * 0.52 }}
        >
          Housing<span className={accentColor}>Job</span>
        </span>
      )}
    </span>
  );
}
