import { NextResponse } from 'next/server';

const CONVEX_PEER_URL = 'https://peer.convex.live';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${CONVEX_PEER_URL}/api/v1/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Peer returned ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Convex query proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to reach Convex peer' },
      { status: 502 }
    );
  }
}
