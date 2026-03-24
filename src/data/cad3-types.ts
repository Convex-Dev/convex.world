export interface Cad3TypeCategory {
  title: string;
  text: string;
}

export const typeCategories: Cad3TypeCategory[] = [
  {
    title: "Primitives",
    text: "Integers of arbitrary size, IEEE 754 doubles, booleans, nil, and Unicode characters — all with compact, canonical binary representations.",
  },
  {
    title: "Text & Binary",
    text: "UTF-8 strings, raw binary blobs, symbolic names, and keywords. Small values embed directly; large values form balanced trees that scale without limit.",
  },
  {
    title: "Collections",
    text: "Vectors, lists, hash maps, sets, and ordered indexes — all immutable, structurally shared, and content-addressable. O(log n) updates with automatic Merkle verification.",
  },
  {
    title: "Cryptographic Values",
    text: "First-class Ed25519 signed values and content-addressed references. Digital signatures and hash-linked pointers are native to the format, not an afterthought.",
  },
  {
    title: "Smart Contracts & Code",
    text: "CVM bytecode, transactions, and the entire global state are encoded in CAD3. Code is data. The same format that stores a number stores a program.",
  },
  {
    title: "Application-Defined",
    text: "Sparse records, coded values, and extension types let applications define their own semantics while remaining fully compatible with the CAD3 ecosystem.",
  },
];
