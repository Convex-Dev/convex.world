export default function ReleaseCurveChart() {
  return (
    <svg viewBox="0 0 400 280" className="release-curve-svg">
      <defs>
        <linearGradient id="curveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.15" />
          <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={`h${i}`} x1="50" y1={40 + i * 40} x2="380" y2={40 + i * 40} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}

      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
        <line key={`v${i}`} x1={50 + i * 33} y1="40" x2={50 + i * 33} y2="240" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}

      <line x1="50" y1="240" x2="380" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="50" y1="40" x2="50" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

      <path
        d="M50,240 C100,238 150,232 182,222 C214,212 240,195 260,175 C280,155 300,120 314,75 C320,55 325,40 325,40 L325,240 Z"
        fill="url(#areaGradient)"
      />

      <path
        d="M50,240 C100,238 150,232 182,222 C214,212 240,195 260,175 C280,155 300,120 314,75 C320,55 325,40 325,40"
        fill="none"
        stroke="url(#curveGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      <text x="45" y="44" textAnchor="end" className="chart-label">$500</text>
      <text x="45" y="84" textAnchor="end" className="chart-label">$400</text>
      <text x="45" y="124" textAnchor="end" className="chart-label">$300</text>
      <text x="45" y="164" textAnchor="end" className="chart-label">$200</text>
      <text x="45" y="204" textAnchor="end" className="chart-label">$100</text>
      <text x="45" y="244" textAnchor="end" className="chart-label">$0</text>

      <text x="50" y="258" textAnchor="middle" className="chart-label">0%</text>
      <text x="116" y="258" textAnchor="middle" className="chart-label">20%</text>
      <text x="182" y="258" textAnchor="middle" className="chart-label">40%</text>
      <text x="248" y="258" textAnchor="middle" className="chart-label">60%</text>
      <text x="314" y="258" textAnchor="middle" className="chart-label">80%</text>
      <text x="380" y="258" textAnchor="middle" className="chart-label">100%</text>

      <text x="20" y="140" textAnchor="middle" className="chart-axis-title" transform="rotate(-90, 20, 140)">Coin Price</text>
      <text x="215" y="275" textAnchor="middle" className="chart-axis-title">Proportion Released</text>
    </svg>
  );
}
