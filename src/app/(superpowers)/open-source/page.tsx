import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpowers";

export const metadata = getSuperpowerMetadata("/open-source");

export default function OpenSource() {
  return (
    <SuperpowerPage href="/open-source">
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Get involved"
        description="Explore the code, join the community, or start building on Convex."
        links={[
          { label: "Join the Community", href: "/community" },
          { label: "Start Building", href: "/developers", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
