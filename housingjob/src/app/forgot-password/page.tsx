import { Button, Field, Input } from "@/components/ui";
import { TopBar } from "@/components/TopBar";
import { AppScreen } from "@/components/AppScreen";
import { FiMail, FiKey } from "react-icons/fi";

export default function ForgotPassword() {
  return (
    <AppScreen header={<TopBar title="Reset password" />} contentClassName="px-6 pb-8">
      <span className="mt-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-50 text-accent">
        <FiKey className="text-3xl" />
      </span>

      <h1 className="font-display mt-6 text-[30px] font-semibold leading-tight tracking-tight text-ink">
        Forgot your password?
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        Enter the email tied to your account and we&apos;ll send you a secure link to reset it.
      </p>

      <div className="mt-8">
        <Field label="Email address">
          <Input icon={FiMail} type="email" placeholder="you@example.com" />
        </Field>
      </div>

      <div className="mt-7">
        <Button href="/reset-password" variant="primary" full>
          Send reset link
        </Button>
      </div>
    </AppScreen>
  );
}
