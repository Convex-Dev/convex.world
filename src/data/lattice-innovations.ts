export interface LatticeInnovation {
  title: string;
  text: string;
}

export const innovations: LatticeInnovation[] = [
  {
    title: "Structural Sharing",
    text: "Immutable persistent data structures mean changes produce new values that share most data with the original. Storage and processing are proportional only to changes, not total size.",
  },
  {
    title: "Delta Transmission",
    text: "Only deltas are transmitted when new lattice values are communicated. Network requirements are proportional only to changes—not the total data in the system.",
  },
  {
    title: "Merge Coalescing",
    text: "Multiple received values are merged into a single outgoing value. This automatically reduces traffic and scales load to what each node can individually handle.",
  },
  {
    title: "Selective Attention",
    text: "Nodes select whichever subsets of the lattice they need. Peer operators can scale resource usage based on their own requirements, participating only in relevant regions.",
  },
  {
    title: "Orthogonal Persistence",
    text: "Lattice values exist seamlessly in memory or on disk. From a developer perspective, they are identical. Values are efficiently loaded and cached on demand—an in-memory database that can exceed local RAM.",
  },
  {
    title: "Fast Comparison",
    text: "Checking identity of any two values is a single hash comparison: O(1). Computing the common prefix of two vectors of arbitrary length is also O(1)—heavily exploited for CPoS efficiency.",
  },
];
