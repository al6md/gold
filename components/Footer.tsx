'use client';

import React from 'react';
import Link from 'next/link';
import { Coins, ShieldCheck, Heart, Radio, ArrowUp, Send, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090d] border-t border-slate-800 text-slate-400 text-xs mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-[#0c0e14] rounded-[10px] flex items-center justify-center">
                  <Coins className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white">
                  بورصة <span className="text-amber-400">العراق</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  منصة تتبع أسعار الذهب والدولار في العراق
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg">
              المنصة العراقية الأولى والمجانية 100% لمتابعة أسعار صرف الدولار لحظة بلحظة في بورصات الكفاح، الحارثية، أربيل، والبصرة، بالإضافة إلى حساب سعر مثقال الذهب عيار 21 و24 و22 بدقة تامة وبدون أي اشتراكات مدفوعة.
            </p>

            <div className="flex items-center gap-3 text-xs text-amber-400 font-semibold pt-1">
              <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                <ShieldCheck className="w-4 h-4" />
                بيانات مجانية ومفتوحة المصدر للجميع
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">أقسام الموقع</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-400 transition-colors">
                  الرئيسية (أسعار اليوم)
                </Link>
              </li>
              <li>
                <Link href="/provinces" className="hover:text-amber-400 transition-colors">
                  سعر الدولار في المحافظات
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-amber-400 transition-colors">
                  حاسبة الدولار والذهب
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-amber-400 transition-colors">
                  لوحة الإدارة والتحكم
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Trust */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm">المصادر المعتمدة</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                البنك المركزي العراقي (CBI)
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                بورصة الكفاح وبورصة الحارثية
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                سوق الصاغة بشارع النهر بغداد
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                البورصة العالمية للمعادن (Spot Live)
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & Scroll to top */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-center sm:text-right">
            © {new Date().getFullYear()} بورصة العراق - جميع الحقوق محفوظة. الأسعار استرشادية وتخضع لتقلبات العرض والطلب.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-800 text-xs transition-colors"
          >
            <span>إلى الأعلى</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
