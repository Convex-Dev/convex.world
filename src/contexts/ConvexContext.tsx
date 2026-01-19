'use client';

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { Convex } from '@/lib/convex-api';

type ConvexContextValue = {
  convex: Convex;
  setAddress: (v: string | null) => void;
  setPrivateKey: (v: string | null) => void;
  address: string | null;
  privateKey: string | null;
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

  const setPrivateKey = useCallback(
    (v: string | null) => {
      convex.setPrivateKey(v);
      setRevision((r) => r + 1);
    },
    [convex]
  );

  const value: ConvexContextValue = {
    convex,
    setAddress,
    setPrivateKey,
    address: convex.getAddress(),
    privateKey: convex.getPrivateKey(),
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
