"use client";

/* ------------------------------------------------------------------
   Lightweight toast. A single imperative `toast(message)` call shows a
   transient pill inside the phone frame. No provider/context needed —
   it manages its own DOM so any client component can call it.
------------------------------------------------------------------- */

let stylesInjected = false;

function ensureStyles() {
  if (stylesInjected || typeof document === "undefined") return;
  stylesInjected = true;
  const style = document.createElement("style");
  style.textContent = `
  .hj-toast-wrap{position:absolute;left:0;right:0;bottom:104px;display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none;z-index:60;padding:0 20px;}
  .hj-toast{max-width:100%;background:#15140f;color:#fff;font-size:13.5px;font-weight:600;line-height:1.3;padding:11px 16px;border-radius:9999px;box-shadow:0 14px 34px -10px rgba(0,0,0,.5);transform:translateY(14px);opacity:0;transition:transform .3s cubic-bezier(.22,1,.36,1),opacity .3s;text-align:center;}
  .hj-toast.show{transform:translateY(0);opacity:1;}
  `;
  document.head.appendChild(style);
}

export function toast(message: string, duration = 2200) {
  if (typeof document === "undefined") return;
  ensureStyles();
  const host = document.querySelector(".device-shell") ?? document.body;
  let wrap = host.querySelector<HTMLElement>(":scope > .hj-toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.className = "hj-toast-wrap";
    host.appendChild(wrap);
  }
  const el = document.createElement("div");
  el.className = "hj-toast";
  el.setAttribute("role", "status");
  el.textContent = message;
  wrap.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  window.setTimeout(() => {
    el.classList.remove("show");
    window.setTimeout(() => el.remove(), 320);
  }, duration);
}
