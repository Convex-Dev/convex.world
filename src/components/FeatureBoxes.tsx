import React from 'react';
import Image from 'next/image';

interface FeatureBox {
  title: string;
  description: string;
}

const features: FeatureBox[] = [
  {
    title: "Scalable Decentralised Consensus",
    description: "Engineer robust, high-throughput economic systems with our cutting-edge Consensus Proof-of-Stake (CPoS) mechanism, optimized for unparalleled scalability, security, and energy efficiency.",
  },
  {
    title: "Expressive Smart Contracts",
    description: "Craft and deploy secure, composable smart contracts using our Lambda Calculus-based programming model, designed for developer flexibility and robust on-chain logic.",
  },
  {
    title: "Powerful Developer Ecosystem",
    description: "Accelerate your Web3 projects with our comprehensive toolkit: intuitive CLI, feature-rich SDKs, and detailed documentation for seamless integration and deployment.",
  },
  {
    title: "Vibrant Community Governance",
    description: "Shape the future of decentralised innovation by joining our global network of developers, validators, and contributors driving open-source Web3 solutions.",
  },
];

export default function FeatureBoxes() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      {features.map((feature, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-convex-sky-blue">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-semibold text-convex-dark-blue">{feature.title}</h3>
            <Image
              src="/images/logo_dark_blue.svg"
              alt="Convex Logo"
              width={70}
              height={40}
              className="ml-4"
            />
          </div>
          <p className="description-text">{feature.description}</p>
        </div>
      ))}
    </div>
  );
} 