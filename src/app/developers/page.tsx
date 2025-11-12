import Card from "@/components/Card";
import Button from "@/components/Button";
import Code from "@/components/Code";

export default function Developer() {
  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div className="hero-section">
        <h1>Developers</h1>
        <p>
          Build intelligent, open economic systems on Convex. Tap into a unified fabric for compute, data,
          and value—purpose-built for humans and AI to coordinate and create.
        </p>
      </div>

      <Card>
        <h2>Convex Virtual Machine</h2>
        <p>
          The CVM is a deterministic, high-performance decentralised runtime engine that manages a 
          trusted global state - suitable for public smart contracts, digital assets, autonomous agents,
          trust registries and more.
        </p>
        <ul>
          <li>Turing Complete</li>
          <li>Executes 1m+ transactions per second</li>
          <li>100% green, energy-efficient operation</li>
          <li>Integrated on-chain compiler (Convex Lisp)</li> 
        </ul>
      </Card>

      <Card>
        <h2>Convex Lisp</h2>
        <p>
          We needed a programming language that powerful, easy to use and 
          well-suited to the development of dynamic, composable economic systems.
          </p>
        <p> So we created Convex Lisp, a modern Lisp dialect inspired by 
          <a href="https://clojure.org" target="_blank" rel="noopener noreferrer"> Clojure</a>,
          because we want to be able to write code that is powerful and easy to understand 
          (for humans and AI agents alike). We want to be able to write code like this, and have it execute reliably on the CVM with no extra complexity or tooling:
        </p>
        <Code language="lisp">
          (if (trusted? entity) (transfer entity digital-asset))
        </Code>
        <p>
          We&apos;ve pioneered the concept of <b>One Line DeFi</b> - a single line of code can represent a complex economic transaction.
        </p>
        <p>
          If you&apos;re curious about Lisp, a good essay to read is{" "}
          <a href="https://paulgraham.com/avg.html" target="_blank" rel="noopener noreferrer">
            &ldquo;Beating the Averages&rdquo; by Paul Graham
          </a>{" "}
          - it&apos;s a great introduction to the power of Lisp and why it is a competitive advantage.
        </p>
      </Card>

      <Card>
        <h2>Lattice Data</h2>
        <p>
        One global data structure.
        Billions of writers. Trillions of readers. Zero centralised infrastructure.
        </p>
        <p className="description-text">
          Lattice technology gives every project a deterministic data fabric. Persist state, stream events, and share
          knowledge between services without bolting together custom databases or message queues.
        </p>
      </Card>

      <Card>
        <h2>Start building with Convex</h2>
        <p className="description-text">
          Explore the architecture, SDKs, and reference projects that power the Convex ecosystem. From smart contracts
          and agent coordination to deterministic data flows, the docs walk you through every layer of the stack.
        </p>
        <p className="description-text">
          Whether you are prototyping a new protocol, building an AI-native marketplace, or integrating with existing
          systems, Convex gives you the tooling to design resilient, scalable experiences.
        </p>
        <Button href="https://docs.convex.world" target="_blank" rel="noopener noreferrer">
          Read the Convex Docs
        </Button>
      </Card>
    </div>
  );
}

