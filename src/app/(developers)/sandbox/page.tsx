import Link from "next/link";
import { Zap, Terminal, Database, MonitorSmartphone, ArrowUpRight } from "lucide-react";
import ReplSandbox from "@/components/ReplSandbox";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import StructuredData from "@/lib/structured-data";
import { ConvexProvider } from "@/contexts/ConvexContext";
import { WalletProvider } from "@/contexts/WalletContext";

export const metadata = {
  title: "REPL Sandbox",
  description:
    "Experiment with Convex Lisp in a live environment. Execute expressions, define functions, query state, and observe results in real-time.",
};

export default function SandboxPage() {
  return (
    <>
      <Navigation />
      <main className="page-content">
        <WalletProvider persistKey="convex.world:wallet">
          <ConvexProvider>
            <div className="lattice-bg" aria-hidden="true" />

            <section className="content-section">
              <span className="section-number" style={{ marginBottom: 'var(--space-4)' }}>// Sandbox</span>

              <div className="dev-sandbox-container">
                <ReplSandbox />
                <div className="dev-sandbox-sidebar">
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
                  <a
                    href="https://docs.convex.world/docs/products/convex-desktop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sandbox-desktop-cta"
                  >
                    <MonitorSmartphone size={20} strokeWidth={1.5} className="sandbox-desktop-cta-icon" />
                    <span className="sandbox-desktop-cta-content">
                      <span className="sandbox-desktop-cta-label">Convex Desktop</span>
                      <span className="sandbox-desktop-cta-desc">Full desktop client for power users</span>
                    </span>
                    <ArrowUpRight size={14} className="sandbox-desktop-cta-arrow" />
                  </a>
                </div>
              </div>
            </section>

            <div className="geo-line" aria-hidden="true" />
          </ConvexProvider>
        </WalletProvider>
      </main>
      <Footer />
      <StructuredData type="WebApplication" metadata={metadata} path="/sandbox/" />
    </>
  );
}
