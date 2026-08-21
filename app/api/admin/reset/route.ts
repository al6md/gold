import { NextRequest, NextResponse } from 'next/server';
import { clearOverrides, setSiyaghaFee, getCompleteMarketData } from '@/lib/market-service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pin } = body;

    const validPin = process.env.ADMIN_PIN || '123456';
    if (pin !== validPin) {
      return NextResponse.json(
        { success: false, message: 'رمز الدخول السري غير صحيح' },
        { status: 401 }
      );
    }

    clearOverrides();
    setSiyaghaFee(10000);

    const freshData = await getCompleteMarketData();

    return NextResponse.json({
      success: true,
      message: 'تمت استعادة الأسعار المباشرة التلقائية بنجاح',
      data: freshData
    });
  } catch (error) {
    console.error('Reset error:', error);
    return NextResponse.json(
      { success: false, message: 'فشل في إعادة ضبط الأسعار' },
      { status: 500 }
    );
  }
}
