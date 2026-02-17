"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  KeyPair,
  bytesToHex,
  hexToBytes,
  sign,
} from "@convex-world/convex-ts";

// Map: publicKey (hex) -> seed (hex). Stored as a plain object for JSON/localStorage.
type KeysMap = Record<string, string>;

type WalletContextValue = {
  /** Public keys (hex) in the wallet */
  publicKeys: string[];
  /** Get the seed for a public key, if present */
  getSeed: (publicKeyHex: string) => Uint8Array | undefined;
  /** Generate and add a new keypair. Returns the new public key (hex). */
  addKey: () => Promise<string>;
  /** Add an existing keypair (e.g. from generateKeyPair). Public and seed in hex. */
  addKeyFromKeypair: (publicKeyHex: string, seedHex: string) => void;
  /** Remove a key by its public key (hex) */
  removeKey: (publicKeyHex: string) => void;
  /** Sign a message with the key for the given public key. Returns raw 64-byte signature. */
  signWith: (publicKeyHex: string, message: Uint8Array) => Promise<Uint8Array | undefined>;
  /** Persist current keys to localStorage (no-op if persistKey was not set) */
  persist: () => void;
  /** Load keys from localStorage (no-op if persistKey was not set) */
  load: () => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

type WalletProviderProps = {
  children: ReactNode;
  /** If set, keys are loaded from localStorage on mount and saved when they change. */
  persistKey?: string | null;
};

export function WalletProvider({ children, persistKey = null }: WalletProviderProps) {
  const [keys, setKeys] = useState<KeysMap>(() => ({}));

  const load = useCallback(() => {
    if (!persistKey || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(persistKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") setKeys(parsed as KeysMap);
      }
    } catch {
      // ignore
    }
  }, [persistKey]);

  const persist = useCallback(() => {
    if (!persistKey || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(persistKey, JSON.stringify(keys));
    } catch {
      // ignore
    }
  }, [persistKey, keys]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (persistKey) persist();
  }, [persistKey, keys, persist]);

  const getSeed = useCallback(
    (publicKeyHex: string): Uint8Array | undefined => {
      const seedHex = keys[publicKeyHex];
      if (!seedHex) return undefined;
      return hexToBytes(seedHex);
    },
    [keys]
  );

  const addKey = useCallback(async (): Promise<string> => {
    const kp = KeyPair.generate();
    const pubHex = kp.publicKeyHex;
    const seedHex = kp.privateKeyHex;
    setKeys((prev) => ({ ...prev, [pubHex]: seedHex }));
    return pubHex;
  }, []);

  const addKeyFromKeypair = useCallback((publicKeyHex: string, seedHex: string) => {
    const pub = (publicKeyHex || '').replace(/^0x/i, '').toLowerCase();
    const seed = (seedHex || '').replace(/^0x/i, '').toLowerCase();
    if (pub && seed) setKeys((prev) => ({ ...prev, [pub]: seed }));
  }, []);

  const removeKey = useCallback((publicKeyHex: string) => {
    setKeys((prev) => {
      const next = { ...prev };
      delete next[publicKeyHex];
      return next;
    });
  }, []);

  const signWith = useCallback(
    async (
      publicKeyHex: string,
      message: Uint8Array
    ): Promise<Uint8Array | undefined> => {
      const seed = getSeed(publicKeyHex);
      if (!seed) return undefined;
      return sign(message, seed);
    },
    [getSeed]
  );

  const publicKeys = useMemo(() => Object.keys(keys), [keys]);

  const value = useMemo<WalletContextValue>(
    () => ({
      publicKeys,
      getSeed,
      addKey,
      addKeyFromKeypair,
      removeKey,
      signWith,
      persist,
      load,
    }),
    [publicKeys, getSeed, addKey, addKeyFromKeypair, removeKey, signWith, persist, load]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWalletOptional(): WalletContextValue | null {
  return useContext(WalletContext);
}
