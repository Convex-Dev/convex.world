import type { IconCardItem } from "./types";

export const foundationBlocks: IconCardItem[] = [
  {
    icon: "git-merge",
    title: "The Merge Function",
    text: "At its core, the Lattice draws from the mathematical concept of a lattice—a partially ordered set equipped with a merge function. This function combines any two lattice values into a single, consistent result. Through repeated merges, the system naturally converges to a unified value without complex locking mechanisms or heavy consensus protocols.",
  },
  {
    icon: "layers",
    title: "Conflict-Free Replication",
    text: "This design makes the Lattice a Conflict-free Replicated Data Type (CRDT). It guarantees eventual consistency across the network, requiring only occasional gossip between nodes. No continuous connectivity needed—simple, intermittent sharing of lattice values keeps the system in perfect sync.",
  },
  {
    icon: "shield",
    title: "Cryptographic Integrity",
    text: "All data is immutable, content-addressable, and structured as Merkle trees. Digital signatures and cryptographic hashes ensure secure, tamper-proof operation. Conditional acceptance rules thwart malicious actors—invalid values are rejected outright by the network.",
  },
  {
    icon: "file-code",
    title: "Merge Context",
    text: "A key innovation: the merge process uses three inputs—context, the existing trusted value, and the received value. This ensures merges are intelligent and secure. Only portions that pass cryptographic validation are accepted, with the trusted value always prioritised.",
  },
];
