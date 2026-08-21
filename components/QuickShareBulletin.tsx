'use client';

import React, { useState, useEffect } from 'react';
import {
  Share2,
  Copy,
  Check,
  Send,
  MessageCircle,
  Clock,
  Sparkles,
  RefreshCw,
  TrendingUp,
  Download
} from 'lucide-react';
import { useMarket } from '@/context/MarketContext';

export function QuickShareBulletin() {
  const { summary, provinces, goldPrices, isRefreshing, refreshData, timeAgoText } = useMarket();
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(45);

  // Auto-refresh countdown visual effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 45;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const baghdad = provinces.find((p) => p.id === 'baghdad_kifah') || provinces[0];
  const erbil = provinces.find((p) => p.id === 'erbil') || provinces[2];
  const basra = provinces.find((p) => p.id === 'basra') || provinces[4];
  const gold21k = goldPrices.find((g) => g.karat === 21);

  const getFormattedBulletin = () => {
    const now = new Date();
    const timeStr = new Intl.DateTimeFormat('ar-IQ', {
      timeZone: 'Asia/Baghdad',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(now);

    return `📊 نشرة أسعار الصرف والذهب في العراق 🇮🇶
⏰ التوقيت: ${timeStr} بتوقيت بغداد

💵 الدولار مقابل الدينار (لكل $100):
• بغداد (الكفاح): بيع ${baghdad?.sell_price?.toLocaleString('en-US')} / شراء ${baghdad?.buy_price?.toLocaleString('en-US')} د.ع
• أربيل: بيع ${erbil?.sell_price?.toLocaleString('en-US')} د.ع
• البصرة: بيع ${basra?.sell_price?.toLocaleString('en-US')} د.ع
• السعر الرسمي (البنك المركزي): ${(summary?.cbi_official_rate || 1320) * 100} د.ع

🟡 أسعار الذهب (المثقال = 5 غرام):
• عيار 21: ${gold21k?.mithqal_iqd?.toLocaleString('en-US')} د.ع
• عيار 24: ${goldPrices.find((g) => g.karat === 24)?.mithqal_iqd?.toLocaleString('en-US')} د.ع
• عيار 18: ${goldPrices.find((g) => g.karat === 18)?.mithqal_iqd?.toLocaleString('en-US')} د.ع
• الأونصة عالمياً: $${summary?.gold_ounce_usd?.toFixed(2) || '4377.60'}

📌 المصدر المعتمد: بورصة العراق (بورصتا الكفاح والحارثية + Spot Live)
🌐 تابع الأسعار لحظياً: https://ais-dev-olwv3xy5na35eb2oo4r5vw-254250167233.europe-west2.run.app`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFormattedBulletin());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getFormattedBulletin());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleTelegramShare = () => {
    const text = encodeURIComponent(getFormattedBulletin());
    window.open(`https://t.me/share/url?url=${encodeURIComponent('https://ais-dev-olwv3xy5na35eb2oo4r5vw-254250167233.europe-west2.run.app')}&text=${text}`, '_blank');
  };

  return (
    <div className="terminal-card p-4 sm:p-5 rounded-lg border-2 border-[#1a1a1a]/15 bg-gradient-to-r from-white via-white to-[#fcfbf9] shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left / Title info */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#b45309]/10 text-[#b45309] font-mono-data text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>COMMUNITY BROADCAST</span>
            </span>
            <span className="text-[11px] text-[#1a1a1a]/60 font-mono-data flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>محدث {timeAgoText || 'الآن'}</span>
            </span>
          </div>

          <h3 className="font-display text-lg sm:text-xl font-bold text-[#1a1a1a]">
            نشرة الأسعار السريعة للمشاركة
          </h3>
          <p className="text-xs text-[#1a1a1a]/70 font-sans">
            انسخ ملخص أسعار الصرف والذهب اليومي بضغطة زر لمشاركته في مجموعات واتساب وتيليجرام وقنوات الصاغة.
          </p>
        </div>

        {/* Right / Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 self-start lg:self-auto">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded text-xs font-mono-data font-bold transition-all ${
              copied
                ? 'bg-[#065f46] text-white'
                : 'bg-[#1a1a1a] hover:bg-black text-white'
            }`}
            title="نسخ النشرة إلى الحافظة"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" />
                <span>COPIED TO CLIPBOARD!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ النشرة للنشر</span>
              </>
            )}
          </button>

          {/* WhatsApp Button */}
          <button
            onClick={handleWhatsAppShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#25D366]/10 hover:bg-[#25D366] text-[#075e54] hover:text-white border border-[#25D366]/30 text-xs font-bold transition-colors"
            title="مشاركة عبر واتساب"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>واتساب</span>
          </button>

          {/* Telegram Button */}
          <button
            onClick={handleTelegramShare}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded bg-[#0088cc]/10 hover:bg-[#0088cc] text-[#0088cc] hover:text-white border border-[#0088cc]/30 text-xs font-bold transition-colors"
            title="مشاركة عبر تيليجرام"
          >
            <Send className="w-3.5 h-3.5" />
            <span>تيليجرام</span>
          </button>

          {/* Refresh Pulse Button */}
          <button
            onClick={() => refreshData()}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1 px-3 py-2 rounded bg-[#f8f7f4] hover:bg-[#1a1a1a]/5 text-[#1a1a1a] border border-[#1a1a1a]/15 text-xs font-mono-data font-bold transition-colors"
            title="تحديث البيانات يدوياً"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#b45309]' : ''}`} />
            <span className="text-[10px] text-[#1a1a1a]/60">({countdown}s)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
