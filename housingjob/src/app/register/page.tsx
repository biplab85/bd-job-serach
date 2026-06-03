import Link from "next/link";
import Logo from "@/components/Logo";
import { Button, Field, Input } from "@/components/ui";
import { PasswordInput } from "@/components/PasswordInput";
import { TopBar } from "@/components/TopBar";
import { AppScreen } from "@/components/AppScreen";
import { FiMail, FiUser, FiPhone, FiArrowRight } from "react-icons/fi";

export default function Register() {
  return (
    <AppScreen header={<TopBar back border={false} />} contentClassName="px-6 pb-8">
      <Logo size={34} className="mb-7" />

      <h1 className="font-display text-[32px] font-semibold leading-tight tracking-tight text-ink">
        Create account
      </h1>
      <p className="mt-1.5 text-[15px] text-muted">
        Join thousands finding better work every day.
      </p>

      <div className="mt-7 space-y-4">
        <Field label="Full name">
          <Input icon={FiUser} placeholder="Biplab Paul" />
        </Field>
        <Field label="Email address">
          <Input icon={FiMail} type="email" placeholder="you@example.com" />
        </Field>
        <Field label="Mobile number">
          <Input icon={FiPhone} type="tel" placeholder="+880 1XXX XXXXXX" />
        </Field>
        <Field label="Password" hint="Use 8+ characters with a number and a symbol.">
          <PasswordInput placeholder="Create a password" />
        </Field>
      </div>

      <label className="mt-5 flex items-start gap-3">
        <input
          type="checkbox"
          defaultChecked
          className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--color-brand)]"
        />
        <span className="text-[13px] leading-relaxed text-muted">
          I agree to HousingJob&apos;s{" "}
          <Link href="/terms" className="font-semibold text-brand-ink">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="font-semibold text-brand-ink">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <div className="mt-6">
        <Button href="/otp" variant="primary" full iconRight={FiArrowRight}>
          Create account
        </Button>
      </div>

      <p className="mt-7 text-center text-[14px] text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand-ink">
          Sign in
        </Link>
      </p>
    </AppScreen>
  );
}
