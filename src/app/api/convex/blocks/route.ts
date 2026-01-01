import { NextResponse } from 'next/server';

const CONVEX_PEER_URL = 'https://peer.convex.live';

export async function GET() {
  try {
    // Get recent blocks to determine current block height
    const response = await fetch(`${CONVEX_PEER_URL}/api/v1/blocks?limit=1`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log('[Convex Blocks] Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Peer returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('[Convex Blocks] Response:', JSON.stringify(data).slice(0, 200));
    return NextResponse.json(data);
  } catch (error) {
    console.error('[Convex Blocks] Error:', error);
    return NextResponse.json(
      { error: 'Failed to reach Convex peer' },
      { status: 502 }
    );
  }
}
