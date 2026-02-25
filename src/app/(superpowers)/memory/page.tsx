import SuperpowerPage from "@/components/SuperpowerPage";
import { getSuperpowerMetadata } from "@/data/superpower-metadata";

export const metadata = getSuperpowerMetadata("/memory");

function MemoryHeroContent() {
  return (
    <>
      <p>
        Memory is the scarcest resource in the global state of any distributed system: Every byte must be replicated across every peer. Most networks ignore this cost or hide it behind volatile gas fees. Convex confronts it head-on: <strong>on-chain memory is a first-class economic asset</strong>.
      </p>
      <p>
        When you allocate state, you spend CVM proportional to the memory consumed. When you free that state, you <strong>get coins back</strong> — a direct credit that rewards good housekeeping. The result is a self-regulating system: bloat is expensive, efficiency is profitable, and the network stays lean without any central authority imposing limits.
      </p>
    </>
  );
}

export default function MemoryAccounting() {
  return (
    <SuperpowerPage href="/memory" heroContent={<MemoryHeroContent />}>
      {null}
    </SuperpowerPage>
  );
}
