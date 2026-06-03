import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { MenuRow, MenuGroup } from "@/components/MenuRow";
import { Toggle } from "@/components/Toggle";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  FiUser,
  FiLock,
  FiBell,
  FiMail,
  FiMoon,
  FiGlobe,
  FiShield,
  FiInfo,
  FiLogOut,
} from "react-icons/fi";

export default function SettingsPage() {
  return (
    <AppScreen header={<TopBar title="Settings" />} contentClassName="px-5 py-5 space-y-6">
      <Group label="Account">
        <MenuGroup>
          <MenuRow icon={FiUser} label="Edit profile" href="/profile/edit" />
          <MenuRow icon={FiLock} label="Change password" href="/settings/password" />
        </MenuGroup>
      </Group>

      <Group label="Preferences">
        <MenuGroup>
          <MenuRow icon={FiBell} label="Push notifications" trailing={<Toggle initial />} />
          <MenuRow icon={FiMail} label="Email alerts" trailing={<Toggle initial />} />
          <MenuRow icon={FiMoon} label="Dark mode" trailing={<ThemeToggle />} />
          <MenuRow icon={FiGlobe} label="Language" href="/settings/language" value="English" />
        </MenuGroup>
      </Group>

      <Group label="Support">
        <MenuGroup>
          <MenuRow icon={FiShield} label="Privacy policy" href="/privacy" />
          <MenuRow icon={FiInfo} label="About HousingJob" href="/about" />
        </MenuGroup>
      </Group>

      <MenuGroup>
        <MenuRow icon={FiLogOut} label="Log out" href="/login" danger />
      </MenuGroup>

      <p className="pt-1 text-center text-[12px] text-muted">HousingJob · v1.0.0</p>
    </AppScreen>
  );
}

function Group({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 px-1 text-[12px] font-bold uppercase tracking-wide text-muted">
        {label}
      </p>
      {children}
    </div>
  );
}
