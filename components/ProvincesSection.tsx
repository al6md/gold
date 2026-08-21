'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Calculator,
  ExternalLink
} from 'lucide-react';
import { useMarket } from '@/context/MarketContext';

interface ProvincesSectionProps {
  isFullPage?: boolean;
}

export function ProvincesSection({ isFullPage = false }: ProvincesSectionProps) {
  const { provinces } = useMarket();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const regions = [
    { id: 'all', label: 'كافة المحافظات' },
    { id: 'baghdad', label: 'العاصمة بغداد' },
    { id: 'kurdistan', label: 'إقليم كردستان' },
    { id: 'middle_euphrates', label: 'الفرات الأوسط' },
    { id: 'south', label: 'المنطقة الجنوبية' },
    { id: 'north', label: 'المنطقة الشمالية' },
    { id: 'west', label: 'المنطقة الغربية' },
  ];

  const filteredProvinces = provinces.filter((prov) => {
    const matchesSearch =
      prov.province_ar.includes(searchTerm) ||
      prov.province_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prov.market_name.includes(searchTerm);

    const matchesRegion = selectedRegion === 'all' || prov.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  const displayedProvinces = isFullPage ? filteredProvinces : filteredProvinces.slice(0, 8);

  return (
    <section className="space-y-4">
      {/* Section Header matching variation: Title + Upper Terminal Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#1a1a1a] pb-3">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl text-[#1a1a1a]">
            حركة المحافظات
          </h2>
          <p className="text-xs text-[#1a1a1a]/60 mt-0.5">
            أسعار صرف الدولار في البورصات الرئيسية والأسواق المحلية (لكل $100)
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="terminal-label bg-[#1a1a1a]/5 px-2.5 py-1 rounded">
            {provinces.length} Active Exchanges
          </div>
          {!isFullPage && (
            <Link
              href="/provinces"
              className="text-xs font-bold text-[#b45309] hover:underline flex items-center gap-1 font-mono-data"
            >
              <span>VIEW ALL</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>

      {/* Controls: Search & Region Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-2">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1a1a1a]/40" />
          <input
            type="text"
            id="province-search-input"
            placeholder="ابحث عن محافظة (أربيل، البصرة، كربلاء)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
            suppressHydrationWarning
            className="w-full bg-white border border-[#1a1a1a]/15 rounded-md pr-10 pl-4 py-2 text-xs sm:text-sm text-[#1a1a1a] placeholder-[#1a1a1a]/40 focus:outline-none focus:border-[#1a1a1a] transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => setSelectedRegion(reg.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRegion === reg.id
                  ? 'bg-[#1a1a1a] text-white font-bold'
                  : 'bg-white text-[#1a1a1a]/70 hover:text-[#1a1a1a] border border-[#1a1a1a]/10 hover:border-[#1a1a1a]/30'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>
      </div>

      {/* Editorial Terminal Table */}
      <div className="overflow-x-auto border border-[#1a1a1a]/10 bg-white rounded-lg shadow-sm">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b-2 border-[#1a1a1a] bg-[#f8f7f4]/60 text-xs font-mono-data font-bold text-[#1a1a1a]">
              <th className="py-3 px-4 text-right">المحافظة / السوق</th>
              <th className="py-3 px-4 text-center">الشراء ($100)</th>
              <th className="py-3 px-4 text-center text-[#b45309]">البيع ($100)</th>
              <th className="py-3 px-4 text-center hidden md:table-cell">الفارق (السبريد)</th>
              <th className="py-3 px-4 text-center">التغير اليومي</th>
              <th className="py-3 px-4 text-left font-sans">حاسبة</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a1a1a]/10 text-xs sm:text-sm">
            {displayedProvinces.map((prov) => {
              const isUp = prov.change_iqd >= 0;
              const spread = prov.sell_price - prov.buy_price;

              return (
                <tr
                  key={prov.id}
                  className="hover:bg-[#f8f7f4] transition-colors group"
                >
                  {/* Province & Market */}
                  <td className="py-3.5 px-4 font-bold text-[#1a1a1a]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b45309] shrink-0" />
                      <div>
                        <span className="block font-black text-sm">{prov.province_ar}</span>
                        <span className="text-[11px] text-[#1a1a1a]/50 font-normal font-mono-data">
                          {prov.market_name}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Buy Price */}
                  <td className="py-3.5 px-4 text-center font-mono-data font-bold text-[#1a1a1a] text-sm sm:text-base">
                    {prov.buy_price.toLocaleString('en-US')}
                  </td>

                  {/* Sell Price (Styled with Accent) */}
                  <td className="py-3.5 px-4 text-center font-mono-data font-black text-[#b45309] text-sm sm:text-base">
                    {prov.sell_price.toLocaleString('en-US')}
                  </td>

                  {/* Spread */}
                  <td className="py-3.5 px-4 text-center font-mono-data text-[#1a1a1a]/60 hidden md:table-cell text-xs">
                    {spread.toLocaleString('en-US')} د.ع
                  </td>

                  {/* Change in Emerald */}
                  <td className="py-3.5 px-4 text-center font-mono-data font-bold">
                    <span className={isUp ? 'text-[#065f46]' : 'text-[#b45309]'}>
                      {isUp ? '+' : ''}{prov.change_iqd}
                    </span>
                  </td>

                  {/* Calculate CTA */}
                  <td className="py-3.5 px-4 text-left">
                    <Link
                      href={`/calculator?rate=${prov.sell_price}&province=${encodeURIComponent(prov.province_ar)}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#1a1a1a]/5 hover:bg-[#1a1a1a] text-[#1a1a1a] hover:text-white text-xs font-semibold transition-colors"
                      title="تحويل العملة بهذا السعر"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">احسب</span>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredProvinces.length === 0 && (
          <div className="text-center py-12 text-[#1a1a1a]/60 text-sm font-mono-data">
            NO EXCHANGES FOUND MATCHING &quot;{searchTerm}&quot;
          </div>
        )}
      </div>

      {/* Analysis section if on full page */}
      {isFullPage && (
        <div className="mt-8 pt-6 border-t-2 border-[#1a1a1a]/10 space-y-4">
          <div className="terminal-label">Market Analysis</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="terminal-card p-4 rounded-md">
              <h4 className="font-bold text-[#b45309] text-sm mb-1">كربلاء المقدسة والنجف الأشرف</h4>
              <p className="text-xs text-[#1a1a1a]/80 leading-relaxed">
                نشاط نقدي مستمر مع حركة السياحة والزائرين، وتقارب متواصل مع أسعار بورصة الكفاح المركزية في بغداد.
              </p>
            </div>
            <div className="terminal-card p-4 rounded-md">
              <h4 className="font-bold text-[#b45309] text-sm mb-1">أربيل والسليمانية (إقليم كردستان)</h4>
              <p className="text-xs text-[#1a1a1a]/80 leading-relaxed">
                مرونة وسيولة عالية في بورصة أربيل مع حركة التجارة الإقليمية والاستيراد.
              </p>
            </div>
            <div className="terminal-card p-4 rounded-md">
              <h4 className="font-bold text-[#b45309] text-sm mb-1">البصرة (سوق العشار)</h4>
              <p className="text-xs text-[#1a1a1a]/80 leading-relaxed">
                سوق العشار يمثل الشريان المالي للقطاع التجاري والموانئ في جنوب العراق.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
