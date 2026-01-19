/**
 * Convex Network API Client
 *
 * Connects to the Convex peer network for live data queries.
 * Uses local API routes to proxy requests (avoids CORS issues).
 *
 * Queries are FREE and don't require an account or wallet.
 * Transactions (sends) require a signed account and cost Juice.
 *
 * Peer API Documentation: https://peer.convex.live/swagger
 */

import { bytesToHex, hexToBytes, sign } from '@/lib/crypto';

const API_BASE = '/api/convex';

export interface ConvexResponseInfo {
  juice?: number;
  source?: string;
}

export interface ConvexResponse<T = unknown> {
  value?: T; // JSON value from request, may lose some type info
  result?: string; // CVX expression result from request. More accurate
  info?: ConvexResponseInfo;
  errorCode?: string;
  errorMessage?: string;
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
  /** Peer base URL (e.g. https://peer.convex.live). Used in X-Convex-Peer. */
  peerUrl?: string;
}

const DEFAULT_PEER_URL = 'https://peer.convex.live';

/**
 * Convex client. Wraps the network/peer base URL so the network is switchable.
 * All requests send X-Convex-Peer so the proxy can forward to the chosen peer.
 */
export class Convex {
  readonly peerUrl: string;
  private _address: string | null = null;
  /** Private key (32-byte Ed25519 seed) as hex, or null. Used to sign transactions. */
  private _privateKey: string | null = null;

  constructor(options: ConvexOptions = {}) {
    this.peerUrl = options.peerUrl ?? DEFAULT_PEER_URL;
  }

  private peerHeaders(): Record<string, string> {
    return { 'X-Convex-Peer': this.peerUrl };
  }

  /** Account address (numeric string) or null. */
  getAddress(): string | null {
    return this._address;
  }

  setAddress(v: string | null): void {
    this._address = v;
  }

  /** Private key (seed) hex for signing, or null. */
  getPrivateKey(): string | null {
    return this._privateKey;
  }

  setPrivateKey(v: string | null): void {
    this._privateKey = v;
  }

  /**
   * Execute a read-only query on the Convex network.
   * Queries are free and don't modify state.
   * Uses addressOverride ?? this.getAddress() when sending; omit if both null.
   */
  async query(source: string, addressOverride?: string): Promise<ConvexResponse> {
    const address = addressOverride ?? this._address ?? undefined;
    try {
      const response = await fetch(`${API_BASE}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...this.peerHeaders(),
        },
        body: JSON.stringify({
          source,
          address,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          errorCode: 'SYNTAX',
          errorMessage: data.title || `HTTP ${response.status}`,
        };
      }

      return data;
    } catch (error) {
      console.error('Convex query error:', error);
      return {
        errorCode: 'NETWORK',
        errorMessage: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  /**
   * Submit a signed transaction. Uses this.getAddress(), this.getPrivateKey(),
   * and account sequence from getAccountInfo. Costs Juice.
   * Returns ConvexResponse with result/value and info.juice on success.
   */
  async transact(source: string): Promise<ConvexResponse> {
    const address = this._address;
    const privateKeyHex = this._privateKey;
    if (!address || !privateKeyHex) {
      return {
        errorCode: 'MISSING_ACCOUNT',
        errorMessage: 'Address and private key required for transact. Set address and connect a key.',
      };
    }

    try {
      const info = await this.getAccountInfo(address);
      if (!info) {
        return { errorCode: 'ACCOUNT_NOT_FOUND', errorMessage: `Account #${address} not found` };
      }
      const sequence = info.sequence;

      // Message to sign: canonical form for replay protection. Convex may use a
      // different encoding; this matches a typical origin+sequence+payload pattern.
      const message = new TextEncoder().encode(`${address}:${sequence}:${source}`);
      const seed = hexToBytes(privateKeyHex);
      const sig = await sign(message, seed);
      const signature = bytesToHex(sig);

      const response = await fetch(`${API_BASE}/transact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...this.peerHeaders(),
        },
        body: JSON.stringify({ source, address, sequence, signature }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          errorCode: 'TRANSACT_FAILED',
          errorMessage: (data as { errorMessage?: string }).errorMessage ?? data.title ?? `HTTP ${response.status}`,
        };
      }

      return data as ConvexResponse;
    } catch (error) {
      console.error('Convex transact error:', error);
      return {
        errorCode: 'NETWORK',
        errorMessage: error instanceof Error ? error.message : 'Network error',
      };
    }
  }

  /**
   * Get the current network status via CVM query.
   * Uses *timestamp* to verify connection - returns network timestamp in ms.
   */
  async getNetworkStatus(): Promise<NetworkStatus | null> {
    try {
      const result = await this.query('*timestamp*');

      if (result.errorCode) {
        throw new Error(result.errorMessage || 'Query failed');
      }

      return {
        consensusPoint: typeof result.value === 'number' ? result.value : 0,
        state: 'connected',
        timestamp: Date.now(),
      };
    } catch (error) {
      console.error('Convex status error:', error);
      return null;
    }
  }

  /**
   * Get current block/consensus point from the network.
   */
  async getBlockHeight(): Promise<number | null> {
    try {
      const response = await fetch(`${API_BASE}/blocks`, {
        headers: this.peerHeaders(),
      });
      if (!response.ok) return null;
      const data = await response.json();
      if (Array.isArray(data)) {
        return data.length > 0 ? data.length : null;
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Get total memory size used on the network.
   */
  async getMemorySize(): Promise<number | null> {
    const result = await this.query('*memory-size*');
    if (typeof result.value === 'number') {
      return result.value;
    }
    return null;
  }

  /**
   * Get the current state hash (changes with every state update).
   */
  async getStateHash(): Promise<string | null> {
    const result = await this.query('(hash *state*)');
    if (result.value) {
      return String(result.value);
    }
    return null;
  }

  /**
   * Get account information by address.
   * Uses addressOverride ?? this.getAddress(); returns null if none set.
   * REST /api/v1/accounts/{address} returns:
   * { address, sequence, balance, allowance, memorySize, key, type }
   */
  async getAccountInfo(addressOverride?: string): Promise<AccountInfo | null> {
    const address = addressOverride ?? this._address;
    if (!address) return null;
    try {
      const res = await fetch(
        `${API_BASE}/accounts/${encodeURIComponent(address)}`,
        {
          method: 'GET',
          headers: { Accept: 'application/json', ...this.peerHeaders() },
        }
      );

      if (!res.ok) {
        await res.json().catch(() => ({}));
        return null;
      }

      const data = (await res.json()) as Record<string, unknown>;
      const key = data.key;
      const publicKey =
        typeof key === 'string' && key.length > 0 ? key : undefined;

      return {
        address: String(data.address ?? address),
        balance: typeof data.balance === 'number' ? data.balance : 0,
        memorySize: typeof data.memorySize === 'number' ? data.memorySize : 0,
        sequence: typeof data.sequence === 'number' ? data.sequence : 0,
        type: typeof data.type === 'string' ? data.type : 'user',
        publicKey,
      };
    } catch (error) {
      console.error('Convex account error:', error);
      return null;
    }
  }

  /**
   * Resolve a CNS name to an address.
   * Uses (resolve 'symbol) syntax per Convex docs.
   */
  async resolveCNS(name: string): Promise<string | null> {
    const result = await this.query(`(resolve '${name})`);
    if (result.value !== undefined && result.value !== null) {
      return String(result.value);
    }
    return null;
  }

  /**
   * Get balance for an address.
   */
  async getBalance(address: string): Promise<number | null> {
    const result = await this.query(`(balance ${address})`);
    if (typeof result.value === 'number') {
      return result.value;
    }
    return null;
  }

  /**
   * Get current juice price from the network.
   */
  async getJuicePrice(): Promise<number | null> {
    const result = await this.query('*juice-price*');
    if (typeof result.value === 'number') {
      return result.value;
    }
    return null;
  }

  /**
   * Get total coin supply from the network.
   * Returns raw value - Convex Coins are measured in Coppers (smallest unit).
   * 1 Convex Coin = 10^9 Coppers, so ~1B supply = ~10^18 Coppers.
   */
  async getCoinSupply(): Promise<number | null> {
    const result = await this.query('(coin-supply)');
    if (typeof result.value === 'number') {
      return result.value;
    }
    return null;
  }

  /**
   * Execute a transaction (costs Juice, requires account).
   * For the sandbox, we use query for evaluation since it's free.
   */
  async evaluateExpression(source: string): Promise<ConvexResponse> {
    return this.query(source);
  }
}

/** Default Convex instance using https://peer.convex.live */
export const convex = new Convex();
