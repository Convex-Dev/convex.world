import Card from "@/components/Card";
import Hex from "@/components/Hex";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ConvexProvider } from "@/contexts/ConvexContext";
import { WalletProvider } from "@/contexts/WalletContext";

export default function Demo() {
  return (
    <>
      <Navigation />
      <main>
        <WalletProvider persistKey="convex.world:wallet">
          <ConvexProvider>
            <div className="container" style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="hero-section">
                <h1>Demo</h1>
              </div>

              <Card>
                <h2>Hex Component Example</h2>
                
                <Hex>
                  <span style={{ fontSize: '2rem' }}>★</span>
                </Hex>
              </Card>
            </div>
          </ConvexProvider>
        </WalletProvider>
      </main>
      <Footer />
    </>
  );
}
