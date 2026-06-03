import Link from "next/link";
import { Button } from "@/components/ui";
import { LogoMark } from "@/components/Logo";
import { FiHome, FiSearch } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <LogoMark size={56} />
      <p className="font-display mt-8 text-[72px] font-semibold leading-none text-brand-ink">
        404
      </p>
      <h1 className="mt-2 text-[20px] font-bold tracking-tight text-ink">
        This page took a different job
      </h1>
      <p className="mt-2 max-w-[280px] text-[14px] leading-relaxed text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-8 w-full max-w-[280px] space-y-3">
        <Button href="/home" variant="primary" full icon={FiHome}>
          Back to home
        </Button>
        <Link
          href="/search"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full text-[14px] font-semibold text-brand-ink"
        >
          <FiSearch /> Search jobs
        </Link>
      </div>
    </div>
  );
}
