export interface TerminalLine {
  type: "command" | "result";
  text: string;
}

export interface TerminalSequence {
  lines: TerminalLine[];
}

export const heroTerminalSequences: TerminalSequence[] = [
  {
    lines: [
      { type: "command", text: "(import convex.fungible :as fun)" },
      { type: "command", text: "(deploy (fun/build-token {:supply 1000000}))" },
      { type: "result", text: "#token:0x8a2f..." },
    ],
  },
  {
    lines: [
      { type: "command", text: "(@convex.fungible/mint MY-TOKEN 500000)" },
      { type: "result", text: "500000" },
      { type: "command", text: "(@convex.fungible/balance MY-TOKEN)" },
      { type: "result", text: "500000" },
    ],
  },
  {
    lines: [
      { type: "command", text: '(def accounts (query (all :users)))' },
      { type: "result", text: "[#addr:0x1a.. #addr:0x2b..]" },
      { type: "command", text: "(count accounts)" },
      { type: "result", text: "2847" },
    ],
  },
];
