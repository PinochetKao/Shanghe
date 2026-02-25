import { AdminNav } from '@/components/admin/nav';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function SubmissionsPage() {
  requireAdmin();
  const list = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Contact Submissions</h1>
      <AdminNav />
      <div className="space-y-3">
        {list.map((s) => (
          <div key={s.id} className="rounded border bg-white p-4 text-sm">
            <p><b>{s.name}</b> ({s.email}) - {s.subject}</p>
            <p>{s.message}</p>
            <p className="text-slate-500">{s.locale} | {new Date(s.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
