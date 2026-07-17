export type StoredWalletKeys = Record<string, string>;

/**
 * Parse the wallet's localStorage payload without trusting arbitrary JSON.
 * Invalid or missing data is treated as an empty wallet by the provider.
 */
export function parseStoredWalletKeys(raw: string | null): StoredWalletKeys | null {
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;

    const entries = Object.entries(parsed);
    if (!entries.every(([publicKey, seed]) => publicKey.length > 0 && typeof seed === "string")) {
      return null;
    }

    return Object.fromEntries(entries);
  } catch {
    return null;
  }
}
