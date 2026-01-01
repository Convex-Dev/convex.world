import { NextResponse } from 'next/server';

const CONVEX_PEER_URL = 'https://peer.convex.live';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log('[Convex Query] Request:', JSON.stringify(body));
    
    const response = await fetch(`${CONVEX_PEER_URL}/api/v1/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const responseText = await response.text();
    console.log('[Convex Query] Response status:', response.status);
    console.log('[Convex Query] Response body:', responseText);

    if (!response.ok) {
      return NextResponse.json(
        { errorCode: 'PEER_ERROR', errorMessage: `Peer returned ${response.status}: ${responseText}` },
        { status: response.status }
      );
    }

    // Handle empty response
    if (!responseText || responseText.trim() === '') {
      return NextResponse.json({ value: null });
    }

    try {
      const data = JSON.parse(responseText);
      return NextResponse.json(data);
    } catch {
      // If response isn't JSON, return as value
      return NextResponse.json({ value: responseText });
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
