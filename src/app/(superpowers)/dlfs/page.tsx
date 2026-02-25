import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpowers";

export const metadata = getSuperpowerMetadata("/dlfs");

export default function DLFS() {
  return (
    <SuperpowerPage href="/dlfs">
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Explore storage"
        description="See how DLFS fits the Convex data layer, or dive into the encoding format."
        links={[
          { label: "Data Lattice", href: "/lattice" },
          { label: "CAD3 Encoding", href: "/cad3", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
