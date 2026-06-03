"use client";

import { useState } from "react";
import { FiShare2, FiCheck } from "react-icons/fi";

/**
 * Working share button: opens the native share sheet (Web Share API)
 * on supported devices, and falls back to copying the link.
 */
export function ShareButton({
  title,
  text,
  variant = "ghost",
}: {
  title?: string;
  text?: string;
  variant?: "ghost" | "default";
}) {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const url = window.location.href;
    const data = {
      title: title || "HousingJob",
      text: text || title || "Check this out on HousingJob",
      url,
    };
    // Native share sheet (mobile / supported browsers)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch (e) {
        if ((e as Error)?.name === "AbortError") return; // user dismissed
        // otherwise fall through to copy
      }
    }
    // Fallback: copy the link
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // last-ditch fallback
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const styles =
    variant === "ghost"
      ? "text-ink hover:bg-paper-2"
      : "bg-surface border border-line text-ink hover:border-ink/30";

  return (
    <button
      onClick={onShare}
      aria-label="Share"
      className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full transition-all active:scale-95 ${styles}`}
    >
      {copied ? (
        <FiCheck className="text-[1.25rem] text-brand-ink" />
      ) : (
        <FiShare2 className="text-[1.25rem]" />
      )}
      {copied && (
        <span className="pointer-events-none absolute -bottom-7 right-0 z-30 whitespace-nowrap rounded-md bg-ink px-2 py-1 text-[10px] font-semibold text-white shadow">
          Link copied
        </span>
      )}
    </button>
  );
}
