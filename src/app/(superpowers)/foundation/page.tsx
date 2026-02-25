import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpower-metadata";

export const metadata = getSuperpowerMetadata("/foundation");

export default function NonProfit() {
  return (
    <SuperpowerPage href="/foundation">
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Join the movement"
        description="Convex is built for public benefit. Join the community or meet the team."
        links={[
          { label: "Meet the Team", href: "/team" },
          { label: "Join the Community", href: "/community", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
