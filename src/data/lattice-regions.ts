export interface LatticeRegion {
  icon: string;
  title: string;
  text: string;
  link: string;
  linkLabel: string;
  external?: boolean;
}

export const regions: LatticeRegion[] = [
  {
    icon: "shield",
    title: "Consensus Lattice",
    text: "Drives a secure, decentralised global state machine using CPoS. Lattice values are Beliefs, shared by peers and merged to achieve Byzantine fault-tolerant consensus. Smart contracts, digital assets, and autonomous actors all operate within this region.",
    link: "/cpos",
    linkLabel: "Explore CPoS",
  },
  {
    icon: "database",
    title: "Data Lattice",
    text: "A decentralised storage network for content-addressable data, owned and managed by its users. Store, read, acquire, and pin arbitrary data. A faster, more efficient evolution of IPFS, built on the Lattice's high-performance architecture.",
    link: "https://docs.convex.world/docs/overview/lattice",
    linkLabel: "Read Docs",
    external: true,
  },
  {
    icon: "hard-drive",
    title: "DLFS",
    text: "The Data Lattice File System extends the Data Lattice into a self-sovereign, replicated file system. Snapshot entire drives with a single hash. Structural sharing means only deltas are stored—Dropbox meets BitTorrent meets IPFS.",
    link: "/dlfs",
    linkLabel: "Explore DLFS",
  },
  {
    icon: "cpu",
    title: "Execution Lattice",
    text: "A planned region for compute tasks performed on a decentralised basis. Job records will define specifications, inputs, outputs, and authorisation, with support for private enclaves, encrypted data, and specialised compute infrastructure.",
    link: "https://docs.convex.world/docs/overview/lattice",
    linkLabel: "Read Docs",
    external: true,
  },
  {
    icon: "network",
    title: "P2P Lattice",
    text: "Powers peer-to-peer communication by solving the challenge of locating participants in a decentralised network. Each node publishes a signed record of how to reach it into a shared registry that peers merge and replicate, with authenticated bootstrap and relays for nodes behind NAT. Kademlia-style routing is planned.",
    link: "https://docs.convex.world/docs/overview/lattice",
    linkLabel: "Read Docs",
    external: true,
  },
];
