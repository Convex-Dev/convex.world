import type { IconCardItem } from "./types";

export const advantages: IconCardItem[] = [
  {
    icon: "clock",
    title: "Millisecond Finality",
    text: "No block delay. No mempool. Transactions confirm in milliseconds, not minutes. CPoS is limited only by the speed of light.",
  },
  {
    icon: "users",
    title: "Leaderless",
    text: "Any peer may propose a block at any time. No leader election, no sequential bottleneck, no single point of failure. Blocks are proposed concurrently.",
  },
  {
    icon: "shield",
    title: "Byzantine Fault Tolerant",
    text: "Consensus is guaranteed and stable as long as a majority voting power follows the protocol honestly. Proven secure against even powerful adversaries.",
  },
  {
    icon: "lock",
    title: "Front-running Resistant",
    text: "Users submit transactions to a trusted peer—not broadcast to a public mempool. No opportunity for miners or validators to reorder transactions for profit.",
  },
  {
    icon: "leaf",
    title: "100% Green",
    text: "No Proof of Work. No energy-intensive mining. CPoS achieves superior security using a fraction of the power—ecologically defensible by design.",
  },
  {
    icon: "zap",
    title: "Atomic Execution",
    text: "Every transaction executes fully or rolls back completely. Turing-complete logic with automatic failure protection eliminates partial failures.",
  },
];
