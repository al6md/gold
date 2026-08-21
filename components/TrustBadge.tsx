'use client';

import React from 'react';
import { ShieldCheck, CheckCircle2, Radio } from 'lucide-react';
import { useMarket } from '@/context/MarketContext';

export function TrustBadge() {
  const { announcement } = useMarket();

  return (
    <div className="terminal-card p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-r-4 border-r-[#b45309]">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded bg-[#b45309]/10 border border-[#b45309]/20 flex items-center justify-center text-[#b45309] shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#1a1a1a]">المصدر المعتمد:</span>
            <span className="text-xs text-[#1a1a1a]/80 font-semibold">بورصة الكفاح والحارثية + البنك المركزي العراقي (CBI)</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#065f46] inline" />
          </div>
          <p className="text-xs text-[#1a1a1a]/60 mt-0.5 leading-relaxed font-sans">
            {announcement || 'أسعار حية ومحدثة لحظة بلحظة لكافة المحافظات بدون عمولات أو إعلانات مضللة.'}
          </p>
        </div>
      </div>

      <div className="self-start sm:self-auto flex items-center gap-1.5 text-[11px] font-mono-data font-bold text-[#065f46] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
        <Radio className="w-3 h-3 text-[#065f46]" />
        <span>VERIFIED SPOT DATA</span>
      </div>
    </div>
  );
}
