"use client";

/* Real file pickers for the photo / CV upload affordances. They open the
   native picker and confirm the chosen file via a toast (mock — no upload). */

import { useRef } from "react";
import { FiCamera, FiUploadCloud } from "react-icons/fi";
import { toast } from "@/components/Toast";

export function AvatarUploadButton() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <button
        type="button"
        aria-label="Change profile photo"
        onClick={() => ref.current?.click()}
        className="absolute -bottom-1 -right-1 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white ring-4 ring-paper transition active:scale-95"
      >
        <FiCamera className="text-[1.05rem]" />
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) toast(`Photo selected: ${f.name}`);
        }}
      />
    </>
  );
}

export function UploadDifferentFile() {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-line py-3 text-[13.5px] font-semibold text-muted transition hover:border-brand hover:text-brand-ink"
      >
        <FiUploadCloud /> Upload a different file
      </button>
      <input
        ref={ref}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) toast(`Attached: ${f.name}`);
        }}
      />
    </>
  );
}
