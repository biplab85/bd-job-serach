"use client";

import { useState } from "react";
import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { notifications, Notification } from "@/lib/data";
import { FiVideo, FiCheckCircle, FiMessageCircle, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";

const meta: Record<Notification["kind"], { icon: IconType; tint: string; color: string }> = {
  interview: { icon: FiVideo, tint: "bg-brand-50", color: "text-brand-ink" },
  status: { icon: FiCheckCircle, tint: "bg-accent-50", color: "text-accent" },
  message: { icon: FiMessageCircle, tint: "bg-brand-50", color: "text-brand-ink" },
  tip: { icon: FiZap, tint: "bg-gold-50", color: "text-gold" },
};

export default function NotificationsPage() {
  const [read, setRead] = useState<Record<string, boolean>>({});
  const isUnread = (n: Notification) => n.unread && !read[n.id];

  return (
    <AppScreen
      header={
        <TopBar
          title="Notifications"
          right={
            <button
              onClick={() => setRead(Object.fromEntries(notifications.map((n) => [n.id, true])))}
              className="text-[12.5px] font-semibold text-brand-ink"
            >
              Mark all read
            </button>
          }
        />
      }
      contentClassName="px-4 py-4"
    >
      <div className="stagger space-y-2">
        {notifications.map((n, idx) => {
          const m = meta[n.kind];
          const unread = isUnread(n);
          return (
            <Link
              key={n.id}
              href={`/notifications/${n.id}`}
              onClick={() => setRead((r) => ({ ...r, [n.id]: true }))}
              style={{ ["--i" as string]: idx }}
              className={`flex gap-3.5 rounded-2xl border p-3.5 transition ${
                unread
                  ? "border-brand-100 bg-surface shadow-[var(--shadow-soft)]"
                  : "border-transparent bg-transparent"
              }`}
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${m.tint} ${m.color}`}
              >
                <m.icon className="text-xl" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="flex-1 truncate text-[14px] font-bold text-ink">{n.title}</p>
                  {unread && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />}
                </div>
                <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-muted">
                  {n.body}
                </p>
                <p className="mt-1 text-[11.5px] text-muted/80">{n.time}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </AppScreen>
  );
}
