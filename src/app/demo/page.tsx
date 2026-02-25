import Card from "@/components/Card";
import Hex from "@/components/Hex";
import LiveInspector from "@/components/LiveInspector";
import ResourceGauges from "@/components/ResourceGauges";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ConvexProvider } from "@/contexts/ConvexContext";
import { WalletProvider } from "@/contexts/WalletContext";

export default function Demo() {
  return (
    <>
      <Navigation />
      <main className="page-content">
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="hero-section">
                <h1>Demo</h1>
              </div>

              <Card>
                <h2>Hex Component Example</h2>

                <Hex>
                  <span style={{ fontSize: '2rem' }}>★</span>
                </Hex>
              </Card>

              <WalletProvider persistKey="convex.world:wallet">
                <ConvexProvider>
                  <section className="inspector-section">
                    <div className="section-header">
                      <span className="section-number">// Observe</span>
                      <h2>Inspect Live State</h2>
                      <p>Direct instrumentation into the global consensus</p>
                    </div>
                    <div className="live-tools-grid">
                      <LiveInspector />
                      <ResourceGauges />
                    </div>
                  </section>
                </ConvexProvider>
              </WalletProvider>
            </div>
      </main>
      <Footer />
    </>
  );
}
