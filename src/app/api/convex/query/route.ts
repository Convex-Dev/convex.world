import { NextResponse } from 'next/server';

const DEFAULT_PEER_URL = 'https://peer.convex.live';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const peerUrl = request.headers.get('x-convex-peer') || DEFAULT_PEER_URL;

    // Measure server-side latency to peer (actual network finality indicator)
    const startTime = performance.now();

    const response = await fetch(`${peerUrl}/api/v1/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const peerLatencyMs = Math.round(performance.now() - startTime);
    const responseText = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { errorCode: 'PEER_ERROR', errorMessage: `Peer returned ${response.status}: ${responseText}` },
        { status: response.status }
      );
    }

    // Handle empty response
    if (!responseText || responseText.trim() === '') {
      return NextResponse.json({ value: null, peerLatencyMs });
    }

    try {
      const data = JSON.parse(responseText);
      return NextResponse.json({ ...data, peerLatencyMs });
    } catch {
      // If response isn't JSON, return as value
      return NextResponse.json({ value: responseText, peerLatencyMs });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Convex Query] Error:', errorMessage);
    return NextResponse.json(
      { errorCode: 'NETWORK', errorMessage },
      { status: 502 }
    );
  }
}
