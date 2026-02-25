import { requireAdmin } from '@/lib/auth';
import { AdminNav } from '@/components/admin/nav';

export default function AdminHome() {
  requireAdmin();
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Admin Dashboard</h1>
      <AdminNav />
      <p>Use menu to manage page content, news, contact submissions and competition registrations.</p>
    </div>
  );
}
