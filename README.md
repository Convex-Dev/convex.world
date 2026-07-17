# Convex.World Static Website

This is the statically exported website for [Convex](https://convex.world), a decentralised network and execution engine based on Lattice Technology. It is built with Next.js and deployed to GitHub Pages.

## About Convex

Convex is a decentralised network and execution engine for the Internet of Value, implementing a "Stateful Internet" where the network itself securely hosts and executes code and data. Key features include:

- Lattice Technology for efficient consensus and verifiability
- Global State model with immutable data structures and atomic transactions
- Lambda Calculus based VM supporting Turing complete Smart Contracts
- High transaction throughput with low latency
- 100% Green using Convergent Proof of Stake consensus
- Integrated on-chain compiler (Convex Lisp)

## Development

Install dependencies and run the development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Before submitting a change, run the repository checks:

```bash
pnpm lint
pnpm test
pnpm build
```

The production build is a static export written to `out/`.

## Learn More

To learn more about Convex and Next.js, check out these resources:

- [Convex Documentation](https://docs.convex.world) - learn about Convex features and capabilities
- [Convex Design Documents](https://github.com/Convex-Dev/design) - architecture and design specifications
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

## Deployment

Pushes to `master` are built and deployed to GitHub Pages by `.github/workflows/nextjs.yml`. Pull requests and pushes to `develop` or `master` run linting, type-checking, tests and a production build.

## Community

Join the Convex community:
- [Discord](https://discord.com/invite/xfYGq4CT7v)
- [GitHub](https://github.com/Convex-Dev)
- [Documentation](https://docs.convex.world)
