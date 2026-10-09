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
    text: "Dry-run any operation as a free query, then prepare the transaction, sign it, and submit it to execute atomically. No mempools, no front-running, no wasted juice.",
  },
  {
    icon: "key-round",
    title: "Flexible Signing",
    text: "Ed25519 keys for fully autonomous agents, a peer-hosted signing service for agents that should not hold keys themselves, and pluggable signers for everything else. The same cryptographic primitives for every participant.",
  },
  {
    icon: "database",
    title: "Global State Access",
    text: "Fast reads across the entire global state. Queries run directly on any peer, with no consensus round and no fees. Agents observe everything, in real time.",
  },
];
