"use client";

import { useSyncExternalStore } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const THEME_EVENT = "hj-theme-change";

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  root.classList.toggle("dark", dark);
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch {}
  window.dispatchEvent(new Event(THEME_EVENT));
}

/* Subscribe to the live `.dark` class on <html> via an external store so the
   UI reflects the real theme without a setState-in-effect (which React flags
   and which can cause a cascading render). Server snapshot is `false`; a
   `ready` flag below avoids any icon flash before hydration. */
function subscribe(cb: () => void) {
  window.addEventListener(THEME_EVENT, cb);
  return () => window.removeEventListener(THEME_EVENT, cb);
}
function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}
function getServerSnapshot() {
  return false;
}

function useDarkMode() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function useHydrated() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/** Pill switch used in Settings — actually drives the theme. */
export function ThemeToggle() {
  const dark = useDarkMode();
  const ready = useHydrated();

  return (
    <button
      role="switch"
      aria-checked={dark}
      aria-label="Toggle dark mode"
      onClick={() => applyTheme(!dark)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors duration-200 ${
        dark ? "bg-brand" : "bg-line"
      }`}
    >
      <span
        className={`absolute left-0.5 top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] shadow transition-transform duration-200 ${
          dark ? "translate-x-[20px] text-brand-ink" : "translate-x-0 text-gold"
        }`}
      >
        {ready && (dark ? <FiMoon /> : <FiSun />)}
      </span>
    </button>
  );
}

/** Standalone icon button variant (for headers). */
export function ThemeIconButton() {
  const dark = useDarkMode();
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => applyTheme(!dark)}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition active:scale-95"
    >
      {dark ? <FiSun className="text-[1.2rem]" /> : <FiMoon className="text-[1.2rem]" />}
    </button>
  );
}
