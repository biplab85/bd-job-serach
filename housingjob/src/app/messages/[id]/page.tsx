"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { Avatar } from "@/components/ui";
import { toast } from "@/components/Toast";
import { getConversation } from "@/lib/data";
import { FiChevronLeft, FiPhone, FiVideo, FiSend, FiPlus } from "react-icons/fi";

export default function ChatThread({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const convo = getConversation(id);
  const router = useRouter();
  const [messages, setMessages] = useState(convo?.messages ?? []);
  const [draft, setDraft] = useState("");

  if (!convo) notFound();

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages((m) => [...m, { me: true, text, time: "now" }]);
    setDraft("");
  };

  return (
    <div className="flex h-full flex-col">
      {/* header */}
      <header className="flex items-center gap-3 border-b border-line-soft bg-paper/85 px-3 py-2.5 backdrop-blur-xl">
        <button
          onClick={() => router.back()}
          aria-label="Back"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface text-ink active:scale-95"
        >
          <FiChevronLeft className="text-xl" />
        </button>
        <div className="relative">
          <Avatar initials={convo.initials} bg={convo.avatarBg} size={42} />
          {convo.online && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-brand ring-2 ring-paper" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14.5px] font-bold text-ink">{convo.name}</p>
          <p className="truncate text-[11.5px] text-brand-ink">
            {convo.online ? "Active now" : convo.role}
          </p>
        </div>
        <button
          aria-label={`Call ${convo.name}`}
          onClick={() => toast(`Calling ${convo.name}…`)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition hover:bg-paper-2 active:scale-95"
        >
          <FiPhone />
        </button>
        <button
          aria-label={`Video call ${convo.name}`}
          onClick={() => toast(`Starting video call with ${convo.name}…`)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-ink-soft transition hover:bg-paper-2 active:scale-95"
        >
          <FiVideo />
        </button>
      </header>

      {/* messages */}
      <div className="no-scrollbar flex-1 space-y-2 overflow-y-auto px-4 py-4">
        <p className="py-2 text-center text-[11px] font-medium text-muted">Today</p>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.me ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug ${
                m.me
                  ? "rounded-br-md bg-brand text-white"
                  : "rounded-bl-md border border-line-soft bg-surface text-ink"
              }`}
            >
              {m.text}
              <span
                className={`mt-1 block text-right text-[10px] ${
                  m.me ? "text-white/60" : "text-muted"
                }`}
              >
                {m.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* composer */}
      <div className="flex items-center gap-2 border-t border-line-soft bg-paper/95 px-3 pb-[max(env(safe-area-inset-bottom),12px)] pt-2.5 backdrop-blur-xl">
        <button
          aria-label="Add attachment"
          onClick={() => toast("Attachments are coming soon.")}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-paper-2 text-ink-soft transition active:scale-95"
        >
          <FiPlus className="text-xl" />
        </button>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Message…"
          className="h-11 flex-1 rounded-full border border-line bg-surface px-4 text-[14.5px] text-ink outline-none focus:border-brand"
        />
        <button
          onClick={send}
          aria-label="Send"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white active:scale-95"
        >
          <FiSend />
        </button>
      </div>
    </div>
  );
}
