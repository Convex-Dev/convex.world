import type { IconCardItem } from "./types";

export const innovations: IconCardItem[] = [
  {
    icon: "fingerprint",
    title: "Canonical Encoding",
    text: "Every value has exactly one binary representation. No ambiguity, no variation—one value, one encoding, one identity. This is the foundation that makes everything else possible.",
  },
  {
    icon: "key-round",
    title: "Content-Addressable",
    text: "Hash the encoding with SHA3-256 and you get a Value ID—a decentralised pointer that uniquely identifies any piece of data across the entire network, without coordination.",
  },
  {
    icon: "eye",
    title: "Self-Describing",
    text: "Every encoded value carries its own type information. No external schemas, no version negotiation, no out-of-band metadata. Any participant can decode any value on sight.",
  },
  {
    icon: "git-merge",
    title: "Automatic Merkle DAGs",
    text: "Large structures naturally form cryptographic hash trees. Every branch is independently verifiable, every subtree can be shared or validated without the whole. Integrity is structural, not bolted on.",
  },
  {
    icon: "package",
    title: "Bounded Cells",
    text: "No encoded cell exceeds 16KB. This fixed upper bound enables streaming, zero-copy operations, and predictable memory use—while trees of cells can represent data of unlimited size.",
  },
  {
    icon: "shield",
    title: "DoS Resistant",
    text: "Encoding and decoding run in strict O(n) time and space. Invalid encodings are rejected immediately. Malicious payloads cannot trigger superlinear computation—security is guaranteed by the format itself.",
  },
  {
    icon: "layers",
    title: "Partial Data",
    text: "Only transmit what changed. Large structures can be partially shared using cryptographic references to known subtrees—enabling efficient delta synchronisation across the network.",
  },
  {
    icon: "zap",
    title: "High Performance",
    text: "Compact binary encoding, high branching factors, and structural sharing minimise both bandwidth and memory. A 4GB dataset is only six tree levels deep with less than 1% overhead.",
  },
];
