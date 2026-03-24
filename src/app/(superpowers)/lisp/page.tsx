import SuperpowerPage from "@/components/SuperpowerPage";
import SectionHeader from "@/components/SectionHeader";
import CtaSection from "@/components/CtaSection";
import CodeBlock from "@/components/CodeBlock";
import { getSuperpowerMetadata } from "@/data/superpowers";

export const metadata = getSuperpowerMetadata("/lisp");

const HELLO_EXAMPLE = `
;; Define a pure function
(defn greet [name]
  (str "Hello, " name "!"))

(greet "world")
;; => "Hello, world!"
`;

const DATA_EXAMPLE = `
;; All data is immutable — "updates" return new values
(let [accounts {:alice 1000 :bob 500}
      updated  (assoc accounts :carol 750)]
  updated)
;; => {:alice 1000, :bob 500, :carol 750}

;; The original is unchanged — always
`;

const ACTOR_EXAMPLE = `
;; Deploy an actor (smart contract) — just data
(def my-token
  (deploy
    '(do
       (def supply 1000000)

       (defn balance ^{:callable true} [addr]
         (or (get holdings addr) 0))

       (defn transfer ^{:callable true} [to amount]
         (let [from *caller*]
           (assert (<= amount (balance from)))
           (set! holdings
             (assoc holdings
               from (- (balance from) amount)
               to   (+ (balance to) amount))))))))
`;

const MACRO_EXAMPLE = `
;; Macros operate on code as data — at compile time
(defmacro when-positive [x & body]
  \`(let [v# ~x]
     (when (> v# 0) ~@body)))

;; The compiler expands this before execution
(when-positive balance
  (transfer recipient balance))
`;

export default function ConvexLisp() {
  return (
    <SuperpowerPage href="/lisp">
      {/* Why Lisp */}
      <section className="vision-section">
        <SectionHeader number="001" title="Why Lisp?" subtitle="The oldest idea in programming turns out to be the best one for smart contracts" />
        <div className="vision-story">
          <p>
            When we set out to design the language for Convex, we evaluated everything:
            Solidity, Rust, WASM, Python subsets, purpose-built DSLs. None of them
            worked. General-purpose languages carry too much baggage to run
            deterministically. Existing smart contract languages are too restrictive
            to build real economic systems. Low-level targets like WASM lack the
            abstractions you need for productive development.
          </p>
          <p>
            Lisp was the answer — not because it is old, but because its core idea
            has never been improved upon. A Lisp program is made of the same data
            structures that the program manipulates. This single property —
            <strong>homoiconicity</strong> — unlocks everything else: on-chain
            compilation, runtime code generation, powerful macros, and a compiler
            small enough to live inside the virtual machine itself.
          </p>
          <p>
            Convex Lisp draws heavily from <strong>Clojure</strong>, widely
            regarded as one of the best-designed modern programming languages.
            The emphasis on immutable data, functional composition, and
            interactive development translates perfectly to the constraints of a
            decentralised virtual machine — where every value must be
            deterministic, every state change must be verifiable, and every
            program must be safe to run on a shared global computer.
          </p>
          <CodeBlock code={HELLO_EXAMPLE} title="convex lisp" />
        </div>
      </section>

      {/* Immutable Data */}
      <section className="vision-section">
        <SectionHeader number="002" title="Immutable by Default" subtitle="Data that cannot change is data you can trust" />
        <div className="vision-story">
          <p>
            Every data structure in Convex Lisp is <strong>immutable</strong>.
            Vectors, maps, sets, lists, strings — once created, they never
            change. When you &ldquo;update&rdquo; a map, you get a new map back.
            The original remains untouched, forever.
          </p>
          <p>
            This is not a limitation — it is the critical design
            choice that makes decentralised computing possible. Immutable data can
            be freely shared between nodes without locks or coordination. It can
            be cryptographically hashed to produce a stable identity. It can be
            replicated, cached, and verified independently by anyone on the
            network. The entire Convex global state is a single immutable value
            that advances atomically with each transaction.
          </p>
          <p>
            Under the hood, Convex uses <strong>persistent data structures</strong> with
            automatic structural sharing — the same technique pioneered by
            Clojure and made famous by Rich Hickey&apos;s insight that &ldquo;the
            old version of a collection <em>is</em> still there.&rdquo; Updating
            a million-entry map copies only the changed path, not the whole
            structure. This gives you the safety of immutability with the
            performance of mutation.
          </p>
          <p>
            And because every data structure is a <strong>Merkle tree</strong>,
            immutability gives you something no mutable language can: every value
            has a cryptographic fingerprint. Two nodes can compare petabytes of
            state by exchanging a single hash. Integrity is not layered on top —
            it is the structure of the data itself.
          </p>
          <CodeBlock code={DATA_EXAMPLE} title="immutable data" />
        </div>
      </section>

      {/* Code is Data */}
      <section className="vision-section">
        <SectionHeader number="003" title="Code is Data" subtitle="The on-chain compiler and the power of homoiconicity" />
        <div className="vision-story">
          <p>
            In most languages, source code is an opaque string that a
            compiler turns into something the machine understands. In Convex
            Lisp, source code <em>is</em> data — lists, vectors, symbols,
            keywords — the same structures your program works with every day.
            This property, called <strong>homoiconicity</strong>, is what makes
            Lisp fundamentally different from every other language family.
          </p>
          <p>
            Because code is data, the Convex Virtual Machine can include a
            full <strong>on-chain compiler</strong>. Any transaction can
            compile and deploy new code at runtime. Smart contracts can
            generate other smart contracts. Macros can rewrite code at
            expansion time using the full power of the language. No external
            toolchain, no build pipeline, no deployment ceremony — just send
            code to the network and it runs.
          </p>
          <p>
            This is uniquely powerful for <strong>agentic systems</strong>.
            An AI agent can construct a Convex Lisp program as a simple data
            structure, submit it as a transaction, and have it compiled and
            executed atomically on the CVM. There is no intermediate
            representation to manage, no ABI to encode against, no deployment
            step to orchestrate. The gap between intent and execution is a
            single function call.
          </p>
          <p>
            Macros take this further. A macro receives code as data,
            transforms it, and returns new code — all at compile time. This
            lets you extend the language itself: define new control
            structures, build domain-specific languages for financial
            instruments or governance rules, and eliminate boilerplate without
            sacrificing clarity. The macro system follows the
            expansion-passing style of Scheme, giving you hygienic
            transformations with full access to the CVM environment.
          </p>
          <CodeBlock code={ACTOR_EXAMPLE} title="deploying an actor" />
        </div>
      </section>

      {/* Macros & Metaprogramming */}
      <section className="vision-section">
        <SectionHeader number="004" title="Extend the Language" subtitle="Macros, metaprogramming, and domain-specific languages" />
        <div className="vision-story">
          <p>
            Most smart contract languages give you a fixed set of keywords and
            a rigid syntax. Convex Lisp gives you the tools to reshape the
            language around your problem domain. Need a declarative syntax for
            token standards? Write a macro. Want a governance DSL where
            proposals, votes, and execution read like natural language? Write
            a macro. The language bends to fit the domain, not the other way
            around.
          </p>
          <p>
            This is the same power that has made Lisp the language of choice
            for AI research, symbolic computation, and complex system design
            for over sixty years. Paul Graham called it &ldquo;the language
            that keeps getting rediscovered.&rdquo; Rich Hickey built Clojure
            on the insight that immutability and homoiconicity together
            produce programs that are simpler, more reliable, and easier to
            reason about than anything the mainstream offers.
          </p>
          <p>
            Convex Lisp brings this tradition to decentralised computing.
            Every account on the network is a personal Lisp machine with its
            own environment of definitions. The on-chain REPL lets you
            interact with the global state as naturally as a local development
            session. And because the compiler lives on-chain, you can iterate,
            experiment, and deploy without ever leaving the network.
          </p>
          <CodeBlock code={MACRO_EXAMPLE} title="macros" />
        </div>
      </section>

      {/* CTA */}
      <CtaSection
        className="vision-cta"
        heading="h2"
        title="Try it live"
        description="Write and execute Convex Lisp in the interactive sandbox, or explore the full language reference."
        links={[
          { label: "Open Sandbox", href: "/sandbox" },
          { label: "Developer Overview", href: "/developers", variant: "secondary" },
        ]}
      />
    </SuperpowerPage>
  );
}
