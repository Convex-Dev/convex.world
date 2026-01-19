import { NextResponse } from 'next/server';

const DEFAULT_PEER_URL = 'https://peer.convex.live';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const peerUrl = request.headers.get('x-convex-peer') || DEFAULT_PEER_URL;

    const response = await fetch(`${peerUrl}/api/v1/transact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        {
          errorCode: 'PEER_ERROR',
          errorMessage: `Peer returned ${response.status}: ${text}`,
        },
        { status: response.status }
      );
    }

    if (!text || text.trim() === '') {
      return NextResponse.json({ value: null });
    }

    try {
      return NextResponse.json(JSON.parse(text));
    } catch {
      return NextResponse.json({ value: text });
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Convex Transact] Error:', msg);
    return NextResponse.json(
      { errorCode: 'NETWORK', errorMessage: msg },
      { status: 502 }
    );
  }
}
