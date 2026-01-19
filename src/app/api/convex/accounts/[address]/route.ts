import { NextResponse } from 'next/server';

const DEFAULT_PEER_URL = 'https://peer.convex.live';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ address: string }> }
) {
  try {
    const { address } = await params;
    if (!address || !/^\d+$/.test(address)) {
      return NextResponse.json(
        { errorCode: 'INVALID_ADDRESS', errorMessage: 'Address must be a numeric account ID' },
        { status: 400 }
      );
    }

    const peerUrl = request.headers.get('x-convex-peer') || DEFAULT_PEER_URL;
    const response = await fetch(`${peerUrl}/api/v1/accounts/${address}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json(
        { errorCode: 'PEER_ERROR', errorMessage: `Peer returned ${response.status}: ${text}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Convex Accounts] Error:', errorMessage);
    return NextResponse.json(
      { errorCode: 'NETWORK', errorMessage },
      { status: 502 }
    );
  }
}
