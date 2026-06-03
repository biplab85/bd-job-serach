import Link from "next/link";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui";
import { FiArrowRight, FiCheckCircle, FiSearch } from "react-icons/fi";

export default function Welcome() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-brand-700 text-white">
      {/* atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-20 top-10 h-72 w-72 rounded-full opacity-30 blur-2xl"
          style={{ background: "radial-gradient(circle,#1aa176,transparent 70%)" }}
        />
        <div
          className="absolute -right-16 bottom-40 h-64 w-64 rounded-full opacity-40 blur-2xl"
          style={{ background: "radial-gradient(circle,#ff6a3d,transparent 70%)" }}
        />
        <div className="absolute inset-0 texture-grain opacity-[0.15]" />
      </div>

      {/* top */}
      <div className="relative z-10 px-6 pt-10">
        <Logo tone="dark" size={34} />
      </div>

      {/* floating card cluster */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-6">
        <div className="relative h-60 w-full max-w-[300px]">
          <div className="animate-float absolute left-2 top-4 w-52 rotate-[-6deg] rounded-3xl bg-white/95 p-4 text-ink shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand font-display font-semibold text-white">
                N
              </span>
              <div>
                <p className="text-[13px] font-bold leading-tight">Frontend Engineer</p>
                <p className="text-[11px] text-muted">Northwind · Remote</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[13px] font-bold text-ink">৳70k–110k</span>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold text-brand-ink">
                New
              </span>
            </div>
          </div>
          <div
            className="animate-float absolute right-0 top-28 w-48 rotate-[7deg] rounded-3xl bg-accent p-4 text-white shadow-2xl"
            style={{ animationDelay: "1.2s" }}
          >
            <FiCheckCircle className="text-xl" />
            <p className="mt-2 text-[13px] font-bold leading-tight">
              You&apos;ve been shortlisted!
            </p>
            <p className="text-[11px] text-white/80">Lumen Studio · 2h ago</p>
          </div>
        </div>
      </div>

      {/* copy + CTAs */}
      <div className="relative z-10 px-6 pb-10">
        <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-mint">
          Welcome to HousingJob
        </p>
        <h1 className="font-display mt-3 text-[40px] font-semibold leading-[1.05] tracking-tight">
          Find work that <span className="italic text-accent">fits</span> your life.
        </h1>
        <p className="mt-3 max-w-[300px] text-[15px] leading-relaxed text-white/70">
          Thousands of curated roles, smart matches and a hiring experience that finally
          respects your time.
        </p>

        <div className="mt-7 space-y-3">
          <Button href="/onboarding" variant="accent" full iconRight={FiArrowRight}>
            Get started
          </Button>
          <Link
            href="/home"
            className="flex h-[54px] w-full items-center justify-center gap-2 rounded-full border border-white/25 text-[15px] font-semibold text-white transition hover:bg-white/10"
          >
            <FiSearch /> Browse as a guest
          </Link>
          <Link
            href="/login"
            className="flex h-11 w-full items-center justify-center rounded-full text-[14px] font-semibold text-white/80 transition hover:text-white"
          >
            I already have an account
          </Link>
        </div>
      </div>
    </div>
  );
}
