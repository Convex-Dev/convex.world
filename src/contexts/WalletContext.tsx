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
  bytesToHex,
  generateKeyPair,
  hexToBytes,
  sign,
} from "@/lib/crypto";

// Map: publicKey (hex) -> seed (hex). Stored as a plain object for JSON/localStorage.
type KeysMap = Record<string, string>;

type WalletContextValue = {
  /** Public keys (hex) in the wallet */
  publicKeys: string[];
  /** Get the seed for a public key, if present */
  getSeed: (publicKeyHex: string) => Uint8Array | undefined;
  /** Generate and add a new keypair. Returns the new public key (hex). */
  addKey: () => Promise<string>;
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
  const storageKey = persistKey ?? null;

  const load = useCallback(() => {
    if (!storageKey || typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as KeysMap;
        if (parsed && typeof parsed === "object") setKeys(parsed);
      }
    } catch {
      // ignore
    }
  }, [storageKey]);

  const persist = useCallback(() => {
    if (!storageKey || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(keys));
    } catch {
      // ignore
    }
  }, [storageKey, keys]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (storageKey) persist();
  }, [storageKey, keys, persist]);

  const getSeed = useCallback(
    (publicKeyHex: string): Uint8Array | undefined => {
      const seedHex = keys[publicKeyHex];
      if (!seedHex) return undefined;
      return hexToBytes(seedHex);
    },
    [keys]
  );

  const addKey = useCallback(async (): Promise<string> => {
    const { publicKey, seed } = await generateKeyPair();
    const pubHex = bytesToHex(publicKey);
    const seedHex = bytesToHex(seed);
    setKeys((prev) => ({ ...prev, [pubHex]: seedHex }));
    return pubHex;
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
      removeKey,
      signWith,
      persist,
      load,
    }),
    [publicKeys, getSeed, addKey, removeKey, signWith, persist, load]
  );

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
}

export function useWallet(): WalletContextValue {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error("useWallet must be used within a WalletProvider");
  return ctx;
}

export function useWalletOptional(): WalletContextValue | null {
  return useContext(WalletContext);
}
