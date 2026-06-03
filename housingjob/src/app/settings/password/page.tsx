import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Button, Field } from "@/components/ui";
import { PasswordInput } from "@/components/PasswordInput";

export default function ChangePassword() {
  return (
    <AppScreen
      header={<TopBar title="Change password" />}
      contentClassName="px-5 py-6"
      nav={
        <div className="border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <Button href="/settings" variant="primary" full>
            Update password
          </Button>
        </div>
      }
    >
      <p className="mb-6 text-[14px] leading-relaxed text-muted">
        For your security, choose a password you don&apos;t use anywhere else.
      </p>
      <div className="space-y-4">
        <Field label="Current password">
          <PasswordInput placeholder="Enter current password" />
        </Field>
        <Field label="New password" hint="At least 8 characters with a number and symbol.">
          <PasswordInput placeholder="Enter new password" />
        </Field>
        <Field label="Confirm new password">
          <PasswordInput placeholder="Re-enter new password" />
        </Field>
      </div>
    </AppScreen>
  );
}
