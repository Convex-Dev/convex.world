import { NextResponse } from 'next/server';

const CONVEX_PEER_URL = 'https://peer.convex.live';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ hex: string }> }
) {
  try {
    const { hex } = await params;
    if (!hex || !/^[0-9a-fA-F]+$/.test(hex)) {
      return new NextResponse(null, { status: 400 });
    }

    const response = await fetch(`${CONVEX_PEER_URL}/identicon/${hex}`, {
      method: 'GET',
      headers: { Accept: 'image/png' },
    });

    if (!response.ok) {
      return new NextResponse(null, { status: response.status });
    }

    const buf = await response.arrayBuffer();
    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('[Convex Identicon] Error:', error);
    return new NextResponse(null, { status: 502 });
  }
}
