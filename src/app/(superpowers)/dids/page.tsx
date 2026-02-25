import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpowers";

export const metadata = getSuperpowerMetadata("/dids");

export default function DIDs() {
  return (
    <SuperpowerPage href="/dids">
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Explore identity"
        description="See how DIDs enable the agentic economy, or start building on Convex."
        links={[
          { label: "Agentic Economy", href: "/ai" },
          { label: "Start Building", href: "/developers", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
