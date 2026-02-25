import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpower-metadata";

export const metadata = getSuperpowerMetadata("/memory");

export default function MemoryAccounting() {
  return (
    <SuperpowerPage href="/memory">
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Explore economics"
        description="Learn about the Convex Coin and tokenomics that power memory accounting."
        links={[
          { label: "Convex Coin", href: "/coin" },
          { label: "Start Building", href: "/developers", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
