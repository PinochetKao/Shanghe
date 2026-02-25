import Link from 'next/link';
import { AdminNav } from '@/components/admin/nav';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export default async function AdminNewsPage() {
  requireAdmin();
  const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-3xl font-bold">News</h1>
      <AdminNav />
      <Link href="/admin/news/new" className="inline-flex rounded bg-brand px-4 py-2 text-white">Create News</Link>
      <div className="mt-4 space-y-2">
        {news.map((n) => (
          <div key={n.id} className="flex items-center justify-between rounded border bg-white p-3">
            <span>{n.slug}</span>
            <div className="space-x-2">
              <Link href={`/admin/news/${n.id}/edit`} className="rounded border px-3 py-1">Edit</Link>
              <form action={async () => { 'use server'; await prisma.news.delete({ where: { id: n.id } }); }} className="inline">
                <button className="rounded border px-3 py-1">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
