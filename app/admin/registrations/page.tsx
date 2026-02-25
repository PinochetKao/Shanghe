import Link from 'next/link';
import { AdminNav } from '@/components/admin/nav';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function RegistrationsPage() {
  requireAdmin();
  const list = await prisma.competitionRegistration.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Competition Registrations</h1>
      <AdminNav />
      <Link href="/admin/registrations/export" className="inline-flex rounded bg-brand px-4 py-2 text-white">Export CSV</Link>
      <div className="mt-4 overflow-x-auto rounded border bg-white">
        <table className="min-w-full text-left text-sm">
          <thead><tr className="border-b bg-slate-50"><th className="p-2">Name</th><th className="p-2">Phone</th><th className="p-2">Email</th><th className="p-2">School</th><th className="p-2">CreatedAt</th></tr></thead>
          <tbody>
            {list.map((r) => (
              <tr key={r.id} className="border-b"><td className="p-2">{r.name}</td><td className="p-2">{r.phone}</td><td className="p-2">{r.email}</td><td className="p-2">{r.school}</td><td className="p-2">{new Date(r.createdAt).toLocaleString()}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
