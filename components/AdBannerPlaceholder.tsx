'use client';

import React from 'react';

interface AdSlotProps {
  slotId?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

export function AdBannerPlaceholder({
  slotId = '0000000000',
  format = 'auto',
  className = '',
}: AdSlotProps) {
  // In production, when the client puts their AdSense code, this will render the real ins tag
  return (
    <div
      className={`w-full my-4 p-3 rounded-lg border border-dashed border-[#1a1a1a]/20 bg-[#f8f7f4] flex flex-col items-center justify-center min-h-[90px] text-center overflow-hidden ${className}`}
    >
      <span className="text-[10px] font-mono-data text-[#1a1a1a]/40 uppercase tracking-wider mb-1">
        SPONSORED ADVERTISEMENT • إعلان
      </span>
      <div className="text-xs text-[#1a1a1a]/60 font-mono-data">
        {/* Placeholder ready for AdSense code */}
        [مساحة إعلانية متوافقة مع Google AdSense]
      </div>
    </div>
  );
}
