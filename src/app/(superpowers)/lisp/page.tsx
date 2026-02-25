import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import CodeBlock from "@/components/CodeBlock";
import { getSuperpowerMetadata } from "@/data/superpowers";

export const metadata = getSuperpowerMetadata("/lisp");

const LISP_EXAMPLE = `
;; Transfer 1 CVM to another account
(transfer #42 1000000000)

;; Define a pure function
(defn greet [name]
  (str "Hello, " name "!"))

;; Query a fungible token balance
(@convex.fungible/balance #128 *address*)
`;

export default function ConvexLisp() {
  return (
    <SuperpowerPage
      href="/lisp"
      heroContent={<CodeBlock code={LISP_EXAMPLE} title="convex lisp" />}
    >
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
