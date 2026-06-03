"use client";

import { useState } from "react";
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi";

export function PasswordInput({
  placeholder = "Enter your password",
  defaultValue,
}: {
  placeholder?: string;
  defaultValue?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <FiLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[1.1rem] text-muted" />
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="h-[52px] w-full rounded-2xl border border-line bg-surface pl-11 pr-12 text-[15px] text-ink placeholder:text-muted/70 outline-none transition-all focus:border-brand focus:ring-4 focus:ring-brand/10"
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted transition hover:bg-paper-2"
      >
        {show ? <FiEyeOff /> : <FiEye />}
      </button>
    </div>
  );
}
