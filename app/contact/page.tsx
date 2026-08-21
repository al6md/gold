'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, ArrowRight, CheckCircle2, Send, Clock, Building } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

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
            اتصل بنا (Contact Us)
          </h1>
          <p className="text-xs text-[#1a1a1a]/60 mt-1 font-sans">
            فريق الدعم الفني وتحديثات أسعار الصاغة والبورصات في العراق
          </p>
        </div>

        <div className="terminal-label bg-[#1a1a1a]/5 px-3 py-1.5 rounded flex items-center gap-1.5 self-start sm:self-auto">
          <Mail className="w-4 h-4 text-[#b45309]" />
          <span>HELP DESK</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Info Column */}
        <div className="space-y-4 md:col-span-1">
          <div className="terminal-card p-5 rounded-lg bg-white space-y-4 border border-[#1a1a1a]/15 shadow-sm">
            <h3 className="font-display font-bold text-base text-[#1a1a1a] flex items-center gap-2">
              <Building className="w-4 h-4 text-[#b45309]" />
              <span>معلومات التواصل</span>
            </h3>

            <div className="space-y-3 text-xs text-[#1a1a1a]/80 font-sans">
              <div>
                <strong className="block text-[#1a1a1a] mb-0.5">البريد الإلكتروني للإعلانات والاستفسارات:</strong>
                <a href="mailto:support@iraq-market.iq" className="font-mono-data text-[#b45309] font-bold hover:underline">
                  support@iraq-market.iq
                </a>
              </div>

              <div>
                <strong className="block text-[#1a1a1a] mb-0.5">المقر والمصادر:</strong>
                <p className="text-[11px] leading-relaxed">
                  بغداد - شارع النهر (سوق الصاغة) & بورصة الكفاح الرئيسية
                </p>
              </div>

              <div>
                <strong className="block text-[#1a1a1a] mb-0.5">أوقات العمل والتحديث:</strong>
                <span className="flex items-center gap-1 font-mono-data text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-[#065f46]" />
                  <span>24/7 Live Monitoring</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="md:col-span-2">
          <div className="terminal-card p-6 sm:p-8 rounded-lg bg-white border border-[#1a1a1a]/15 shadow-sm">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#1a1a1a]">
                  تم إرسال رسالتك بنجاح!
                </h3>
                <p className="text-xs text-[#1a1a1a]/70 font-sans max-w-sm mx-auto">
                  شكراً لتواصلك معنا. سنقوم بالرد على بريدك الإلكتروني في أقرب وقت ممكن.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: '', email: '', subject: '', message: '' });
                  }}
                  className="px-4 py-2 bg-[#1a1a1a] text-white text-xs font-mono-data font-bold rounded hover:bg-black transition-colors"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="terminal-label block">الاسم الكامل</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="أحمد علي"
                      className="w-full bg-[#f8f7f4] border border-[#1a1a1a]/20 rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-[#1a1a1a]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="terminal-label block">البريد الإلكتروني</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full bg-[#f8f7f4] border border-[#1a1a1a]/20 rounded px-3 py-2 text-xs font-mono-data focus:outline-none focus:border-[#1a1a1a]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="terminal-label block">موضوع الرسالة</label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="استفسار بخصوص الأسعار / إعلان / اقتراح"
                    className="w-full bg-[#f8f7f4] border border-[#1a1a1a]/20 rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="terminal-label block">نص الرسالة</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="اكتب رسالتك أو استفسارك هنا..."
                    className="w-full bg-[#f8f7f4] border border-[#1a1a1a]/20 rounded px-3 py-2 text-xs font-sans focus:outline-none focus:border-[#1a1a1a]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-[#1a1a1a] hover:bg-black text-white text-xs font-mono-data font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>إرسال الرسالة (SEND MESSAGE)</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
