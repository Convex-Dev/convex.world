import Card from "@/components/Card";
import Hex from "@/components/Hex";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Demo() {
  return (
    <>
      <Navigation />
      <main>
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
      </main>
      <Footer />
    </>
  );
}
