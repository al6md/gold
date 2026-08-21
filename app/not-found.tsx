import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto my-16 text-center space-y-4 p-8 bg-slate-900/40 border border-slate-800 rounded-2xl">
      <div className="text-4xl font-extrabold text-amber-500 font-mono">404</div>
      <h1 className="text-xl font-bold text-white font-sans">الصفحة غير موجودة</h1>
      <p className="text-xs text-slate-400 font-sans">
        عذراً، الرابط المطلوب غير متوفر حالياً في بورصة العراق.
      </p>
      <Link
        href="/"
        className="inline-block px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
