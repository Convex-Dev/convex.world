import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpowers";

export const metadata = getSuperpowerMetadata("/lisp");

export default function ConvexLisp() {
  return (
    <SuperpowerPage href="/lisp">
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Try it live"
        description="Write and execute Convex Lisp in the interactive sandbox."
        links={[
          { label: "Open Sandbox", href: "/sandbox" },
          { label: "Developer Overview", href: "/developers", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
