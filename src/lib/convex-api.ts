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
        address: address || '0x0000000000000000000000000000000000000000000000000000000000000000',
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Convex query error:', error);
    return { 
      errorCode: 'NETWORK', 
      errorMessage: error instanceof Error ? error.message : 'Network error' 
    };
  }
}

/**
 * Get the current network status from a Convex peer.
 */
export async function getNetworkStatus(): Promise<NetworkStatus | null> {
  try {
    const response = await fetch(`${API_BASE}/status`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return {
      consensusPoint: data['consensus-point'] || data.consensusPoint || 0,
      state: data.state || '',
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Convex status error:', error);
    return null;
  }
}

/**
 * Get account information by address.
 * Uses query to fetch balance and account data.
 */
export async function getAccountInfo(address: string): Promise<AccountInfo | null> {
  try {
    // Use query to get balance
    const balanceResult = await query(`(balance ${address})`);
    const balance = typeof balanceResult.value === 'number' ? balanceResult.value : 0;
    
    // Use query to get account info
    const infoResult = await query(`(account ${address})`);
    
    return {
      address: address,
      balance: balance,
      memorySize: 0,
      sequence: 0,
      type: 'user',
    };
  } catch (error) {
    console.error('Convex account error:', error);
    return null;
  }
}

/**
 * Resolve a CNS name to an address.
 */
export async function resolveCNS(name: string): Promise<string | null> {
  const result = await query(`(call *registry* (cns-resolve "${name}"))`);
  if (result.value && typeof result.value === 'string') {
    return result.value;
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
 * Faucet request - get free test coins.
 * Note: Faucet requires direct peer access, not currently proxied.
 */
export async function requestFaucet(): Promise<{ address: string; balance: number } | null> {
  // Faucet functionality would need its own proxy route
  console.warn('Faucet not implemented via proxy');
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
