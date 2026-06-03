import { AppScreen } from "@/components/AppScreen";
import { TopBar } from "@/components/TopBar";
import { LegalBody } from "@/components/LegalBody";

const sections = [
  {
    h: "1. Acceptance of terms",
    p: "By creating an account or using HousingJob, you agree to these Terms. If you do not agree, please don't use the service.",
  },
  {
    h: "2. Using your account",
    p: "You're responsible for the activity on your account and for keeping your credentials secure. Provide accurate information and keep it up to date.",
  },
  {
    h: "3. Applying to jobs",
    p: "When you apply, you authorise us to share your profile and CV with the relevant employer. Employers are independent and make their own hiring decisions.",
  },
  {
    h: "4. Acceptable use",
    p: "Don't misuse the platform — no spam, scraping, impersonation, or posting unlawful content. We may suspend accounts that break these rules.",
  },
  {
    h: "5. Content & ownership",
    p: "You keep ownership of the content you upload. You grant us a licence to display it as needed to operate the service.",
  },
  {
    h: "6. Changes",
    p: "We may update these Terms from time to time. We'll notify you of material changes, and continued use means you accept the update.",
  },
];

export default function TermsPage() {
  return (
    <AppScreen header={<TopBar title="Terms of Service" />} contentClassName="px-5 py-6">
      <LegalBody updated="Updated June 1, 2026" sections={sections} />
    </AppScreen>
  );
}
