# Migration Plan: Replace hand-rolled client with @convex-world/convex-ts

## Overview

The site currently has its own Convex client implementation (`src/lib/crypto.ts`, `src/lib/convex-api.ts`) that duplicates functionality available in the official `@convex-world/convex-ts` npm package. This plan migrates to the official library.

## Prerequisites

- `@convex-world/convex-ts` must support native `fetch` (no axios — avoids unnecessary bundle weight)
- `@convex-world/convex-ts` must use correct peer API endpoints (prepare/submit transaction flow)
- `@convex-world/convex-ts` must be browser-safe (no `Buffer` usage)

## What Gets Replaced

### Delete

| File | Reason |
|------|--------|
| `src/lib/crypto.ts` | Replaced by `KeyPair`, `bytesToHex`, `hexToBytes`, `sign` from convex-ts |
| `src/lib/convex-api.ts` | Replaced by `Convex` class from convex-ts |

### Rewrite

| File | Change |
|------|--------|
| `src/contexts/ConvexContext.tsx` | Use `Convex` from convex-ts instead of local class |
| `src/contexts/WalletContext.tsx` | Use `KeyPair`, `KeyPairSigner` from convex-ts; optionally adopt `LocalStorageKeyStore` for encrypted storage |

### Update Imports (~14 files)

**Components importing from crypto.ts:**
- `src/components/ReplSandbox.tsx` — uses `generateKeyPair`, `bytesToHex`, `keyPairFromSeed`, `keyPairFromSeedHex`
- `src/components/ImportKeyDialog.tsx` — uses `hexToBytes`, `getPublicKeyFromSeed`, `bytesToHex`

**Components importing from convex-api.ts:**
- `src/components/ReplSandbox.tsx` — uses `AccountInfo`, `ConvexResponse` types
- (LiveInspector, LiveProofOfLife access Convex instance via context)

**Components using ConvexContext:**
- `src/components/ReplSandbox.tsx`
- `src/components/LiveInspector.tsx`
- `src/components/LiveProofOfLife.tsx`
- `src/components/NetworkSelector.tsx`

**Pages providing contexts (import change only):**
- `src/app/page.tsx`, `sandbox/page.tsx`, `developers/page.tsx`, `brand/page.tsx`, `coin/page.tsx`, `ecosystem/page.tsx`, `tools/page.tsx`, `team/page.tsx`, `community/page.tsx`, `demo/page.tsx`

## API Mapping

### Crypto

| Current (crypto.ts) | convex-ts equivalent |
|---------------------|---------------------|
| `generateKeyPair()` | `KeyPair.generate()` |
| `keyPairFromSeed(bytes)` | `KeyPair.fromSeed(bytes)` |
| `keyPairFromSeedHex(hex)` | `KeyPair.fromSeed(hex)` |
| `getPublicKeyFromSeed(seed)` | `KeyPair.fromSeed(seed).publicKey` |
| `sign(msg, seed)` | `signer.sign(msg)` |
| `bytesToHex(b)` | `bytesToHex(b)` (same export) |
| `hexToBytes(h)` | `hexToBytes(h)` (same export) |
| `KeyPair` type `{ seed, accountKey }` | `KeyPair` class with `.privateKey`, `.publicKey` |

### Client

| Current (convex-api.ts) | convex-ts equivalent |
|------------------------|---------------------|
| `new Convex({ peerUrl })` | `new Convex(peerUrl)` |
| `convex.query(source)` | `convex.query(source)` |
| `convex.transact(source)` | `convex.transact(source)` |
| `convex.createAccount(pubKeyHex)` | `convex.createAccount()` |
| `convex.getAccountInfo()` | `convex.getAccountInfo()` |
| `convex.getBalance(addr)` | `convex.query(\`(balance ${addr})\`)` |
| `convex.getJuicePrice()` | `convex.query('*juice-price*')` |
| `convex.getCoinSupply()` | `convex.query('(coin-supply)')` |
| `convex.getNetworkStatus()` | `convex.query('*timestamp*')` |
| `convex.getMemorySize()` | `convex.query('*memory-size*')` |
| `convex.getStateHash()` | `convex.query('(hash *state*)')` |
| `convex.resolveCNS(name)` | `convex.query(\`(resolve '${name})\`)` |

Note: Several convenience methods in convex.world are just thin query wrappers. These can either be added upstream to convex-ts or kept as local helpers in the site.

## Dependency Changes

```diff
- "@noble/ed25519": "^2.3.0",
+ "@convex-world/convex-ts": "^0.2.0",
```

The `@noble/ed25519` direct dependency can be dropped since convex-ts re-exports the crypto functions.

## Migration Steps

1. Install `@convex-world/convex-ts`
2. Update `ConvexContext.tsx` to use convex-ts `Convex` class
3. Update `WalletContext.tsx` to use convex-ts `KeyPair` + `KeyPairSigner`
4. Update component imports (ReplSandbox, ImportKeyDialog)
5. Add convenience query helpers if needed (getJuicePrice, etc.)
6. Delete `src/lib/crypto.ts` and `src/lib/convex-api.ts`
7. Remove `@noble/ed25519` from package.json
8. Test: `pnpm dev`, verify sandbox REPL, account creation, transactions, live inspector
