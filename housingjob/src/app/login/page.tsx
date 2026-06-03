import Link from "next/link";
import Logo from "@/components/Logo";
import { Button, Field, Input } from "@/components/ui";
import { PasswordInput } from "@/components/PasswordInput";
import { TopBar } from "@/components/TopBar";
import { AppScreen } from "@/components/AppScreen";
import { FiMail, FiArrowRight, FiSearch } from "react-icons/fi";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";

export default function Login() {
  return (
    <AppScreen header={<TopBar back border={false} />} contentClassName="px-6 pb-8">
      <Logo size={34} className="mb-8" />

      <h1 className="font-display text-[32px] font-semibold leading-tight tracking-tight text-ink">
        Welcome back
      </h1>
      <p className="mt-1.5 text-[15px] text-muted">
        Sign in to pick up where you left off.
      </p>

      <div className="mt-7 space-y-4">
        <Field label="Email address">
          <Input icon={FiMail} type="email" placeholder="you@example.com" defaultValue="biplab@example.com" />
        </Field>
        <Field label="Password">
          <PasswordInput defaultValue="password" />
        </Field>
        <div className="flex justify-end">
          <Link href="/forgot-password" className="text-[13px] font-semibold text-brand-ink">
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <Button href="/home" variant="primary" full iconRight={FiArrowRight}>
          Sign in
        </Button>
      </div>

      <div className="my-7 flex items-center gap-4">
        <span className="h-px flex-1 bg-line" />
        <span className="text-xs font-medium text-muted">or continue with</span>
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: FaGoogle, label: "Google" },
          { icon: FaApple, label: "Apple" },
          { icon: FaFacebookF, label: "Facebook" },
        ].map(({ icon: Icon, label }) => (
          <Link
            key={label}
            href="/home"
            aria-label={`Continue with ${label}`}
            className="flex h-[52px] items-center justify-center rounded-2xl border border-line bg-surface text-ink transition hover:border-ink/30 active:scale-95"
          >
            <Icon className="text-xl" />
          </Link>
        ))}
      </div>

      <p className="mt-8 text-center text-[14px] text-muted">
        New to HousingJob?{" "}
        <Link href="/register" className="font-semibold text-brand-ink">
          Create an account
        </Link>
      </p>

      <Link
        href="/home"
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full border border-line text-[14px] font-semibold text-ink-soft transition hover:bg-paper-2"
      >
        <FiSearch /> Browse without signing in
      </Link>
    </AppScreen>
  );
}
