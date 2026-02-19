export default function LatticeDataIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="7" height="7" rx="1" fill="var(--accent-consensus)" />
      <rect x="14" y="3" width="7" height="7" rx="1" fill="var(--accent-primary)" />
      <rect x="3" y="14" width="7" height="7" rx="1" fill="var(--accent-primary)" />
      <rect x="14" y="14" width="7" height="7" rx="1" fill="var(--accent-consensus)" />
      <line x1="10" y1="6.5" x2="14" y2="6.5" stroke="var(--accent-highlight)" strokeWidth="1.5" />
      <line x1="10" y1="17.5" x2="14" y2="17.5" stroke="var(--accent-highlight)" strokeWidth="1.5" />
      <line x1="6.5" y1="10" x2="6.5" y2="14" stroke="var(--accent-highlight)" strokeWidth="1.5" />
      <line x1="17.5" y1="10" x2="17.5" y2="14" stroke="var(--accent-highlight)" strokeWidth="1.5" />
    </svg>
  );
}
