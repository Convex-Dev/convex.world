export default function ConvexLogoAnimated() {
  return (
    <div className="coin-logo-container">
      <svg className="coin-grid" viewBox="0 0 400 400" aria-hidden="true">
        {[...Array(9)].map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} className="grid-line" />
        ))}
        {[...Array(9)].map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="400" className="grid-line" />
        ))}
      </svg>

      <svg className="coin-logo-svg" viewBox="0 0 100 100" aria-hidden="true">
        <polygon
          className="logo-hex"
          points="50,5 93,27.5 93,72.5 50,95 7,72.5 7,27.5"
          fill="none"
          strokeWidth="1.5"
        />
        <line className="logo-line logo-line-1" x1="50" y1="5" x2="50" y2="95" />
        <line className="logo-line logo-line-2" x1="50" y1="95" x2="7" y2="27.5" />
        <line className="logo-line logo-line-3" x1="50" y1="95" x2="93" y2="27.5" />

        <circle className="energy-pulse pulse-1" cx="50" cy="50" r="20" />
        <circle className="energy-pulse pulse-2" cx="50" cy="50" r="35" />
        <circle className="energy-pulse pulse-3" cx="50" cy="50" r="50" />
      </svg>

      <div className="coin-glow" />
    </div>
  );
}
