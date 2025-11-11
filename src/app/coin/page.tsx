import Button from "@/components/Button";
import Card from "@/components/Card";
import Code from "@/components/Code";
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
                    <p>The Convex Coin (<b>CVM</b>) is the native utility token of the Convex network, 
                    enabling secure, scalable, and fully global on-chain state changes.</p>
                    <p>
                    A small CVM fee applies only to transactions that modify the shared 
                    global state - safeguarding the network from spam while ensuring equitable access to shared resources.</p>
                    <p>Most interactions remain free:</p>
                    <ul>
                        <li><strong>Unlimited reads:</strong> Query the global state at no cost</li>
                        <li><strong>Off-chain flexibility:</strong> Use Lattice Technology for storage and computation without CVM</li>
                    </ul>
                    <p>CVM has various other uses in the ecosystem:</p>
                    <ul>
                        <li><strong>Staking:</strong> Secure the network by staking CVM on trusted peers 
                        through Convergent Proof-of-Stake (CPoS), earning rewards while strengthening network security and resilience</li>
                        <li><strong>Value Exchange:</strong> CVM can be used as a convenient, self-sovereign digital currency</li>
                        <li><strong>Rewards:</strong> CVM is used to reward contributors to the network and ecosystem</li>
                    </ul>
                </Card>

                <div className="button-group">
                    <Button href="https://app.paisley.io">Buy with Paisley</Button>
                    <Button href="https://discord.com/invite/xfYGq4CT7v">Get Involved!</Button>
                </div>

                <Card>
                    <h3>Tokenomics</h3>
                    <p>The non-profit Convex Foundation ensures that every CVM issued serves 
                        the long-term health of the network. </p>
                    <p>Coins are distributed based on the following proportions:</p>
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
                    <p>The price of CVM is determined by the <b>release curve</b> which assigns an increasing price to each unit of CVM 
                    as it is released, according to the following formula:
                    <Code>
                    {
`price = c * x / (1 - x)

where:
- c is the constant base price of $100
- x is the proportion of CVM already sold from the release curve`}
                    </Code>
                    </p>
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

