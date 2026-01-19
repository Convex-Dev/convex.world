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

// Use local proxy routes to avoid CORS issues
const API_BASE = '/api/convex';

interface ConvexResponse<T = unknown> {
  value?: T;
  errorCode?: string;
  errorMessage?: string;
}

interface NetworkStatus {
  consensusPoint: number;
  state: string;
  timestamp: number;
}

interface AccountInfo {
  address: string;
  balance: number;
  memorySize: number;
  sequence: number;
  type: string;
  /** Ed25519 public key (hex), if the account has one */
  publicKey?: string;
}

/**
 * Execute a read-only query on the Convex network.
 * Queries are free and don't modify state.
 */
export async function query(source: string, address?: string): Promise<ConvexResponse> {
  try {
    const response = await fetch(`${API_BASE}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        source,
        address: address,
      }),
    });

    const data = await response.json();
    
    // Handle 400 parse errors gracefully
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
      errorMessage: error instanceof Error ? error.message : 'Network error' 
    };
  }
}

/**
 * Get the current network status via CVM query.
 * Uses *timestamp* to verify connection - returns network timestamp in ms.
 */
export async function getNetworkStatus(): Promise<NetworkStatus | null> {
  try {
    const result = await query('*timestamp*');
    
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
export async function getBlockHeight(): Promise<number | null> {
  try {
    const response = await fetch('/api/convex/blocks');
    if (!response.ok) return null;
    const data = await response.json();
    // The blocks API returns an array, length indicates block count
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
export async function getMemorySize(): Promise<number | null> {
  const result = await query('*memory-size*');
  if (typeof result.value === 'number') {
    return result.value;
  }
  return null;
}

/**
 * Get the current state hash (changes with every state update).
 */
export async function getStateHash(): Promise<string | null> {
  const result = await query('(hash *state*)');
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
export async function getAccountInfo(address: string): Promise<AccountInfo | null> {
  try {
    const res = await fetch(`${API_BASE}/accounts/${encodeURIComponent(address)}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      if (err.errorCode) return null;
      return null;
    }

    const data = (await res.json()) as Record<string, unknown>;
    const key = data.key;
    const publicKey = typeof key === 'string' && key.length > 0 ? key : undefined;

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
export async function resolveCNS(name: string): Promise<string | null> {
  // Use the resolve macro with quoted symbol
  const result = await query(`(resolve '${name})`);
  if (result.value !== undefined && result.value !== null) {
    return String(result.value);
  }
  return null;
}

/**
 * Get balance for an address.
 */
export async function getBalance(address: string): Promise<number | null> {
  const result = await query(`(balance ${address})`);
  if (typeof result.value === 'number') {
    return result.value;
  }
  return null;
}

/**
 * Get current juice price from the network.
 */
export async function getJuicePrice(): Promise<number | null> {
  const result = await query('*juice-price*');
  if (typeof result.value === 'number') {
    return result.value;
  }
  return null;
}

/**
 * Get total coin supply from the network.
 * Returns raw value - Convex Coins are measured in Coppers (smallest unit).
 * 1 Convex Coin = 10^9 Coppers, so ~1B supply = ~10^18 Coppers.
 * We return the value formatted for display.
 */
export async function getCoinSupply(): Promise<number | null> {
  const result = await query('(coin-supply)');
  if (typeof result.value === 'number') {
    // Return raw value - let the UI format it appropriately
    return result.value;
  }
  return null;
}

/**
 * Execute a transaction (costs Juice, requires account).
 * For the sandbox, we use query for evaluation since it's free.
 */
export async function evaluateExpression(source: string): Promise<ConvexResponse> {
  // Use query for evaluation - it's free and works for most expressions
  return query(source);
}
