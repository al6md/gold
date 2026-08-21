import { NextRequest, NextResponse } from 'next/server';
import { setOverride, setSiyaghaFee, setAnnouncement, getCompleteMarketData } from '@/lib/market-service';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pin, province_id, buy_price, sell_price, siyagha_fee, announcement } = body;

    const validPin = process.env.ADMIN_PIN || '123456';
    if (pin !== validPin) {
      return NextResponse.json(
        { success: false, message: 'رمز الدخول السري غير صحيح (PIN خاطئ)' },
        { status: 401 }
      );
    }

    if (province_id && buy_price && sell_price) {
      setOverride(province_id, Number(buy_price), Number(sell_price));
    }

    if (siyagha_fee !== undefined && !isNaN(Number(siyagha_fee))) {
      setSiyaghaFee(Number(siyagha_fee));
    }

    if (typeof announcement === 'string') {
      setAnnouncement(announcement);
    }

    const updatedData = await getCompleteMarketData();

    return NextResponse.json({
      success: true,
      message: 'تم تحديث الأسعار والإعدادات بنجاح',
      data: updatedData
    });
  } catch (error) {
    console.error('Admin override error:', error);
    return NextResponse.json(
      { success: false, message: 'حدث خطأ أثناء معالجة الطلب' },
      { status: 500 }
    );
  }
}
