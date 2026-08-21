'use client';

import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  KeyRound,
  Save,
  Radio
} from 'lucide-react';
import { useMarket } from '@/context/MarketContext';

export function AdminView() {
  const { provinces, summary, refreshData } = useMarket();

  // Authentication State
  const [pin, setPin] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('iraq_exchange_admin_pin') || '';
    }
    return '';
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return Boolean(sessionStorage.getItem('iraq_exchange_admin_pin'));
    }
    return false;
  });
  const [authError, setAuthError] = useState('');

  // Form State
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>('baghdad_kifah');
  const [buyPrice, setBuyPrice] = useState<string>('150250');
  const [sellPrice, setSellPrice] = useState<string>('150500');
  const [siyaghaFee, setSiyaghaFee] = useState<string>(() => {
    return (summary?.default_siyagha_fee ?? 10000).toString();
  });
  const [announcementText, setAnnouncementText] = useState<string>('');

  // Status & notifications
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleProvinceSelect = (provinceId: string) => {
    setSelectedProvinceId(provinceId);
    const p = provinces.find((prov) => prov.id === provinceId);
    if (p) {
      setBuyPrice(p.buy_price.toString());
      setSellPrice(p.sell_price.toString());
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setAuthError('يرجى إدخال رمز الدخول السري (PIN)');
      return;
    }
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem('iraq_exchange_admin_pin', pin);
    } catch {
      //
    }
    setAuthError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
    try {
      sessionStorage.removeItem('iraq_exchange_admin_pin');
    } catch {
      //
    }
  };

  // Submit override to API
  const handleSaveOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/override', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pin,
          province_id: selectedProvinceId,
          buy_price: Number(buyPrice),
          sell_price: Number(sellPrice),
          siyagha_fee: Number(siyaghaFee),
          announcement: announcementText.trim() || undefined,
        }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          try {
            sessionStorage.removeItem('iraq_exchange_admin_pin');
          } catch {
            //
          }
          setAuthError('رمز الدخول السري غير صحيح. يرجى إعادة المحاولة.');
          return;
        }
        throw new Error(result.message || 'فشل في حفظ التعديلات');
      }

      setSuccessMessage('تم تطبيق التعديل اليدوي بنجاح وتحديث الأسعار فوراً في الموقع.');
      await refreshData();
    } catch (err: unknown) {
      setErrorMessage((err as Error).message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  // Reset to live automated rates
  const handleResetToAuto = async () => {
    if (!confirm('هل أنت متأكد من رغبتك في إلغاء كافة التعديلات اليدوية واستعادة التحديث التلقائي المباشر؟')) {
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin }),
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || 'فشل في إعادة ضبط الأسعار');
      }

      setSuccessMessage('تمت استعادة الأسعار التلقائية من البث المباشر بنجاح.');
      await refreshData();
    } catch (err: unknown) {
      setErrorMessage((err as Error).message || 'حدث خطأ في إعادة الضبط');
    } finally {
      setLoading(false);
    }
  };

  // Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12">
        <div className="terminal-card p-8 rounded-lg space-y-6 text-center">
          <div className="w-12 h-12 rounded bg-[#1a1a1a]/5 border border-[#1a1a1a]/15 flex items-center justify-center text-[#1a1a1a] mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <div className="terminal-label mb-1">AUTHENTICATION GATEWAY</div>
            <h1 className="font-display text-2xl font-bold text-[#1a1a1a]">
              لوحة التحكم والإدارة
            </h1>
            <p className="text-xs text-[#1a1a1a]/60 mt-1">
              الرجاء إدخال رمز الدخول السري (PIN) لإدارة وتعديل أسعار الصرف
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/40" />
              <input
                type="password"
                placeholder="PIN (Default: 123456)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-[#f8f7f4] border border-[#1a1a1a]/20 rounded pr-10 pl-4 py-2.5 text-center font-mono-data text-base font-bold text-[#1a1a1a] tracking-widest focus:outline-none focus:border-[#1a1a1a]"
                autoFocus
              />
            </div>

            {authError && (
              <div className="text-xs text-[#b45309] bg-amber-50 border border-amber-200 p-2.5 rounded font-mono-data">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded bg-[#1a1a1a] hover:bg-black text-white font-mono-data text-xs font-bold transition-colors"
            >
              AUTHENTICATE SESSION
            </button>
          </form>

          <p className="text-[11px] text-[#1a1a1a]/40 font-mono-data">
            DEFAULT PIN: 123456 (CAN BE CHANGED IN ADMIN_PIN ENV)
          </p>
        </div>
      </div>
    );
  }

  // Logged-in Panel
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#1a1a1a] pb-3">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-[#1a1a1a]">
            لوحة الإدارة والتحكم
          </h1>
          <p className="text-xs text-[#1a1a1a]/60 mt-0.5">
            تعديل وتجاوز أسعار الصرف يدوياً والتحكم في شريط الإعلانات
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleResetToAuto}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white hover:bg-[#f8f7f4] text-[#1a1a1a] border border-[#1a1a1a]/20 text-xs font-mono-data font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET TO AUTO</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1a1a1a] text-white text-xs font-mono-data font-bold hover:bg-black transition-colors"
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 border border-emerald-300 text-[#065f46] p-3.5 rounded flex items-center gap-2 text-xs font-bold font-mono-data">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="bg-amber-50 border border-amber-300 text-[#b45309] p-3.5 rounded flex items-center gap-2 text-xs font-bold font-mono-data">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Override Form */}
      <form onSubmit={handleSaveOverride} className="terminal-card p-6 rounded-lg space-y-6">
        <div className="flex items-center gap-2 border-b border-[#1a1a1a]/10 pb-2">
          <Radio className="w-4 h-4 text-[#b45309]" />
          <h2 className="font-bold text-sm text-[#1a1a1a]">تعديل سعر الصرف لمحافظة محددة</h2>
        </div>

        {/* Province Selection */}
        <div className="space-y-1.5">
          <span className="terminal-label block">CHOOSE PROVINCE / MARKET</span>
          <select
            value={selectedProvinceId}
            onChange={(e) => handleProvinceSelect(e.target.value)}
            className="w-full bg-white border border-[#1a1a1a]/20 rounded px-3 py-2 text-xs font-bold text-[#1a1a1a] focus:outline-none focus:border-[#1a1a1a]"
          >
            {provinces.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.province_ar} - {prov.market_name} (الحالي: {prov.sell_price.toLocaleString('en-US')})
              </option>
            ))}
          </select>
        </div>

        {/* Buy & Sell */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#f8f7f4] border border-[#1a1a1a]/15 p-3.5 rounded">
            <span className="terminal-label block mb-1">BUY PRICE (سعر الشراء لكل $100)</span>
            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full bg-white border border-[#1a1a1a]/20 rounded px-3 py-2 font-mono-data text-lg font-bold text-[#1a1a1a] focus:outline-none"
            />
          </div>

          <div className="bg-[#f8f7f4] border border-[#1a1a1a]/15 p-3.5 rounded">
            <span className="terminal-label block mb-1 text-[#b45309]">SELL PRICE (سعر البيع لكل $100)</span>
            <input
              type="number"
              value={sellPrice}
              onChange={(e) => setSellPrice(e.target.value)}
              className="w-full bg-white border border-[#1a1a1a]/20 rounded px-3 py-2 font-mono-data text-lg font-bold text-[#b45309] focus:outline-none"
            />
          </div>
        </div>

        {/* Siyagha fee & Announcement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-[#f8f7f4] border border-[#1a1a1a]/15 p-3.5 rounded">
            <span className="terminal-label block mb-1">DEFAULT SIYAGHA FEE (د.ع / مثقال)</span>
            <input
              type="number"
              value={siyaghaFee}
              onChange={(e) => setSiyaghaFee(e.target.value)}
              className="w-full bg-white border border-[#1a1a1a]/20 rounded px-3 py-2 font-mono-data text-sm font-bold text-[#1a1a1a] focus:outline-none"
            />
          </div>

          <div className="bg-[#f8f7f4] border border-[#1a1a1a]/15 p-3.5 rounded">
            <span className="terminal-label block mb-1">BROADCAST ANNOUNCEMENT BANNER</span>
            <input
              type="text"
              placeholder="نص الإشعار العاجل أعلى الشاشة..."
              value={announcementText}
              onChange={(e) => setAnnouncementText(e.target.value)}
              className="w-full bg-white border border-[#1a1a1a]/20 rounded px-3 py-2 text-xs text-[#1a1a1a] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded bg-[#b45309] hover:bg-[#92400e] text-white font-mono-data text-xs font-bold transition-colors"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? 'SAVING CHANGES...' : 'SAVE & BROADCAST OVERRIDE'}</span>
        </button>
      </form>
    </div>
  );
}
