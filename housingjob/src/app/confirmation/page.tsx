import Link from "next/link";
import { Button } from "@/components/ui";
import { getJob } from "@/lib/data";
import { FiCheck, FiHome, FiArrowRight } from "react-icons/fi";

export default async function Confirmation({
  searchParams,
}: {
  searchParams: Promise<{ job?: string }>;
}) {
  const { job: jobId } = await searchParams;
  const job = jobId ? getJob(jobId) : undefined;

  const steps = [
    "Your application is on its way to the hiring team",
    "We'll notify you the moment they respond",
    "Track everything from your Applications tab",
  ];

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-brand-700 px-6 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -right-16 top-10 h-72 w-72 rounded-full opacity-30 blur-2xl"
          style={{ background: "radial-gradient(circle,#1aa176,transparent 70%)" }}
        />
        <div className="absolute inset-0 texture-grain opacity-[0.12]" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        <div className="animate-pop relative flex h-28 w-28 items-center justify-center rounded-full bg-accent shadow-2xl">
          <FiCheck className="text-6xl" strokeWidth={3} />
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/30" />
        </div>

        <h1 className="font-display mt-8 text-[34px] font-semibold leading-tight tracking-tight">
          Application sent!
        </h1>
        <p className="mt-3 max-w-[300px] text-[15px] leading-relaxed text-white/75">
          {job ? (
            <>
              You&apos;ve applied for{" "}
              <span className="font-semibold text-white">{job.title}</span> at {job.company}.
            </>
          ) : (
            <>Your application was submitted successfully.</>
          )}
        </p>

        <div className="mt-8 w-full space-y-3 text-left">
          {steps.map((s, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-[13px] font-bold">
                {i + 1}
              </span>
              <span className="text-[13.5px] text-white/85">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 space-y-3 pb-10">
        <Button href="/applications" variant="accent" full iconRight={FiArrowRight}>
          Track application
        </Button>
        <Link
          href="/home"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full text-[14px] font-semibold text-white/80 transition hover:text-white"
        >
          <FiHome /> Back to home
        </Link>
      </div>
    </div>
  );
}
