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

  constructor(options: ConvexOptions = {}) {
    this.peerUrl = options.peerUrl ?? DEFAULT_PEER_URL;
  }

  private peerHeaders(): Record<string, string> {
    return { 'X-Convex-Peer': this.peerUrl };
  }

  /**
   * Execute a read-only query on the Convex network.
   * Queries are free and don't modify state.
   */
  async query(source: string, address?: string): Promise<ConvexResponse> {
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
          address: address,
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
   * Uses REST /api/v1/accounts/{address} which returns:
   * { address, sequence, balance, allowance, memorySize, key, type }
   */
  async getAccountInfo(address: string): Promise<AccountInfo | null> {
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
