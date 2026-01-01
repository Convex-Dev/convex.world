import { NextResponse } from 'next/server';

const CONVEX_PEER_URL = 'https://peer.convex.live';

export async function GET() {
  try {
    const response = await fetch(`${CONVEX_PEER_URL}/api/v1/status`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Peer returned ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Convex status proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to reach Convex peer' },
      { status: 502 }
    );
  }
}
