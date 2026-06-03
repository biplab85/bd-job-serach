import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { Button, Field, Input, Textarea } from "@/components/ui";
import { AvatarUploadButton } from "@/components/FileButton";
import { user } from "@/lib/data";
import { FiUser, FiBriefcase, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function EditProfile() {
  return (
    <AppScreen
      header={<TopBar title="Edit profile" />}
      contentClassName="px-5 py-5"
      nav={
        <div className="border-t border-line-soft bg-paper/95 px-5 pb-[max(env(safe-area-inset-bottom),14px)] pt-3.5 backdrop-blur-xl">
          <Button href="/profile" variant="primary" full>
            Save changes
          </Button>
        </div>
      }
    >
      {/* Avatar */}
      <div className="flex justify-center pb-6">
        <div className="relative">
          <span
            className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] font-display text-3xl font-semibold text-white"
            style={{ background: user.avatarBg }}
          >
            {user.initials}
          </span>
          <AvatarUploadButton />
        </div>
      </div>

      <div className="space-y-4">
        <Field label="Full name">
          <Input icon={FiUser} defaultValue={user.name} />
        </Field>
        <Field label="Professional title">
          <Input icon={FiBriefcase} defaultValue={user.title} />
        </Field>
        <Field label="Email">
          <Input icon={FiMail} type="email" defaultValue={user.email} />
        </Field>
        <Field label="Phone">
          <Input icon={FiPhone} type="tel" defaultValue={user.phone} />
        </Field>
        <Field label="Location">
          <Input icon={FiMapPin} defaultValue={user.location} />
        </Field>
        <Field label="About you">
          <Textarea rows={4} defaultValue={user.about} />
        </Field>
      </div>
    </AppScreen>
  );
}
