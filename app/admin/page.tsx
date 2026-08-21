import type { Metadata } from 'next';
import { AdminView } from '@/components/AdminView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'لوحة إدارة وتعديل الأسعار - بورصة العراق',
  description: 'لوحة تحكم وتعديل أسعار صرف الدولار ومثاقيل الذهب في المحافظات العراقية للمشرفين.',
};

export default function AdminPage() {
  return (
    <div className="py-4">
      <AdminView />
    </div>
  );
}
