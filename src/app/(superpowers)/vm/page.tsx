import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpowers";

export const metadata = getSuperpowerMetadata("/vm");

export default function VirtualMachine() {
  return (
    <SuperpowerPage href="/vm">
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Try the CVM"
        description="Write and execute Convex Lisp in the live sandbox, or explore the language."
        links={[
          { label: "Open Sandbox", href: "/sandbox" },
          { label: "Convex Lisp", href: "/lisp", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
