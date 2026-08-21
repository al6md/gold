import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, ArrowRight, Lock, Eye, FileText, CheckCircle2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'سياسة الخصوصية - بورصة العراق',
  description: 'سياسة الخصوصية وحماية بيانات المستخدمين المعتمدة لدى منصة بورصة العراق وأسعار الذهب والدولار وفق معايير Google AdSense.',
};

export default function PrivacyPolicyPage() {
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
            سياسة الخصوصية (Privacy Policy)
          </h1>
          <p className="text-xs text-[#1a1a1a]/60 mt-1 font-sans">
            تاريخ آخر تحديث: 15 أغسطس 2026 - متوافقة مع متطلبات Google AdSense وحماية البيانات
          </p>
        </div>

        <div className="terminal-label bg-[#065f46]/10 text-[#065f46] border border-[#065f46]/20 px-3 py-1.5 rounded flex items-center gap-1.5 self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4" />
          <span>ADSENSE COMPLIANT</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="terminal-card p-6 sm:p-8 rounded-lg bg-white space-y-6 text-sm text-[#1a1a1a]/85 leading-relaxed font-sans shadow-sm border border-[#1a1a1a]/15">
        
        {/* Intro */}
        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#1a1a1a] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#b45309]" />
            <span>1. مقدمة وترحيب</span>
          </h2>
          <p>
            أهلاً بكم في منصة <strong>بورصة العراق</strong> (الموقع المتخصص في متابعة أسعار الذهب والدولار والعملات الأجنبية في العراق). نحن نولي اهتماماً فائقاً وسرية تامة لخصوصية زوارنا ومستخدمينا. توضح هذه الوثيقة طبيعة المعلومات التي قد نتلقاها ونجمعها عند زيارتكم للموقع وكيفية حمايتها.
          </p>
        </section>

        {/* Log Files */}
        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#1a1a1a] flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#b45309]" />
            <span>2. ملفات السجل (Log Files)</span>
          </h2>
          <p>
            مثل معظم خوادم المواقع الإلكترونية، يستخدم موقع بورصة العراق ملفات السجل القياسية. تتضمن المعلومات الموجودة داخل ملفات السجل: عناوين بروتوكول الإنترنت (IP)، نوع المتصفح ومزود خدمة الإنترنت (ISP)، الطابع الزمني وتاريخ الزيارة، والصفحات التي تمت زيارتها. هذه المعلومات تُستخدم حصرياً لتحليل الاتجاهات وإدارة الموقع وتحسين سرعة التصفح ولا ترتبط بأي معلومات شخصية تحدد هويتك.
          </p>
        </section>

        {/* Cookies & Google AdSense */}
        <section className="space-y-3 bg-[#f8f7f4] p-4 rounded-lg border border-[#1a1a1a]/10">
          <h2 className="font-display text-lg font-bold text-[#1a1a1a] flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#b45309]" />
            <span>3. ملفات تعريف الارتباط (Cookies) وشبكة إعلانات Google AdSense</span>
          </h2>
          <p>
            نحن وشركاؤنا الإعلانيون (بما في ذلك شركة Google وشركائها من أطراف ثالثة) نستخدم ملفات تعريف الارتباط لتقديم تجربة تصفح أفضل:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pr-2 text-xs sm:text-sm">
            <li>
              <strong>ملفات تعريف الارتباط من Google:</strong> تستخدم Google ملفات تعريف الارتباط (مثل ملف تعريف الارتباط DoubleClick DART) لعرض الإعلانات على موقعنا بناءً على زيارات المستخدم السابقة لموقعنا أو لمواقع أخرى على الإنترنت.
            </li>
            <li>
              <strong>إلغاء الاشتراك في الإعلانات المخصصة:</strong> يمكن للمستخدمين إلغاء الاشتراك في الإعلانات المخصصة عبر زيارة{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noreferrer noopener"
                className="text-[#b45309] underline font-bold"
              >
                إعدادات إعلانات Google
              </a>.
            </li>
            <li>
              يمكنك أيضاً تعطيل ملفات تعريف الارتباط من خلال خيارات المتصفح الخاص بك في أي وقت.
            </li>
          </ul>
        </section>

        {/* Third-Party Privacy Policies */}
        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#1a1a1a] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#b45309]" />
            <span>4. سياسات خصوصية الجهات الخارجية</span>
          </h2>
          <p>
            لا تنطبق سياسة خصوصية موقع بورصة العراق على المعلنين أو المواقع الأخرى التي قد تظهر روابطها في موقعنا. نحن ننصحك بمراجعة سياسات الخصوصية المعنية لخوادم إعلانات هذه الجهات الخارجية للحصول على معلومات أكثر تفصيلاً حول ممارساتها.
          </p>
        </section>

        {/* Child Protection */}
        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#1a1a1a]">
            5. خصوصية الأطفال والقصّر
          </h2>
          <p>
            حماية الأطفال عبر الإنترنت أمر بالغ الأهمية بالنسبة لنا. نحن لا نجمع عن علم أي معلومات تعريف شخصية من الأطفال دون سن 13 عاماً. إذا كنت تعتقد أن طفلك قد قدم هذا النوع من المعلومات على موقعنا، فإننا نشجعك بشدة على الاتصال بنا فوراً لحذفها.
          </p>
        </section>

        {/* User Rights */}
        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#1a1a1a]">
            6. حقوق المستخدم والموافقة
          </h2>
          <p>
            باستخدامك لموقعنا، فإنك تقر وتوافق على سياسة الخصوصية الخاصة بنا وشروط استخدام الموقع المعمول بها.
          </p>
        </section>

        {/* Contact Info */}
        <div className="border-t border-[#1a1a1a]/10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span>لأي استفسار بخصوص سياسة الخصوصية، يرجى مراجعة صفحة <Link href="/contact" className="text-[#b45309] font-bold underline">اتصل بنا</Link>.</span>
          <Link
            href="/"
            className="px-4 py-2 bg-[#1a1a1a] text-white rounded font-mono-data font-bold hover:bg-black transition-colors shrink-0"
          >
            RETURN HOME
          </Link>
        </div>

      </div>
    </div>
  );
}
