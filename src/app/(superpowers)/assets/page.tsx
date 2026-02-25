import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpower-metadata";

export const metadata = getSuperpowerMetadata("/assets");

export default function DigitalAssets() {
  return (
    <SuperpowerPage href="/assets">
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Create assets"
        description="Try creating tokens in the sandbox, or explore one-line DeFi with Torus."
        links={[
          { label: "Open Sandbox", href: "/sandbox" },
          { label: "One Line DeFi", href: "/defi", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
