import SuperpowerPage from "@/components/SuperpowerPage";
import { getSuperpowerMetadata } from "@/data/superpowers";

export const metadata = getSuperpowerMetadata("/memory");

function MemoryHeroContent() {
  return (
    <>
      <p>
        Memory is a scarce resource in the global state of any distributed system: Every byte must be replicated across every peer. Most networks ignore this cost or hide it behind volatile gas fees. Convex confronts it head-on: <strong>on-chain memory is a first-class economic asset</strong>.
      </p>
      <p>
        When you allocate state, you consume memory allowance, bought with CVM from a common pool. When you free that state, you <strong>get the allowance back</strong> — and you can sell it back to the pool for coins, a direct reward for good housekeeping. The result is a self-regulating system: bloat is expensive, efficiency is profitable, and the network stays lean without any central authority imposing limits.
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
