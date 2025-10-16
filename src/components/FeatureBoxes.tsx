import React from 'react';

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
    title: "Developer Ecosystem",
    description: "Accelerate your Web3 projects with our comprehensive toolkit: intuitive CLI, feature-rich SDKs, and detailed documentation for seamless integration and deployment.",
  },
  {
    title: "Community Governance",
    description: "Shape the future of decentralised innovation by joining our global network of developers, validators, and contributors driving open-source Web3 solutions.",
  },
];

export default function FeatureBoxes() {
  return (
    <section>
      <div className="tools-grid">
        {features.map((feature, index) => (
          <article key={index} className="card">
            <header>
              <h3>{feature.title}</h3>
            </header>
            <p className="description-text">{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}