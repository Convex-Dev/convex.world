import Image from "next/image";
import Button from "@/components/Button";
import FeatureBoxes from "@/components/FeatureBoxes";

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="hero-section">
          <h1>
            Real-time economic systems
          </h1>
          <p>Lattice Technology for decentralised applications</p>
          <div className="button-group">
            <Button href="https://docs.convex.world/docs/intro">Introduction</Button>
            <Button href="https://github.com/Convex-Dev" rightIconSrc="/images/social_github.png" rightIconAlt="Github">
              Contribute
            </Button>
          </div>
        </div>

        <FeatureBoxes />
      </div>
    </main>
  );
}
