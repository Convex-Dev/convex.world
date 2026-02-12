/**
 * Convex Network API Client — thin adapter over @convex-world/convex-ts
 *
 * Adds site-specific features on top of the official library:
 *   - setPeerUrl() — switch networks without creating a new instance
 *   - latencyMs    — client-measured round-trip timing on every result
 *   - Error-returning API (never throws; returns errorCode instead)
 *   - Convenience query wrappers (getNetworkStatus, getBalance, etc.)
 *
 * Peer API Documentation: https://peer.convex.live/swagger
 */

import {
  Convex as ConvexClient,
  KeyPair,
  ConvexError,
  type Result,
  type ResultInfo,
} from '@convex-world/convex-ts';

// Re-export KeyPair so consumers don't need a second import source
export { KeyPair } from '@convex-world/convex-ts';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ConvexResponse<T = unknown> {
  value?: T;
  result?: string;
  info?: ResultInfo;
  errorCode?: string;
  /** Client-measured round-trip latency in milliseconds. */
  latencyMs?: number;
}

export interface NetworkStatus {
  consensusPoint: number;
  state: string;
  timestamp: number;
}

export interface AccountInfo {
  address: string;
  balance: number;
  memorySize: number;
  sequence: number;
  type: string;
  /** Ed25519 public key (hex), if the account has one */
  publicKey?: string;
}

export interface ConvexOptions {
  /** Peer base URL (e.g. https://peer.convex.live). */
  peerUrl?: string;
}

// ---------------------------------------------------------------------------
// Client
// ---------------------------------------------------------------------------

const DEFAULT_PEER_URL = 'https://mikera1337-convex-testnet.hf.space';

/**
 * Convex client for the website.
 *
 * Wraps {@link ConvexClient} from `@convex-world/convex-ts` and adds
 * setPeerUrl(), latencyMs measurement, and error-returning (non-throwing) API.
 */
export class Convex {
  private _client: ConvexClient;
  private _peerUrl: string;
  private _address: string | null = null;
  private _keyPair: KeyPair | null = null;

  constructor(options: ConvexOptions = {}) {
    this._peerUrl = options.peerUrl ?? DEFAULT_PEER_URL;
    this._client = new ConvexClient(this._peerUrl);
  }

  // -- Peer URL -------------------------------------------------------------

  get peerUrl(): string {
    return this._peerUrl;
  }

  setPeerUrl(v: string): void {
    this._peerUrl = v;
    this._client = new ConvexClient(v);
    this._syncAccount();
  }

  /** Peer hostname for display (e.g. "peer.convex.live"). */
  getPeerHostname(): string {
    try {
      return new URL(this._peerUrl || 'https://x').hostname;
    } catch {
      return 'peer';
    }
  }

  // -- Account management ---------------------------------------------------

  getAddress(): string | null {
    return this._address;
  }

  setAddress(v: string | null): void {
    this._address = v;
    if (v) this._client.setAddress(v);
  }

  getKeyPair(): KeyPair | null {
    return this._keyPair;
  }

  setKeyPair(k: KeyPair | null): void {
    this._keyPair = k;
    if (k) this._client.setSigner(k);
  }

  /** Re-apply address and signer after creating a new internal client. */
  private _syncAccount(): void {
    if (this._address) this._client.setAddress(this._address);
    if (this._keyPair) this._client.setSigner(this._keyPair);
  }

  // -- Query ----------------------------------------------------------------

  /**
   * Execute a read-only query (free, no signing required).
   * Returns a {@link ConvexResponse} with latencyMs — never throws.
   */
  async query(source: string, addressOverride?: string): Promise<ConvexResponse> {
    const address = addressOverride ?? this._address ?? undefined;
    const start = performance.now();
    try {
      const params = address ? { source, address } : source;
      const result: Result = await this._client.query(params);
      return { ...result, latencyMs: Math.round(performance.now() - start) };
    } catch (error) {
      const latencyMs = Math.round(performance.now() - start);
      if (error instanceof ConvexError) {
        return { errorCode: error.code, value: error.message, latencyMs };
      }
      return {
        errorCode: 'NETWORK',
        value: error instanceof Error ? error.message : 'Network error',
        latencyMs,
      };
    }
  }

  // -- Transact -------------------------------------------------------------

  /**
   * Submit a signed transaction.
   * Returns a {@link ConvexResponse} with latencyMs — never throws.
   */
  async transact(source: string): Promise<ConvexResponse> {
    if (!this._address) {
      return {
        errorCode: 'NO_ADDRESS',
        value: 'Transaction requires an address. Set an address (e.g. #56757).',
      };
    }
    if (!this._keyPair) {
      return {
        errorCode: 'NO_KEY',
        value: 'Transactions must be signed. Connect a key pair to execute.',
      };
    }

    const start = performance.now();
    try {
      const result: Result = await this._client.transact(source);
      return { ...result, latencyMs: Math.round(performance.now() - start) };
    } catch (error) {
      const latencyMs = Math.round(performance.now() - start);
      if (error instanceof ConvexError) {
        return { errorCode: error.code, value: error.message, latencyMs };
      }
      return {
        errorCode: 'NETWORK',
        value: error instanceof Error ? error.message : 'Network error',
        latencyMs,
      };
    }
  }

  // -- Account info ---------------------------------------------------------

  /**
   * Get account information by address.
   * Uses the REST /api/v1/accounts/{address} endpoint for full details
   * (memorySize, type, etc.) beyond what convex-ts getAccountInfo returns.
   */
  async getAccountInfo(addressOverride?: string): Promise<AccountInfo | null> {
    const address = addressOverride ?? this._address;
    if (!address) return null;
    try {
      const baseUrl = this._peerUrl.replace(/\/$/, '');
      const res = await fetch(
        `${baseUrl}/api/v1/accounts/${encodeURIComponent(address)}`,
        { method: 'GET', headers: { Accept: 'application/json' } },
      );
      if (!res.ok) return null;

      const data = (await res.json()) as Record<string, unknown>;
      const key = data.key;
      return {
        address: String(data.address ?? address),
        balance: typeof data.balance === 'number' ? data.balance : 0,
        memorySize: typeof data.memorySize === 'number' ? data.memorySize : 0,
        sequence: typeof data.sequence === 'number' ? data.sequence : 0,
        type: typeof data.type === 'string' ? data.type : 'user',
        publicKey: typeof key === 'string' && key.length > 0 ? key : undefined,
      };
    } catch {
      return null;
    }
  }

  // -- Create account -------------------------------------------------------

  /**
   * Create a new account on the network with the given public key.
   * Accepts a hex string or a KeyPair (only the public key is sent).
   */
  async createAccount(
    publicKeyOrKeyPair: string | KeyPair,
  ): Promise<
    { address: string; faucetAmount?: number } | { errorCode: string; errorMessage: string }
  > {
    try {
      const accountKey =
        publicKeyOrKeyPair instanceof KeyPair
          ? publicKeyOrKeyPair   // convex-ts createAccount accepts KeyPair
          : publicKeyOrKeyPair;
      const info = await this._client.createAccount(accountKey, 100_000_000);
      return {
        address: String(info.address),
        faucetAmount: info.balance > 0 ? info.balance : undefined,
      };
    } catch (error) {
      return {
        errorCode: 'CREATE_ACCOUNT_FAILED',
        errorMessage: error instanceof Error ? error.message : 'Failed to create account',
      };
    }
  }

  // -- Convenience queries --------------------------------------------------

  /** Verify connection by querying *timestamp*. */
  async getNetworkStatus(): Promise<NetworkStatus | null> {
    try {
      const result = await this.query('*timestamp*');
      if (result.errorCode) return null;
      return {
        consensusPoint: typeof result.value === 'number' ? result.value : 0,
        state: 'connected',
        timestamp: Date.now(),
      };
    } catch {
      return null;
    }
  }

  async getBalance(address: string): Promise<number | null> {
    const result = await this.query(`(balance ${address})`);
    return typeof result.value === 'number' ? result.value : null;
  }

  async getJuicePrice(): Promise<number | null> {
    const result = await this.query('*juice-price*');
    return typeof result.value === 'number' ? result.value : null;
  }

  async getCoinSupply(): Promise<number | null> {
    const result = await this.query('(coin-supply)');
    return typeof result.value === 'number' ? result.value : null;
  }

  async getMemorySize(): Promise<number | null> {
    const result = await this.query('*memory-size*');
    return typeof result.value === 'number' ? result.value : null;
  }

  async getStateHash(): Promise<string | null> {
    const result = await this.query('(hash *state*)');
    return result.value ? String(result.value) : null;
  }

  async resolveCNS(name: string): Promise<string | null> {
    const result = await this.query(`(resolve '${name})`);
    return result.value != null ? String(result.value) : null;
  }
}

/** Default Convex instance. */
export const convex = new Convex();
