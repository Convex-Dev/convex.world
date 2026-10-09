export interface TerminalLine {
  type: "command" | "result";
  text: string;
}

export interface TerminalSequence {
  lines: TerminalLine[];
}

// Each sequence continues from the previous one in the same session.
// Commands and results are real: verified together as one combined query
// against the Convex testnet (addresses and counts reflect the state at the time).
export const heroTerminalSequences: TerminalSequence[] = [
  {
    lines: [
      { type: "command", text: "(def fun @convex.fungible)" },
      { type: "result", text: "#64" },
      { type: "command", text: "(def my-token (deploy (fun/build-token {:supply 1000000})))" },
      { type: "result", text: "#133" },
    ],
  },
  {
    lines: [
      { type: "command", text: "(fun/transfer my-token #13 250000)" },
      { type: "result", text: "250000" },
      { type: "command", text: "(fun/balance my-token)" },
      { type: "result", text: "750000" },
    ],
  },
  {
    lines: [
      { type: "command", text: "(fun/balance my-token #13)" },
      { type: "result", text: "250000" },
      { type: "command", text: "(count (:accounts *state*))" },
      { type: "result", text: "134" },
    ],
  },
];
