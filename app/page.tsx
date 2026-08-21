import { TrustBadge } from '@/components/TrustBadge';
import { QuickShareBulletin } from '@/components/QuickShareBulletin';
import { TerminalPortalHero } from '@/components/TerminalPortalHero';
import { HeroCards } from '@/components/HeroCards';
import { MarketChart } from '@/components/MarketChart';
import { GoldKaratsSection } from '@/components/GoldKaratsSection';
import { ProvincesSection } from '@/components/ProvincesSection';
import { ForeignCurrenciesSection } from '@/components/ForeignCurrenciesSection';
import { MarketGuideSection } from '@/components/MarketGuideSection';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="space-y-8 sm:space-y-10 animate-fadeIn">
      {/* 1. Trust & Source Badge */}
      <TrustBadge />

      {/* 2. Primary 3-Column Dynamic Asset Portal (Gold Sector, Central Orb Diamond Viz, Dollar Sector) */}
      <TerminalPortalHero />

      {/* 3. Quick Share Bulletin for Telegram / WhatsApp */}
      <QuickShareBulletin />

      {/* 4. Live Metric Cards */}
      <HeroCards />

      {/* 5. Interactive Price History Chart */}
      <MarketChart />

      {/* 6. Gold Karats (24k, 22k, 21k, 18k) */}
      <GoldKaratsSection />

      {/* 7. Provinces Quick Overview */}
      <ProvincesSection isFullPage={false} />

      {/* 8. Foreign & Regional Currencies vs IQD */}
      <ForeignCurrenciesSection />

      {/* 9. Iraqi Citizen & Gold Buyer Guide */}
      <MarketGuideSection />
    </div>
  );
}

