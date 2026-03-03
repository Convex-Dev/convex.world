"use client";

import { useEffect, useState } from "react";

const PEER_URL = "https://mikera1337-convex-testnet.hf.space";

export default function CoinSupply() {
  const [supply, setSupply] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${PEER_URL}/api/v1/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "(coin-supply)" }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (typeof data.value === "number") {
          const coins = data.value / 1_000_000_000;
          if (coins >= 1_000_000_000) {
            setSupply((coins / 1_000_000_000).toFixed(1) + " B");
          } else if (coins >= 1_000_000) {
            setSupply((coins / 1_000_000).toFixed(1) + " M");
          } else if (coins >= 1_000) {
            setSupply((coins / 1_000).toFixed(1) + " K");
          } else {
            setSupply(coins.toFixed(1));
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="coin-hero-stat">
      <span className="coin-hero-stat-value">{supply ?? "—"}</span>
      <span className="coin-hero-stat-label">Coin Supply</span>
    </div>
  );
}
