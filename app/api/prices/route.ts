import { NextResponse } from 'next/server';
import { getCompleteMarketData } from '@/lib/market-service';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const data = await getCompleteMarketData();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching market data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch real-time market data' },
      { status: 500 }
    );
  }
}
