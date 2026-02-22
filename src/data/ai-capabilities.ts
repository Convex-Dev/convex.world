import type { IconCardItem } from "./types";

export const capabilities: IconCardItem[] = [
  {
    icon: "cpu",
    title: "Programmable Accounts",
    text: "Every account is an on-chain Lisp machine with its own environment, code, data, and digital asset holdings. Fund an agent and it operates autonomously.",
  },
  {
    icon: "fingerprint",
    title: "Decentralised Identity",
    text: "DID methods including did:key for ephemeral agent identities — self-certifying, no on-chain registration required. Agents have cryptographic identity from the first transaction.",
  },
  {
    icon: "timer",
    title: "On-Chain Scheduler",
    text: "Schedule autonomous future operations. Once set, peers must execute them — effectively unstoppable deferred actions for agents that plan ahead.",
  },
  {
    icon: "gem",
    title: "Digital Assets",
    text: "Create, transfer, and manage fungible tokens and NFTs in a single expression. Agents trade, lend, and hold like any other participant.",
  },
  {
    icon: "shield",
    title: "Trust Monitors",
    text: "Fine-grained access control for how agents interact with accounts and assets. Constraint rings define operational boundaries, not permission walls.",
  },
  {
    icon: "credit-card",
    title: "x402 Payments",
    text: "Internet-native micropayments via HTTP 402. No registration, no OAuth — machine-to-machine value transfer at protocol level.",
  },
];
