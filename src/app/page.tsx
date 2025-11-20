import Button from "@/components/Button";
import FeatureBoxes from "@/components/FeatureBoxes";

export default function Home() {
  return (
    <main>
      <div className="container">
        <div className="hero-section">
          <h3>
            Intelligent, open economic systems
          </h3>
          <p>
            Convex unifies compute, data, and value into a  global fabric 
            - enabling humans and AI agents to coordinate, transact, and build intelligent 
            economies.
          </p>
        </div>

        <FeatureBoxes />
      </div>
      <div className="button-group">
            <Button href="https://docs.convex.world/docs/intro">Introduction</Button>
            <Button href="https://github.com/Convex-Dev" rightIconSrc="/images/social_github.png" rightIconAlt="Github">
              Contribute
            </Button>
          </div>
    </main>
  );
}
