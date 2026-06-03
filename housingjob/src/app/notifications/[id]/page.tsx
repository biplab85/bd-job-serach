import { notFound } from "next/navigation";
import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui";
import { getNotification, notifications } from "@/lib/data";
import { FiVideo, FiCheckCircle, FiMessageCircle, FiZap } from "react-icons/fi";
import type { IconType } from "react-icons";

const meta: Record<string, { icon: IconType; cta: string; href: string }> = {
  interview: { icon: FiVideo, cta: "View interview", href: "/book-interview" },
  status: { icon: FiCheckCircle, cta: "View application", href: "/applications" },
  message: { icon: FiMessageCircle, cta: "Open chat", href: "/messages/c3" },
  tip: { icon: FiZap, cta: "Complete profile", href: "/profile/edit" },
};

export function generateStaticParams() {
  return notifications.map((n) => ({ id: n.id }));
}

export default async function NotificationDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const n = getNotification(id);
  if (!n) notFound();
  const m = meta[n.kind];
  const Icon = m.icon;

  return (
    <AppScreen
      header={<TopBar title="Notification" />}
      contentClassName="px-5 py-8"
      nav={
        <div className="border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <Button href={m.href} variant="primary" full>
            {m.cta}
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-brand-50 text-brand-ink">
          <Icon className="text-4xl" />
        </span>
        <h1 className="font-display mt-6 text-[26px] font-semibold leading-tight tracking-tight text-ink">
          {n.title}
        </h1>
        <p className="mt-1 text-[12.5px] text-muted">{n.time}</p>
      </div>

      <div className="mt-7 rounded-3xl border border-line-soft bg-surface p-5 shadow-[var(--shadow-soft)]">
        <p className="text-[15px] leading-relaxed text-ink-soft">{n.body}</p>
      </div>
    </AppScreen>
  );
}
