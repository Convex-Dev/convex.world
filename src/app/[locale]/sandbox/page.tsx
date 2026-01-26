import { setRequestLocale } from 'next-intl/server';
import Link from "next/link";
import { Zap, Terminal, Database } from "lucide-react";
import ReplSandbox from "@/components/ReplSandbox";

export const metadata = {
  title: "REPL Sandbox | Convex",
  description:
    "Experiment with Convex Lisp in a live environment. Execute expressions, define functions, query state, and observe results in real-time.",
};

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SandboxPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Lattice Background */}
      <div className="lattice-bg" aria-hidden="true">
        <div className="lattice-node lattice-node-1" />
        <div className="lattice-node lattice-node-2" />
        <div className="lattice-node lattice-node-3" />
      </div>

      {/* Hero */}
      <section className="dev-section" >
        <div className="section-header">
          <span className="section-number">// Sandbox</span>
        </div>

        <div className="dev-sandbox-container">
          <ReplSandbox />
          <div className="dev-sandbox-info">
            <h4>Interactive Console</h4>
            <p>
              This sandbox connects to the Convex testnet. Execute Lisp expressions,
              define functions, query state, and observe Juice costs in real-time.
            </p>
            <ul className="dev-sandbox-features">
              <li>
                <Zap size={14} />
                <span>Real-time Juice cost estimation</span>
              </li>
              <li>
                <Terminal size={14} />
                <span>Full Convex Lisp syntax support</span>
              </li>
              <li>
                <Database size={14} />
                <span>Query global state directly</span>
              </li>
            </ul>
            <p style={{ marginTop: "var(--space-6)", fontSize: "var(--text-sm)", color: "var(--color-text-tertiary)" }}>
              <Link href="/developers" className="text-accent" style={{ textDecoration: "underline" }}>
                ← Back to Developers
              </Link>
            </p>
          </div>
        </div>
      </section>

      <div className="geo-line" aria-hidden="true" />
    </>
  );
}
