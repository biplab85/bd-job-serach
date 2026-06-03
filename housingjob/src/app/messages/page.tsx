import Link from "next/link";
import { AppScreen } from "@/components/AppScreen";
import { BottomNav } from "@/components/BottomNav";
import { Avatar } from "@/components/ui";
import { conversations } from "@/lib/data";
import { FiEdit } from "react-icons/fi";

export default function MessagesPage() {
  return (
    <AppScreen
      nav={<BottomNav />}
      contentClassName="pb-6"
      header={
        <div className="flex items-center justify-between px-5 pb-3 pt-5">
          <div>
            <h1 className="font-display text-[24px] font-semibold tracking-tight text-ink">
              Messages
            </h1>
            <p className="text-[13px] text-muted">Stay in touch with recruiters</p>
          </div>
          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white">
            <FiEdit className="text-lg" />
          </button>
        </div>
      }
    >
      <div className="px-3">
        {conversations.map((c) => (
          <Link
            key={c.id}
            href={`/messages/${c.id}`}
            className="flex items-center gap-3.5 rounded-2xl p-3 transition hover:bg-paper-2"
          >
            <div className="relative">
              <Avatar initials={c.initials} bg={c.avatarBg} size={52} />
              {c.online && (
                <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-brand ring-2 ring-paper" />
              )}
            </div>
            <div className="min-w-0 flex-1 border-b border-line-soft pb-3">
              <div className="flex items-center gap-2">
                <p className="flex-1 truncate text-[14.5px] font-bold text-ink">{c.name}</p>
                <span className="text-[11.5px] text-muted">{c.time}</span>
              </div>
              <div className="mt-0.5 flex items-center gap-2">
                <p
                  className={`flex-1 truncate text-[13px] ${
                    c.unread ? "font-semibold text-ink-soft" : "text-muted"
                  }`}
                >
                  {c.preview}
                </p>
                {c.unread > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-bold text-white">
                    {c.unread}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AppScreen>
  );
}
