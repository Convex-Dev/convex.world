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
    link: "https://docs.convex.world/docs/overview/lattice",
    linkLabel: "Read Docs",
    external: true,
  },
  {
    icon: "cpu",
    title: "Execution Lattice",
    text: "Specifies compute tasks to be performed on a decentralised basis. Job records define specifications, inputs, outputs, and authorisation. Supports private enclaves, encrypted data, and specialised compute infrastructure.",
    link: "https://docs.convex.world/docs/overview/lattice",
    linkLabel: "Read Docs",
    external: true,
  },
  {
    icon: "network",
    title: "P2P Lattice",
    text: "Powers peer-to-peer communication by solving the challenge of locating participants in a decentralised network. Operates like Kademlia—peers store metadata only for nearby peers in cryptographic space, making it highly efficient and fault-tolerant.",
    link: "https://docs.convex.world/docs/overview/lattice",
    linkLabel: "Read Docs",
    external: true,
  },
];
