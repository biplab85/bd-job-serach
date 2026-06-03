"use client";

/* Client buttons that surface a toast. They own their own icons so they can be
   dropped into server components (only serializable string props cross the
   server→client boundary — never the icon function). */

import { FiX, FiDownload } from "react-icons/fi";
import { IconButton } from "@/components/ui";
import { toast } from "@/components/Toast";

/** Reject-a-candidate action (employer). */
export function RejectButton({ name }: { name: string }) {
  return (
    <IconButton
      icon={FiX}
      label={`Reject ${name}`}
      onClick={() => toast(`${name} moved to rejected.`)}
    />
  );
}

/** Download-CV action (employer). */
export function DownloadCvButton({
  label = "Download CV",
  message = "Downloading CV…",
}: {
  label?: string;
  message?: string;
}) {
  return (
    <IconButton icon={FiDownload} label={label} variant="ghost" onClick={() => toast(message)} />
  );
}
