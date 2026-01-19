/**
 * Ed25519 crypto helpers using @noble/ed25519.
 * Used by WalletContext for key generation and signing.
 */

import * as ed from "@noble/ed25519";

// ---------------------------------------------------------------------------
// Hex <-> bytes
// ---------------------------------------------------------------------------

export function bytesToHex(b: Uint8Array): string {
  return Array.from(b)
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

export function hexToBytes(hex: string): Uint8Array {
  const m = hex.match(/.{1,2}/g);
  if (!m) return new Uint8Array(0);
  return new Uint8Array(m.map((byte) => parseInt(byte, 16)));
}

// ---------------------------------------------------------------------------
// Key generation (seed = 32-byte Ed25519 secret / private key)
// ---------------------------------------------------------------------------

/**
 * Generate a random 32-byte Ed25519 seed (private key).
 */
export function generateSeed(): Uint8Array {
  return ed.utils.randomPrivateKey();
}

/**
 * Derive the 32-byte public key from a seed.
 */
export async function getPublicKeyFromSeed(seed: Uint8Array): Promise<Uint8Array> {
  return ed.getPublicKeyAsync(seed);
}

/**
 * Generate a new keypair. Returns { publicKey, seed } as Uint8Arrays.
 */
export async function generateKeyPair(): Promise<{ publicKey: Uint8Array; seed: Uint8Array }> {
  const seed = generateSeed();
  const publicKey = await getPublicKeyFromSeed(seed);
  return { publicKey, seed };
}

// ---------------------------------------------------------------------------
// Signing
// ---------------------------------------------------------------------------

/**
 * Sign a message with the given seed. Returns 64-byte Ed25519 signature.
 */
export async function sign(message: Uint8Array, seed: Uint8Array): Promise<Uint8Array> {
  return ed.signAsync(message, seed);
}

/**
 * Sign a UTF-8 string. Returns signature as hex.
 */
export async function signMessage(message: string, seed: Uint8Array): Promise<string> {
  const msg = new TextEncoder().encode(message);
  const sig = await sign(msg, seed);
  return bytesToHex(sig);
}

// ---------------------------------------------------------------------------
// Verification (for completeness; WalletContext may not need it)
// ---------------------------------------------------------------------------

/**
 * Verify an Ed25519 signature.
 */
export async function verify(
  signature: Uint8Array,
  message: Uint8Array,
  publicKey: Uint8Array
): Promise<boolean> {
  return ed.verifyAsync(signature, message, publicKey);
}
