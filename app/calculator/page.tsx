import { Suspense } from 'react';
import type { Metadata } from 'next';
import { CalculatorView } from '@/components/CalculatorView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'حاسبة الدولار والذهب في العراق - تحويل فوري ودقيق',
  description: 'حاسبة تحويل الدولار إلى الدينار العراقي وسعر مثقال الذهب عيار 21 و24 وحساب أجور الصياغة وزكاة الذهب الشرعية.',
};

export default function CalculatorPage() {
  return (
    <Suspense
      fallback={
        <div className="text-center py-20 text-slate-400 font-bold">
          جاري تحميل الحاسبة المالية...
        </div>
      }
    >
      <CalculatorView />
    </Suspense>
  );
}
