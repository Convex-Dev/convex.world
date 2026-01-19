'use client';

/**
 * Displays a raw CVM balance in the format XX.000 000 000.
 * Value is in the smallest unit (one billionth of a CVM): 1 CVM = 10^9 units.
 * The whole CVM part is highlighted (yellow); the fractional part is muted.
 */
export default function CVMBalance({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const raw = Math.max(0, Number(value) || 0);
  const whole = Math.floor(raw / 1e9);
  const frac = Math.floor(raw % 1e9);
  const fracStr = String(frac).padStart(9, '0');
  const fracFormatted = fracStr;
  const wholeFormatted = whole.toLocaleString('en-US', { maximumFractionDigits: 0 });

  return (
    <span className={className ? `cvm-balance ${className}` : 'cvm-balance'}>
      <span className="cvm-balance-whole">{wholeFormatted}</span>
      <span className="cvm-balance-frac">.{fracFormatted}</span>
    </span>
  );
}
