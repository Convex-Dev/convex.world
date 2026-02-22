import type { IconCardItem } from "./types";

export const howAgentsConnect: IconCardItem[] = [
  {
    icon: "plug",
    title: "Model Context Protocol",
    text: "Convex peers ship with built-in MCP. Agents discover capabilities, query global state, and execute transactions through a standardised protocol — no custom integrations required.",
  },
  {
    icon: "layers",
    title: "Prepare & Execute",
    text: "Two-phase transaction flow: simulate with zero cost, then commit atomically. No mempools, no front-running, no wasted juice.",
  },
  {
    icon: "key-round",
    title: "Flexible Signing",
    text: "Ed25519 for fully autonomous agents, hardware wallets for supervised agents, multi-agent review systems for high-value operations. The same cryptographic primitives for every participant.",
  },
  {
    icon: "database",
    title: "Global State Access",
    text: "Sub-millisecond reads across the entire global state. Millions of queries per second per peer. Agents observe everything, in real time.",
  },
];
