import type { Metadata, Viewport } from 'next';
import { Cairo, Space_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { MarketProvider } from '@/context/MarketContext';
import { AppShell } from '@/components/AppShell';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-cairo',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-space-mono',
});

export const viewport: Viewport = {
  themeColor: '#b45309',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://gold-xi-sage.vercel.app'),
  verification: {
    google: 'N-2y_Klcge7a2tlkTLIO8eJsqwFnDecrN5yvh1M3Moc',
  },
  title: {
    default: 'بورصة العراق | أسعار الدولار والذهب اليوم في بغداد والمحافظات',
    template: '%s | بورصة العراق',
  },
  description: 'الموقع المعتمد لمتابعة أسعار صرف الدولار لحظة بلحظة في بورصة الكفاح، الحارثية، أربيل، البصرة وسعر مثقال الذهب عيار 21 و24 وحاسبة الصرف.',
  keywords: [
    'سعر الدولار في العراق',
    'سعر الدولار اليوم في بغداد',
    'سعر الدولار في بورصة الكفاح',
    'سعر الدولار في بورصة الحارثية',
    'سعر مثقال الذهب اليوم في العراق',
    'سعر مثقال الذهب عيار 21',
    'سعر الدولار في أربيل',
    'سعر الدولار في البصرة',
    'سعر الدولار في كربلاء',
    'سعر الدولار في النجف',
    'سعر الدولار في الموصل',
    'البنك المركزي العراقي CBI',
    'حاسبة الذهب العراقية',
    'حاسبة الدولار مقابل الدينار',
    'سعر غرام الذهب في العراق',
    'سعر صرف الدولار بالسوق الموازي'
  ],
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'بورصة العراق' }],
  creator: 'بورصة العراق',
  publisher: 'بورصة العراق',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/logo.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/logo.svg', sizes: '180x180', type: 'image/svg+xml' },
    ],
  },
  openGraph: {
    title: 'بورصة العراق | أسعار الذهب والدولار لحظة بلحظة',
    description: 'تتبع مباشر وموثوق لأسعار الدولار في كافة المحافظات العراقية ومثاقيل الذهب مع حاسبة تحويل فورية.',
    type: 'website',
    locale: 'ar_IQ',
    siteName: 'بورصة العراق',
    url: 'https://gold-xi-sage.vercel.app',
    images: [
      {
        url: 'https://gold-xi-sage.vercel.app/logo.svg',
        width: 512,
        height: 512,
        alt: 'شعار بورصة العراق الرسمي',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'بورصة العراق | أسعار الذهب والدولار',
    description: 'متابعة لحظية ومباشرة لأسعار الصرف والذهب في البورصات والمحافظات العراقية.',
    images: ['https://gold-xi-sage.vercel.app/logo.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://gold-xi-sage.vercel.app/#website',
        url: 'https://gold-xi-sage.vercel.app',
        name: 'بورصة العراق | أسعار الدولار والذهب',
        alternateName: ['بورصة العراق', 'سعر الدولار في العراق', 'أسعار الذهب في العراق'],
        description: 'المنصة الرسمية المعتمدة لمتابعة أسعار صرف الدولار ومثاقيل الذهب في العراق والمحافظات لحظة بلحظة',
        inLanguage: 'ar-IQ',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://gold-xi-sage.vercel.app/provinces?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'FinancialService',
        '@id': 'https://gold-xi-sage.vercel.app/#organization',
        name: 'بورصة العراق',
        url: 'https://gold-xi-sage.vercel.app',
        logo: 'https://gold-xi-sage.vercel.app/logo.svg',
        image: 'https://gold-xi-sage.vercel.app/logo.svg',
        areaServed: {
          '@type': 'Country',
          name: 'Iraq',
        },
        currenciesAccepted: 'IQD, USD',
        paymentAccepted: 'Cash',
        priceRange: '$$',
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${spaceMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#f8f7f4] text-[#1a1a1a] font-sans min-h-screen antialiased selection:bg-[#b45309] selection:text-[#f8f7f4]" suppressHydrationWarning>
        {/* Google AdSense */}
        <Script
          id="google-adsense"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3620592701758768"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        {/* Adsterra Popunder */}
        <Script
          id="adsterra-popunder"
          src="https://pl30891402.effectivecpmnetwork.com/e5/58/1b/e5581b5b1275791e0650cfa45ad54595.js"
          strategy="afterInteractive"
        />
        {/* Adsterra SocialBar */}
        <Script
          id="adsterra-socialbar"
          src="https://pl30891401.effectivecpmnetwork.com/cc/48/95/cc489529ab7dbea069881d5e85d5182a.js"
          strategy="afterInteractive"
        />
        <MarketProvider>
          <AppShell>
            {children}
          </AppShell>
        </MarketProvider>
      </body>
    </html>
  );
}

