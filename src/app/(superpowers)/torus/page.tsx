import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpower-metadata";

export const metadata = getSuperpowerMetadata("/torus");

export default function OneLineDeFi() {
  return (
    <SuperpowerPage href="/torus">
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Try it live"
        description="Execute Torus swaps in the sandbox, or explore the digital asset model."
        links={[
          { label: "Open Sandbox", href: "/sandbox" },
          { label: "Digital Assets", href: "/assets", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
