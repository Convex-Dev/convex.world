export interface MessagingPillar {
  title: string;
  description: string;
}

export const messagingPillars: MessagingPillar[] = [
  {
    title: "Deterministic Shared State",
    description:
      "Convex provides deterministic shared global state, allowing all participants\u2014human and autonomous\u2014to operate under the same rules, physics, and finality in real time. Economic actions resolve predictably, without forks, delays, or hidden state.",
  },
  {
    title: "Energy-Efficient Consensus",
    description:
      "Convex achieves real-time finality through Convergent Proof of Stake, a consensus mechanism designed for efficiency and sustainability. The system reaches agreement without wasteful computation, enabling global coordination without energy-intensive processes.",
  },
  {
    title: "Agent-Native Execution",
    description:
      "Convex is built for agent-native execution. Autonomous systems can coordinate, transact, and build value directly on shared economic infrastructure, participating under the same constraints and guarantees as human actors.",
  },
];

export interface TechSpec {
  label: string;
  value: string;
}

export const techSpecs: TechSpec[] = [
  { label: "Consensus", value: "Convergent Proof of Stake (CPoS)" },
  { label: "Finality", value: "Millisecond deterministic finality" },
  { label: "Execution Environment", value: "Convex Virtual Machine (CVM)" },
  { label: "Language", value: "Convex Lisp" },
  { label: "Architecture", value: "Lattice Data Fabric" },
  { label: "Scalability", value: "True horizontal scalability with shared global state" },
  { label: "Governance", value: "Convex Foundation (non-profit)" },
];
