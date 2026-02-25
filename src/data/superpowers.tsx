import type { Metadata } from "next";
import React, { type ReactNode } from "react";
import type { IconKey } from "@/lib/icons";

export interface SuperpowerDocLink {
  label: string; /* Title of link */
  href: string; /* URL of link */
  description?: string; /* One-line description of link */
}

export interface SuperpowerPage {
  tag: string; /* Topical tag displayed above hero */
  heroTitle: string; /* Main hero title, displayed in large letters */
  heroAccent?: string; /* Secondary hero title in accent colour */
  description: string; /* Inspirational hero description, displayed below the title */
  highlights: { label: string; value: string }[];
  docs?: SuperpowerDocLink[]; /* List of documentation links, displayed below content */
}

interface SuperpowerEntry {
  title: string; /* Short snappy title, used for navigation e.g. front page hexes */
  desc: string; /* Short description, used for menu descriptions */
  href: string; /* Primary internal href for the page */
  category: "overview" | "infrastructure" | "economy" | "platform";
  icon: IconKey;
  external?: boolean; /* External, link will open in a new tab */
  metadata?: Metadata; /* Metadata for the page, used for SEO */
  page?: SuperpowerPage; /* Page-specific content */
}

export const superpowers: SuperpowerEntry[] = [
  {
    title: "Vision",
    desc: "Building open economies for all",
    href: "/vision",
    category: "overview",
    icon: "globe",
    metadata: {
      title: "Vision — Convex",
      description: "Building open economies for all. The public, decentralised foundation for real-time exchange of data and value.",
    },
    page: {
      tag: "// Vision",
      heroTitle: "Building open",
      heroAccent: "economies for all",
      description: "Convex is a public, decentralized foundation for real-time coordination of data and value—enabling open participation and shared outcomes at global scale.",
      highlights: [
        { label: "Superpowers", value: "17" },
        { label: "Open Source", value: "100%" },
        { label: "Non-Profit", value: "✓" },
      ],
    },
  },
  {
    title: "Data Lattice",
    desc: "Global, replicated, self-healing, content-addressable data fabric",
    href: "/lattice",
    category: "infrastructure",
    icon: "database",
    metadata: {
      title: "Data Lattice — Convex",
      description: "A global, replicated, self-healing, content-addressable data fabric built on lattice technology and CRDTs.",
    },
    page: {
      tag: "// Core Technology",
      heroTitle: "The Data",
      heroAccent: "Lattice",
      description: "A boundless, self-healing fabric of decentralised data on a true self-sovereign, P2P network.",
      highlights: [
        { label: "Replication", value: "CRDT" },
        { label: "Fees", value: "Zero" },
        { label: "Scale", value: "∞" },
      ],
    },
  },
  {
    title: "Lattice CRDTs",
    desc: "Replicated, self-healing, off-chain application backends with lattice technology",
    href: "/crdts",
    category: "infrastructure",
    icon: "git-merge",
    metadata: {
      title: "Lattice CRDTs — Convex",
      description: "Conflict-free Replicated Data Types that power self-healing, eventually consistent data across the Convex lattice.",
    },
    page: {
      tag: "// Infrastructure",
      heroTitle: "Lattice",
      heroAccent: "CRDTs",
      description: "Conflict-free Replicated Data Types form the mathematical foundation of the Convex lattice. Data converges automatically across peers with no coordination overhead.",
      highlights: [
        { label: "Convergence", value: "Auto" },
        { label: "Conflicts", value: "Zero" },
        { label: "Coordination", value: "None" },
      ],
      docs: [
        { label: "CAD — Data Lattice", href: "https://docs.convex.world/docs/cad/data_lattice", description: "Specification for lattice-based CRDTs" },
        { label: "Lattice Technology Overview", href: "https://docs.convex.world/docs/overview/lattice", description: "High-level introduction to lattice technology" },
      ],
    },
  },
  {
    title: "CPoS",
    desc: "Realtime convergent consensus algorithm for shared global state: faster than any blockchain",
    href: "/cpos",
    category: "infrastructure",
    icon: "shield",
    metadata: {
      title: "Convergent Proof of Stake — Convex",
      description: "The world's fastest decentralised consensus algorithm. CPoS operates as a CRDT, not a blockchain, with sub-second finality.",
    },
    page: {
      tag: "// Consensus",
      heroTitle: "Convergent",
      heroAccent: "Proof of Stake",
      description: "The world's fastest consensus algorithm for a global state machine. CPoS operates as a CRDT, not a blockchain, solving the scalability trilemma.",
      highlights: [
        { label: "Finality", value: "<1s" },
        { label: "BFT Threshold", value: "⅔" },
        { label: "Energy Cost", value: "~0" },
        { label: "Block Delay", value: "Zero" }
      ],
    },
  },
  {
    title: "Convex Virtual Machine",
    desc: "High performance execution for smart contracts and trusted assets",
    href: "/vm",
    category: "infrastructure",
    icon: "cpu",
    metadata: {
      title: "Convex Virtual Machine — Convex",
      description: "A deterministic, Turing-complete virtual machine built on the lambda calculus for high-performance smart contract execution.",
    },
    page: {
      tag: "// Execution",
      heroTitle: "Virtual",
      heroAccent: "Machine",
      description: "A deterministic runtime built on the lambda calculus. Turing-complete smart contracts, on-chain compilation, and the full power of functional programming.",
      highlights: [
        { label: "State Model", value: "Global" },
        { label: "Deterministic", value: "✓" },
        { label: "Transactions", value: "Atomic" },
        { label: "Compute TPS", value: "1 million+" },
      ],
      docs: [
        { label: "CAD — CVM Execution", href: "https://docs.convex.world/docs/cad/cvmex", description: "Execution model and instruction set" },
        { label: "CAD — Convex Lisp", href: "https://docs.convex.world/docs/cad/lisp", description: "The smart contract language" },
        { label: "Architecture Concepts", href: "https://docs.convex.world/docs/overview/concepts", description: "How the CVM fits the full stack" },
      ],
    },
  },
  {
    title: "DLFS",
    desc: "Distributed filesystems on the lattice: Dropbox meets BitTorrent meets IPFS",
    href: "/dlfs",
    category: "infrastructure",
    icon: "hard-drive",
    metadata: {
      title: "DLFS — Convex",
      description: "Decentralised Lattice File System — distributed, content-addressable file storage built on the Convex lattice.",
    },
    page: {
      tag: "// Storage",
      heroTitle: "Decentralised Lattice",
      heroAccent: "File System",
      description: "A distributed file system built on the lattice. Content-addressable, cryptographically verified, and infinitely scalable — like Dropbox meets BitTorrent meets IPFS.",
      highlights: [
        { label: "Addressing", value: "Content" },
        { label: "Verification", value: "Crypto" },
        { label: "Scale", value: "∞" },
      ],
      docs: [
        { label: "CAD — DLFS", href: "https://docs.convex.world/docs/cad/dlfs", description: "DLFS specification and design" },
        { label: "CAD — Encoding", href: "https://docs.convex.world/docs/cad/encoding", description: "CAD3 data format underpinning DLFS" },
      ],
    },
  },
  {
    title: "CAD3 Data",
    desc: "Revolutionary encoding format for self-replicated, cryptographically verified data",
    href: "/cad3",
    category: "infrastructure",
    icon: "file-code",
    metadata: {
      title: "CAD3 Data — Convex",
      description: "A universal encoding format for cryptographically verified, self-describing, content-addressable data structures.",
    },
    page: {
      tag: "// Data Format",
      heroTitle: "CAD3",
      heroAccent: "Data",
      description: "A universal encoding format for cryptographically verified, self-describing data. Every value is content-addressable, every structure is self-replicating.",
      highlights: [
        { label: "Addressing", value: "Content" },
        { label: "Self-Describing", value: "✓" },
        { label: "Verification", value: "SHA-256" },
      ],
      docs: [
        { label: "CAD — Encoding", href: "https://docs.convex.world/docs/cad/encoding", description: "Full CAD3 encoding specification" },
        { label: "CAD — Data Lattice", href: "https://docs.convex.world/docs/cad/data_lattice", description: "How CAD3 underpins lattice replication" },
      ],
    },
  },
  {
    title: "Convex Coin",
    desc: "A utility token for global state transactions with fair economics",
    href: "/coin",
    category: "economy",
    icon: "coins",
    metadata: {
      title: "Convex Coin (CVM)",
      description: "The native utility token powering the Convex decentralised execution engine. 1B max supply, fair release curve, zero read fees.",
    },
    page: {
      tag: "// Economy",
      heroTitle: "Convex",
      heroAccent: "Coin",
      description: "The native utility token powering the world's most efficient decentralised execution engine.",
      highlights: [
        { label: "Max Supply", value: "1B" },
        { label: "Coppers per Coin", value: "10⁹" },
        { label: "Read Fees", value: "0" },
      ],
    },
  },
  {
    title: "Digital Assets",
    desc: "Create fungible tokens, NFTs, and complex financial instruments in a single expression",
    href: "/assets",
    category: "economy",
    icon: "gem",
    metadata: {
      title: "Digital Assets — Convex",
      description: "Create fungible tokens, NFTs, and complex financial instruments in a single Convex Lisp expression.",
    },
    page: {
      tag: "// Economy",
      heroTitle: "Digital",
      heroAccent: "Assets",
      description: "Create fungible tokens, NFTs, and complex financial instruments in a single expression. The Convex asset model makes digital ownership simple, composable, and secure.",
      highlights: [
        { label: "Fungible", value: "✓" },
        { label: "Non-Fungible", value: "✓" },
        { label: "Composable", value: "✓" },
      ],
      docs: [
        { label: "CAD — Assets", href: "https://docs.convex.world/docs/cad/assets", description: "Digital asset model and standards" },
        { label: "CAD — Fungible Tokens", href: "https://docs.convex.world/docs/cad/fungible", description: "Fungible token interface" },
        { label: "CAD — Torus DEX", href: "https://docs.convex.world/docs/cad/torus", description: "Automated market maker for trading assets" },
      ],
    },
  },
  {
    title: "Memory Accounting",
    desc: "Global memory as a digital asset: incentives for efficient use and recycling",
    href: "/memory",
    category: "economy",
    icon: "gauge",
    metadata: {
      title: "Memory Accounting — Convex",
      description: "Global on-chain memory as a digital asset with built-in incentives for efficient use and recycling.",
    },
    page: {
      tag: "// Economics",
      heroTitle: "Memory",
      heroAccent: "Accounting",
      description: "On-chain memory as a tradeable digital asset. Natural incentives for efficient use — no artificial gas limits.",
      highlights: [
        { label: "Memory", value: "Tradeable" },
        { label: "Recycling", value: "Incentivised" },
        { label: "Gas Limits", value: "Zero" },
      ],
      docs: [
        { label: "CAD — Memory Accounting", href: "https://docs.convex.world/docs/cad/memory", description: "Memory pricing and accounting model" },
        { label: "CAD — Tokenomics", href: "https://docs.convex.world/docs/cad/tokenomics", description: "Economic model and incentive design" },
      ],
    },
  },
  {
    title: "One Line DeFi",
    desc: "Execute powerful, end-to-end economic transactions with one command",
    href: "/defi",
    category: "economy",
    icon: "terminal",
    metadata: {
      title: "One Line DeFi — Convex",
      description: "Execute powerful, end-to-end decentralised finance transactions with a single Convex Lisp expression via the Torus DEX.",
    },
    page: {
      tag: "// DeFi",
      heroTitle: "One Line",
      heroAccent: "DeFi",
      description: "Execute powerful, end-to-end economic transactions with a single command. The Torus automated market maker turns complex DeFi operations into one-liners.",
      highlights: [
        { label: "Swaps", value: "1 Line" },
        { label: "Liquidity", value: "AMM" },
        { label: "Slippage", value: "Protected" },
      ],
      docs: [
        { label: "CAD — Torus DEX", href: "https://docs.convex.world/docs/cad/torus", description: "Torus automated market maker specification" },
        { label: "CAD — Fungible Tokens", href: "https://docs.convex.world/docs/cad/fungible", description: "Fungible token interface used by Torus" },
        { label: "CAD — Assets", href: "https://docs.convex.world/docs/cad/assets", description: "Digital asset model" },
      ],
    },
  },
  {
    title: "CNS",
    desc: "A global, content-addressable name service for decentralised applications",
    href: "/cns",
    category: "economy",
    icon: "at-sign",
    metadata: {
      title: "Convex Name Service — Convex",
      description: "A global, hierarchical name service for actors, data, and services on the Convex network.",
    },
    page: {
      tag: "// Naming",
      heroTitle: "Convex",
      heroAccent: "Name Service",
      description: "A global, hierarchical name service for actors, data, and services. CNS gives human-readable names to on-chain resources — like DNS for the decentralised world.",
      highlights: [
        { label: "Hierarchical", value: "✓" },
        { label: "On-Chain", value: "✓" },
        { label: "Resolution", value: "Instant" },
      ],
      docs: [
        { label: "CAD — CNS", href: "https://docs.convex.world/docs/cad/cns", description: "Convex Name Service specification" },
        { label: "CAD — Actors", href: "https://docs.convex.world/docs/cad/actors", description: "Smart contract model used with CNS" },
      ],
    },
  },
  {
    title: "DID Identity",
    desc: "Decentralised identity for users, autonomous agents and digital assets",
    href: "/dids",
    category: "economy",
    icon: "fingerprint",
    metadata: {
      title: "Decentralised Identifiers — Convex",
      description: "W3C-compatible decentralised identifiers for users, autonomous agents, and digital assets on the Convex network.",
    },
    page: {
      tag: "// Identity",
      heroTitle: "Decentralised",
      heroAccent: "Identifiers",
      description: "W3C-compatible decentralised identity for users, autonomous agents, and digital assets. Self-sovereign identity with no central authority.",
      highlights: [
        { label: "Standard", value: "W3C DID" },
        { label: "Sovereign", value: "✓" },
        { label: "Agents", value: "Supported" },
      ],
      docs: [
        { label: "CAD — DIDs", href: "https://docs.convex.world/docs/cad/did", description: "Decentralised identifier specification" },
        { label: "CAD — Accounts", href: "https://docs.convex.world/docs/cad/accounts", description: "Account model and key management" },
      ],
    },
  },
  {
    title: "Convex Lisp",
    desc: "Powerful, expressive functional programming with the lambda calculus: code is data",
    href: "/lisp",
    category: "platform",
    icon: "code",
    metadata: {
      title: "Convex Lisp — Convex",
      description: "A powerful, expressive smart contract language based on the lambda calculus. Code is data, compilation is on-chain.",
    },
    page: {
      tag: "// Language",
      heroTitle: "Convex",
      heroAccent: "Lisp",
      description: "A powerful, expressive functional programming language based on the lambda calculus. Code is data, compilation happens on-chain, and the full power of Lisp is available to both humans and agents.",
      highlights: [
        { label: "Paradigm", value: "Functional" },
        { label: "Compilation", value: "On-Chain" },
        { label: "Code = Data", value: "✓" },
      ],
      docs: [
        { label: "CAD — Convex Lisp", href: "https://docs.convex.world/docs/cad/lisp", description: "Language specification and reference" },
        { label: "Convex Lisp Tutorial", href: "https://docs.convex.world/docs/tutorial/convex-lisp", description: "Learn the language step by step" },
        { label: "CAD — CVM Execution", href: "https://docs.convex.world/docs/cad/cvmex", description: "How code executes on the CVM" },
      ],
    },
  },
  {
    title: "Live Compiler",
    desc: "Dynamic on-chain compilation with no external toolchains, no build pipelines: perfect for agentic systems",
    href: "/sandbox",
    category: "platform",
    icon: "zap",
  },
  {
    title: "Agentic Economy",
    desc: "All the power of the lattice with agentic tools using the Model Context Protocol",
    href: "/ai",
    category: "platform",
    icon: "bot",
    metadata: {
      title: "Agentic Economy — Convex",
      description: "The open network where autonomous agents are first-class economic participants. Built-in MCP, programmable accounts, and a live Lisp compiler.",
    },
    page: {
      tag: "// Platform",
      heroTitle: "Agentic Economy",
      description: "Agents are first-class economic participants on Convex - able to transact, agree and settle contracts in realtime.",
      highlights: [
        { label: "Native", value: "MCP" },
        { label: "Accounts", value: "Programmable" },
        { label: "Identity", value: "DID" },
      ],
    },
  },
  {
    title: "Open Source",
    desc: "Fully open-source, developer-friendly",
    href: "/open-source",
    category: "platform",
    icon: "github",
    metadata: {
      title: "Open Source — Convex",
      description: "Convex is fully open-source. Inspect, audit, fork, and contribute to the decentralised lattice platform.",
    },
    page: {
      tag: "// Platform",
      heroTitle: "Open",
      heroAccent: "Source",
      description: "The entire Convex stack is open source. Inspect every line, audit every algorithm, fork and build your own. Transparency is not optional — it is foundational.",
      highlights: [
        { label: "Licence", value: "Open" },
        { label: "Auditable", value: "100%" },
        { label: "Contributors", value: "Welcome" },
      ],
      docs: [
        { label: "Convex on GitHub", href: "https://github.com/Convex-Dev", description: "All Convex repositories" },
        { label: "Convex Core", href: "https://github.com/Convex-Dev/convex", description: "The core lattice platform" },
        { label: "Documentation", href: "https://docs.convex.world", description: "Comprehensive guides and references" },
      ],
    },
  },
  {
    title: "Non-Profit",
    desc: "Governed by a non-profit foundation, built for public benefit in the age of AI",
    href: "/foundation",
    category: "platform",
    icon: "heart",
    metadata: {
      title: "Non-Profit Foundation — Convex",
      description: "Convex is governed by a non-profit foundation, built for public benefit — not venture capital returns.",
    },
    page: {
      tag: "// Governance",
      heroTitle: "Non-Profit",
      heroAccent: "Foundation",
      description: "Convex is governed by a non-profit foundation, built for public benefit in the age of AI. No VCs, no power brokers, no centralised control — just technology for the common good.",
      highlights: [
        { label: "Structure", value: "Non-Profit" },
        { label: "VC Funding", value: "None" },
        { label: "Purpose", value: "Public Good" },
      ],
      docs: [
        { label: "Governance Model", href: "https://docs.convex.world/docs/overview/governance", description: "Foundation structure and governance" },
        { label: "Manifesto", href: "https://docs.convex.world/docs/overview/manifesto", description: "The principles guiding Convex" },
        { label: "Whitepaper", href: "https://docs.convex.world/docs/overview/convex-whitepaper", description: "Full technical and economic vision" },
      ],
    },
  },
];

/**
 * Look up Next.js page metadata for an internal superpower page by its href.
 * Falls back to the entry's title and desc if no metadata field is present.
 */
export function getSuperpowerMetadata(href: string): Metadata {
  const entry = superpowers.find((sp) => sp.href === href);
  if (!entry) throw new Error(`No superpower entry for href "${href}"`);
  if (entry.metadata) return entry.metadata;
  return { title: entry.title, description: entry.desc };
}

/**
 * Look up hero-level page content for an internal superpower page.
 */
export function getSuperpowerPage(href: string): SuperpowerPage {
  const entry = superpowers.find((sp) => sp.href === href);
  if (!entry || !entry.page) {
    throw new Error(`No superpower page data for href "${href}"`);
  }
  return entry.page;
}

/**
 * Build the hero title JSX from a SuperpowerPage's heroTitle and optional heroAccent.
 */
export function buildHeroTitle(page: SuperpowerPage): ReactNode {
  if (!page.heroAccent) return page.heroTitle;
  return (
    <>
      {page.heroTitle}
      <br />
      <span className="hero-accent">{page.heroAccent}</span>
    </>
  );
}
