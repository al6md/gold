'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Scale,
  DollarSign,
  ShieldAlert,
  Info,
  BookOpen
} from 'lucide-react';

export function MarketGuideSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const guideItems = [
    {
      title: 'كيف يتم حساب سعر مثقال الذهب في السوق العراقي؟',
      icon: Scale,
      content: `المثقال العراقي يزن قانونياً 5 غرامات صافية. يُحسب سعره بالمعادلة التالية:
1. قسمة سعر أونصة الذهب العالمية على وزن الأونصة (31.1035 غرام) للحصول على سعر الغرام عيار 24 بالدولار.
2. ضرب سعر الغرام في 5 (وزن المثقال) ثم ضربه في نسبة نقاوة العيار (مثلاً 0.875 لعيار 21، أو 0.750 لعيار 18).
3. ضرب الناتج بسعر صرف الدولار الموازي في بورصة الكفاح، فتظهر القيمة الصافية بالدينار العراقي قبل إضافة أجور الصياغة.`,
    },
    {
      title: 'ما الفرق بين سعر البنك المركزي الرسمي وسعر بورصة الكفاح الموازي؟',
      icon: DollarSign,
      content: `• السعر الرسمي: مثبت من البنك المركزي العراقي عند 1,320 دينار لكل دولار (132,000 د.ع لكل 100$) ومخصص للاستيرادات الرسمية والمسافرين عبر المنصة الإلكترونية.
• السعر الموازي: هو السعر النقدي الفعلي المتداول في بورصات الكفاح، الحارثية، أربيل، والبصرة، ويخضع مباشرة لآليات العرض والطلب والسيولة النقدية المتداولة في الأسواق.`,
    },
    {
      title: 'كم تبلغ أجور الصياغة المعتادة في محلات الصاغة؟',
      icon: Info,
      content: `تختلف أجور الصياغة التقديرية حسب مصدر المشغولات وتعقيد النقوش:
• الذهب العراقي المحلي: تتراوح صياغته عادة بين 7,000 إلى 12,000 دينار للمثقال.
• الذهب الخليجي والتركي: تتراوح صياغته بين 12,000 إلى 18,000 دينار للمثقال.
• الذهب الإيطالي (عيار 18) والمشغولات الليزرية: قد تصل الصياغة إلى 20,000 إلى 25,000 دينار للمثقال.`,
    },
    {
      title: 'نصائح هامة لحماية نفسك عند بيع أو شراء الذهب',
      icon: ShieldAlert,
      content: `1. اطلب دائماً فاتورة رسمية مختومة ومفصلة تتضمن (الوزن بالمليغرام، العيار، وسعر الغرام، وأجر الصياغة المنفصل).
2. تأكد من وجود الختم الرقابي الرسمي (وسم التقييس والسيطرة النوعية العراقي).
3. تابع أسعار الصرف الحية قبل الذهاب للسوق لتعرف السعر العادل للغرام والمثقال دون استغلال الفروقات.`,
    },
  ];

  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#1a1a1a] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#b45309]" />
            <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a]">
              دليل السوق والمواطن العراقي
            </h2>
          </div>
          <p className="text-xs text-[#1a1a1a]/60 mt-0.5 font-sans">
            معلومات وشفافية مالية لمساعدتك في فهم حركة الأسعار وحسابات الصاغة
          </p>
        </div>

        <div className="terminal-label bg-[#1a1a1a]/5 px-2.5 py-1 rounded self-start sm:self-auto">
          KNOWLEDGE BASE
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {guideItems.map((item, idx) => {
          const Icon = item.icon;
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="terminal-card rounded-lg overflow-hidden border border-[#1a1a1a]/15 bg-white transition-all shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-4 flex items-center justify-between gap-3 text-right hover:bg-[#f8f7f4] transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#b45309]/10 text-[#b45309] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-sm sm:text-base text-[#1a1a1a]">
                    {item.title}
                  </span>
                </div>

                <ChevronDown
                  className={`w-4 h-4 text-[#1a1a1a]/50 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#b45309]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="p-4 pt-2 border-t border-[#1a1a1a]/10 bg-[#f8f7f4]/40">
                  <p className="text-xs sm:text-sm text-[#1a1a1a]/80 leading-relaxed whitespace-pre-line font-sans">
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
