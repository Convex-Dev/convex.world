import Image from "next/image";
import Button from "@/components/Button";
import FeatureBoxes from "@/components/FeatureBoxes";

export default function Home() {
  return (
    <main>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <h1>
            Real-time economic systems
          </h1>
          <p>Take advantage of Lattice Technology for decentralised applications</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button href="https://docs.convex.world/docs/intro">Introduction</Button>
            <Button href="https://github.com/Convex-Dev" rightIconSrc="/images/social_github.png" rightIconAlt="Github">
              Contribute
            </Button>
          </div>
        </div>

        <FeatureBoxes />

        <div className="text-center">
          <h3 className="text-3xl font-bold text-convex-dark-blue mb-6">Ready to Get Started?</h3>
          <p className="text-lg text-convex-medium-blue mb-8">
            Explore our comprehensive <a
              href="https://docs.convex.world"
              className="text-convex-medium-blue hover:text-convex-dark-blue underline"
            >documentation</a> and join the Convex <a
            href="https://discord.com/invite/xfYGq4CT7v"
            className="text-convex-medium-blue hover:text-convex-dark-blue underline"
          >community.</a>
          </p>
        </div>
      </div>
    </main>
  );
}
