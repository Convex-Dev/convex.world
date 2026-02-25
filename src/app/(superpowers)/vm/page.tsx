import SuperpowerPage from "@/components/SuperpowerPage";
import CtaSection from "@/components/CtaSection";
import { getSuperpowerMetadata } from "@/data/superpowers";

export const metadata = getSuperpowerMetadata("/vm");

export default function VirtualMachine() {
  return (
    <SuperpowerPage href="/vm" heroContent={
      <>
        <p>
          Consensus determines truth. But truth alone isn&apos;t enough. You need
          a machine that can act on it: executing code against a single,
          consistent global state so that every participant can verify exactly
          what happened and why.
        </p>
        <p>
          Most platforms treat execution as an afterthought, bolting a
          constrained VM onto a fragmented architecture of shards and rollups.
          Convex took a different path.
        </p>
        <p>
          The CVM is grounded in the{" "}
          <a href="https://en.wikipedia.org/wiki/Lambda_calculus" target="_blank" rel="noopener noreferrer">lambda calculus</a>
          {" "}— the same mathematical
          foundation that defines what computation itself means. One atomic
          state, no fragmentation, and smart contracts you don&apos;t have to
          trust, because you can prove they ran exactly as written.
        </p>
      </>
    }>
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
