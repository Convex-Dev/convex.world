'use client';

/**
 * Displays a public key as hex digits and a small identicon from /identicon/{hex}
 * on the Convex peer. When value is nil/empty, shows "(no key)" and a black box.
 */
export default function PublicKey({
  value,
  digits = 8,
  className,
}: {
  value: string | null | undefined;
  digits?: number;
  className?: string;
}) {
  const hex = (value || '').replace(/^0x/i, '').toLowerCase();
  const hasKey = hex.length > 0;

  const display = hasKey ? hex.slice(0, digits) : '';
  const truncated = hasKey && hex.length > digits;
  const label = hasKey ? display + (truncated ? '...' : '') : '(no key)';
  const tooltip = hasKey ? `0x${hex}` : '(no key)';

  return (
    <span className={className ? `public-key ${className}` : 'public-key'} title={tooltip}>
      {hasKey ? (
        <img
          src={`/api/convex/identicon/${hex}`}
          alt=""
          width={16}
          height={16}
          className="public-key-identicon"
        />
      ) : (
        <span className="public-key-identicon public-key-identicon-empty" aria-hidden="true" />
      )}
      <span className="public-key-hex">{label}</span>
    </span>
  );
}
