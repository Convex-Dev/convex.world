/**
 * Ed25519 crypto helpers using @noble/ed25519.
 * Used by WalletContext for key generation and signing.
 */

import * as ed from "@noble/ed25519";

export type KeyPair = {
  seed: Uint8Array;
  accountKey: Uint8Array;
};

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

/** Strip optional 0x prefix and lowercase a hex string. */
export function normaliseHex(hex: string): string {
  return (hex || '').replace(/^0x/i, '').toLowerCase();
}

export async function getPublicKeyFromSeed(seed: Uint8Array): Promise<Uint8Array> {
  return ed.getPublicKeyAsync(seed);
}

export async function generateKeyPair(): Promise<KeyPair> {
  const seed = ed.utils.randomPrivateKey();
  const accountKey = await getPublicKeyFromSeed(seed);
  return { seed, accountKey };
}

export async function keyPairFromSeed(seed: Uint8Array): Promise<KeyPair> {
  const accountKey = await getPublicKeyFromSeed(seed);
  return { seed, accountKey };
}

export async function keyPairFromSeedHex(seedHex: string): Promise<KeyPair> {
  const raw = normaliseHex(seedHex).trim();
  if (!raw || !/^[0-9a-fA-F]{64}$/.test(raw)) {
    throw new Error('Seed must be 64 hex characters (32 bytes)');
  }
  return keyPairFromSeed(hexToBytes(raw));
}

export async function sign(message: Uint8Array, seed: Uint8Array): Promise<Uint8Array> {
  return ed.signAsync(message, seed);
}
