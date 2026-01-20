'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { type KeyPair } from '@/lib/crypto';
import { Convex } from '@/lib/convex-api';

type ConvexContextValue = {
  convex: Convex;
  setAddress: (v: string | null) => void;
  setKeyPair: (k: KeyPair | null) => void;
  setPeerUrl: (v: string) => void;
  address: string | null;
  keyPair: KeyPair | null;
  peerUrl: string;
};

const ConvexContext = createContext<ConvexContextValue | null>(null);

type ConvexProviderProps = {
  children: ReactNode;
  /** Optional peer URL; defaults to https://peer.convex.live */
  peerUrl?: string;
};

export function ConvexProvider({ children, peerUrl }: ConvexProviderProps) {
  const [convex] = useState(() => new Convex(peerUrl != null ? { peerUrl } : {}));
  const [, setRevision] = useState(0);

  const setAddress = useCallback(
    (v: string | null) => {
      convex.setAddress(v);
      setRevision((r) => r + 1);
    },
    [convex]
  );

  const setKeyPair = useCallback(
    (k: KeyPair | null) => {
      convex.setKeyPair(k);
      setRevision((r) => r + 1);
    },
    [convex]
  );

  const setPeerUrl = useCallback(
    (v: string) => {
      convex.setPeerUrl(v);
      setRevision((r) => r + 1);
    },
    [convex]
  );

  const value: ConvexContextValue = {
    convex,
    setAddress,
    setKeyPair,
    setPeerUrl,
    address: convex.getAddress(),
    keyPair: convex.getKeyPair(),
    peerUrl: convex.peerUrl,
  };

  return <ConvexContext.Provider value={value}>{children}</ConvexContext.Provider>;
}

export function useConvex(): ConvexContextValue {
  const ctx = useContext(ConvexContext);
  if (!ctx) throw new Error('useConvex must be used within a ConvexProvider');
  return ctx;
}

export function useConvexOptional(): ConvexContextValue | null {
  return useContext(ConvexContext);
}
