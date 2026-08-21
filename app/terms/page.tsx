import type { Metadata } from 'next';
import Link from 'next/link';
import { FileCheck, ArrowRight, ShieldAlert, AlertCircle, RefreshCw } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'شروط الاستخدام وإخلاء المسؤولية - بورصة العراق',
  description: 'شروط استخدام منصة بورصة العراق وإخلاء المسؤولية المالية حول أسعار الصرف والذهب.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#1a1a1a] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href="/"
              className="text-xs font-mono-data text-[#1a1a1a]/60 hover:text-[#b45309] flex items-center gap-1"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>العودة للرئيسية</span>
            </Link>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#1a1a1a]">
            شروط الاستخدام وإخلاء المسؤولية
          </h1>
          <p className="text-xs text-[#1a1a1a]/60 mt-1 font-sans">
            Terms of Service & Financial Disclaimer
          </p>
        </div>

        <div className="terminal-label bg-[#1a1a1a]/5 px-3 py-1.5 rounded flex items-center gap-1.5 self-start sm:self-auto">
          <FileCheck className="w-4 h-4 text-[#b45309]" />
          <span>LEGAL TERMS</span>
        </div>
      </div>

      {/* Content */}
      <div className="terminal-card p-6 sm:p-8 rounded-lg bg-white space-y-6 text-sm text-[#1a1a1a]/85 leading-relaxed font-sans shadow-sm border border-[#1a1a1a]/15">
        
        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#1a1a1a]">
            1. طبيعة المنصة والخدمة المقدمة
          </h2>
          <p>
            موقع <strong>بورصة العراق</strong> هو منصة إعلامية وإرشادية مستقلة تهدف إلى توفير معلومات استرشادية حول أسعار صرف العملات والذهب في المحافظات والبورصات العراقية (مثل بورصة الكفاح، الحارثية، أربيل، البصرة) والأسواق العالمية.
          </p>
        </section>

        <section className="space-y-3 bg-amber-50/70 p-4 rounded-lg border border-amber-200">
          <h2 className="font-display text-lg font-bold text-[#b45309] flex items-center gap-2">
            <ShieldAlert className="w-5 h-5" />
            <span>2. إخلاء المسؤولية المالية (Financial Disclaimer)</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#1a1a1a]/90">
            الأسعار والأرقام والحسابات المعروضة في الموقع والحاسبات هي لأغراض <strong>إعلامية واسترشادية عامة فقط</strong>. نظراً للطبيعة المتغيرة والديناميكية لأسواق الصرف وتداول الذهب، قد تختلف الأسعار الفعلية لحظياً بين محل صرافة وآخر أو بين صائغ وآخر. الموقع لا يقدم أي استشارات استثمارية أو مالية ولا يتحمل أي مسؤولية قانونية أو مالية ناجمة عن أي قرارات تداول أو شراء أو بيع مبنية على هذه البيانات.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#1a1a1a]">
            3. حقوق الملكية الفكرية
          </h2>
          <p>
            كافة التصاميم والشفرات البرمجية والأدوات الحسابية ونظام التحويل التفاعلي هي حقوق حصرية لمنصة بورصة العراق. يُسمح بمشاركة النشرات المكتوبة ومقتطفات الأسعار مع الإشارة إلى المصدر.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#1a1a1a]">
            4. التعديل على الشروط
          </h2>
          <p>
            نحتفظ بالحق في تعديل هذه الشروط في أي وقت لمواكبة التحديثات القانونية والتقنية. استمرارك في استخدام الموقع بعد إجراء أي تعديلات يُعد قبولاً ضمنياً بها.
          </p>
        </section>

        <div className="border-t border-[#1a1a1a]/10 pt-4 flex items-center justify-between">
          <span className="text-xs text-[#1a1a1a]/60 font-mono-data">IRAQ EXCHANGE TERMINAL • LEGAL COMPLIANCE</span>
          <Link
            href="/"
            className="px-4 py-2 bg-[#1a1a1a] text-white rounded font-mono-data text-xs font-bold hover:bg-black transition-colors"
          >
            RETURN HOME
          </Link>
        </div>

      </div>
    </div>
  );
}
