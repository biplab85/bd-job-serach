import { Button, Field } from "@/components/ui";
import { PasswordInput } from "@/components/PasswordInput";
import { TopBar } from "@/components/TopBar";
import { AppScreen } from "@/components/AppScreen";
import { FiLock } from "react-icons/fi";

export default function ResetPassword() {
  return (
    <AppScreen header={<TopBar title="New password" />} contentClassName="px-6 pb-8">
      <span className="mt-2 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-ink">
        <FiLock className="text-3xl" />
      </span>

      <h1 className="font-display mt-6 text-[30px] font-semibold leading-tight tracking-tight text-ink">
        Set a new password
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">
        Make it strong and unique — you won&apos;t need to remember it for long with HousingJob.
      </p>

      <div className="mt-8 space-y-4">
        <Field label="New password">
          <PasswordInput placeholder="Create a new password" />
        </Field>
        <Field label="Confirm password">
          <PasswordInput placeholder="Re-enter your password" />
        </Field>
      </div>

      <div className="mt-7">
        <Button href="/login" variant="primary" full>
          Update password
        </Button>
      </div>
    </AppScreen>
  );
}
