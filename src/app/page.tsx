import Image from "next/image";
import FeatureBoxes from "@/components/FeatureBoxes";

export default function Home() {
  return (
    <main>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4">
          <p className="text-xl text-convex-medium-blue mb-6">
            The engine for decentralised economic systems
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="https://docs.convex.world/docs/intro"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-convex-dark-blue text-white hover:bg-convex-medium-blue transition-colors"
            >
              Introduction
            </a>
            <a
              href="https://github.com/Convex-Dev"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md bg-convex-dark-blue text-white hover:bg-convex-medium-blue transition-colors"
            >
              Contribute 
              <Image 
                src="/images/social_github.png" 
                alt="Github" 
                width={16} 
                height={16} 
                className="m-2"
              />
            </a>
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
