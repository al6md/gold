import type { Metadata } from 'next';
import { ProvincesSection } from '@/components/ProvincesSection';
import { TrustBadge } from '@/components/TrustBadge';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'سعر الدولار في المحافظات العراقية اليوم - بورصة العراق',
  description: 'جدول أسعار صرف الدولار لحظة بلحظة في بغداد (الكفاح والحارثية)، كربلاء، النجف، البصرة، أربيل، السليمانية، الموصل، كركوك والأنبار.',
};

export default function ProvincesPage() {
  return (
    <div className="space-y-8 animate-fadeIn">
      <TrustBadge />
      <ProvincesSection isFullPage={true} />
    </div>
  );
}
