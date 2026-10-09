import type { IconCardItem } from "./types";

export const howItWorks: IconCardItem[] = [
  {
    icon: "git-merge",
    title: "Belief Propagation",
    text: "Each peer maintains a Belief—a data structure representing its view of consensus across the whole network, including the latest block orderings from other peers. Beliefs are shared through random gossip between peers, requiring only occasional communication to keep the system in sync.",
  },
  {
    icon: "layers",
    title: "Belief Merge Function",
    text: "When a peer receives beliefs from others, it applies the Belief Merge Function—a mathematical operation that combines beliefs into an updated view. This function is idempotent, commutative, and associative, forming a join-semilattice that satisfies the conditions of a Conflict-free Replicated Data Type (CRDT). Repeated applications automatically converge to a stable consensus.",
  },
  {
    icon: "shield",
    title: "Stake-Weighted Voting",
    text: "Conflicts in proposed block orderings are resolved by stake-weighted voting. Peers compute total stake voting for each proposed block at each position. Peers supporting minority orderings are excluded from subsequent votes, creating a strong incentive to align with the majority. This procedure provably converges to a single ordering.",
  },
  {
    icon: "lock",
    title: "Staged Confirmation",
    text: "Confirmation climbs through levels. A prefix of the ordering backed by at least 2/3 of effective stake becomes the proposal; when 2/3 back the proposal it reaches consensus; when 2/3 back that, it is final. Transactions execute only once final, and confirmed points never roll back. Digital signatures ensure no peer can impersonate another—full cryptographic security is maintained throughout.",
  },
];
