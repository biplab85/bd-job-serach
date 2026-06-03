"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiSearch, FiBriefcase, FiMessageCircle, FiUser } from "react-icons/fi";
import type { IconType } from "react-icons";

const items: { href: string; label: string; icon: IconType; match: string }[] = [
  { href: "/home", label: "Home", icon: FiHome, match: "/home" },
  { href: "/search", label: "Search", icon: FiSearch, match: "/search" },
  { href: "/applications", label: "Applied", icon: FiBriefcase, match: "/applications" },
  { href: "/messages", label: "Chat", icon: FiMessageCircle, match: "/messages" },
  { href: "/profile", label: "Profile", icon: FiUser, match: "/profile" },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="relative z-20 shrink-0 px-4 pb-[max(env(safe-area-inset-bottom),14px)] pt-2.5">
      <div className="flex items-center justify-between gap-1 rounded-full border border-line-soft bg-surface/90 p-1.5 shadow-[var(--shadow-card)] backdrop-blur-xl">
        {items.map((it) => {
          const active = pathname === it.match || pathname.startsWith(it.match + "/");
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-label={it.label}
              aria-current={active ? "page" : undefined}
              className={`group flex h-11 items-center justify-center gap-2 rounded-full transition-all duration-300 ease-[var(--ease-out-soft)] ${
                active
                  ? "bg-brand px-4 text-white shadow-[var(--shadow-float)]"
                  : "w-11 text-muted hover:text-ink-soft"
              }`}
            >
              <Icon className="shrink-0 text-[1.25rem]" />
              <span
                className={`overflow-hidden whitespace-nowrap text-[13px] font-semibold transition-all duration-300 ${
                  active ? "max-w-[80px] opacity-100" : "max-w-0 opacity-0"
                }`}
              >
                {it.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
