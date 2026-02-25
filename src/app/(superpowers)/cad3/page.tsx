import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpowers";

export const metadata = getSuperpowerMetadata("/cad3");

export default function CAD3Data() {
  return (
    <SuperpowerPage href="/cad3">
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Explore the stack"
        description="See how CAD3 underpins the lattice, or start building on Convex."
        links={[
          { label: "Data Lattice", href: "/lattice" },
          { label: "Start Building", href: "/developers", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
