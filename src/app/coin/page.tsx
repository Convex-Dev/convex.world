import Button from "@/components/Button";
import Card from "@/components/Card";
import Image from "next/image";

export default function Coin() {
    return (
        <div>
            <div className="hero-section">
                <h1>Convex Coin</h1>
            </div>
            <div className="container">
                <Card>
                    <h3>Convex Coin</h3>
                    <p>The Convex Coin (CVM) is the native utility token of the Convex network - fuelling secure, scalable, and truly global on-chain state changes.</p>
                    <p>A modest fee in CVM is required <em>only</em> for transactions that mutate the shared global state. This minimal cost protects the ecosystem from spam and ensures fair access to collective resources.</p>
                    <p>Most Convex interactions are free with no CVM required:
                        <ul>
                            <li><strong>Unlimited reads:</strong> Query the global state at zero cost</li>
                            <li><strong>Off-chain freedom:</strong> Leverage Lattice Technology for data storage and computation without any CVM</li>
                        </ul>
                    </p>
                    <p><strong>Staking:</strong> CVM also empowers network security: stake it on trusted peers via our innovative CPoS (Convergent Proof-of-Stake) consensus to earn rewards and harden the network.</p>
                </Card>

                <div className="button-group">
                    <Button href="https://app.paisley.io">Buy with Paisley</Button>
                    <Button href="https://discord.com/invite/xfYGq4CT7v">Get Involved!</Button>
                </div>

                <Card>
                    <h3>Tokenomics</h3>
                    <p>Issued by the non-profit Convex Foundation, ensuring that every CVM issued serves 
                        the long-term health of the network. Coins are distributed based on the following proportions:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Allocation</th>
                                <th>Purpose</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>25%</td>
                                <td>Grants, bounties, and awards to accelerate core development, tooling, and dapp innovation.</td>
                            </tr>
                            <tr>
                                <td>75%</td>
                                <td>Public sale over time via a fair, transparent release curve - ensuring broad participation and aligned incentives.</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>The supply of CVM converges towards a theoretical hard cap of 1,000,000,000 CVM (but never reaches it). The rate of this convergence is determined by the economics of the release curve.</p>
                    <Image
                        src="/images/release-curve.png"
                        alt="CVM Release Curve"
                        width={960}
                        height={540}
                        className="slide"
                        style={{ width: '100%', maxWidth: '30em', height: 'auto', display: 'block', margin: '0 auto' }}
                        sizes="(max-width: 768px) 100vw, 30em"
                    />
                    <p>
                        For more details see <a href="https://docs.convex.world/docs/cad/tokenomics">CAD020 Tokenomics</a> and the <a href="https://docs.convex.world/docs/overview/convex-whitepaper">Convex White Paper</a> document.
                    </p>
                </Card>
            </div>
        </div>
    );
}

