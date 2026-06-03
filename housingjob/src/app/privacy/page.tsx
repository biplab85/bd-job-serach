import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { LegalBody } from "@/components/LegalBody";

const sections = [
  {
    h: "1. What we collect",
    p: "Account details (name, email, phone), your profile and CV, and usage data such as the jobs you view and apply to.",
  },
  {
    h: "2. How we use it",
    p: "To match you with relevant roles, power your applications, send notifications you've opted into, and improve the product.",
  },
  {
    h: "3. What we share",
    p: "When you apply, we share your profile and CV with that employer. We never sell your personal data to third parties.",
  },
  {
    h: "4. Your choices",
    p: "You can edit or delete your data anytime, manage notifications in Settings, and request a full export or account deletion.",
  },
  {
    h: "5. Security",
    p: "We use encryption in transit and at rest, and limit internal access to your data on a need-to-know basis.",
  },
  {
    h: "6. Contact",
    p: "For any privacy request, reach our team at privacy@housingjob.app and we'll respond within 30 days.",
  },
];

export default function PrivacyPage() {
  return (
    <AppScreen header={<TopBar title="Privacy Policy" />} contentClassName="px-5 py-6">
      <LegalBody updated="Updated June 1, 2026" sections={sections} />
    </AppScreen>
  );
}
