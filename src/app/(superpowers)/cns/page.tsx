import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpowers";

export const metadata = getSuperpowerMetadata("/cns");

export default function CNS() {
  return (
    <SuperpowerPage href="/cns">
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Explore naming"
        description="Try resolving CNS names in the sandbox, or learn about decentralised identity."
        links={[
          { label: "Open Sandbox", href: "/sandbox" },
          { label: "DIDs", href: "/dids", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
