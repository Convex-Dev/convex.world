import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpowers";

export const metadata = getSuperpowerMetadata("/crdts");

export default function LatticeCRDTs() {
  return (
    <SuperpowerPage href="/crdts">
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Explore the lattice"
        description="Learn how CRDTs power the Convex data layer, or start building on the network."
        links={[
          { label: "Data Lattice", href: "/lattice" },
          { label: "Start Building", href: "/developers", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
