import { AdminNav } from '@/components/admin/nav';
import { requireAdmin } from '@/lib/auth';
import { i18nConfig } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';
import { collectTranslatedFields } from '@/lib/admin-utils';
import { redirect } from 'next/navigation';

export default function CreateNewsPage() {
  requireAdmin();
  async function createNews(formData: FormData) {
    'use server';
    await prisma.news.create({
      data: {
        slug: String(formData.get('slug') || ''),
        title: collectTranslatedFields(formData, 'title'),
        excerpt: collectTranslatedFields(formData, 'excerpt'),
        content: collectTranslatedFields(formData, 'content')
      }
    });
    redirect('/admin/news');
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Create News</h1>
      <AdminNav />
      <form action={createNews} className="space-y-4 rounded border bg-white p-4">
        <input name="slug" placeholder="slug" className="w-full rounded border px-3" required />
        {i18nConfig.locales.map((locale) => (
          <div key={locale.code} className="grid gap-2">
            <h2 className="font-semibold">{locale.nativeName}</h2>
            <input name={`title_${locale.code}`} placeholder="title" className="rounded border px-3" required />
            <input name={`excerpt_${locale.code}`} placeholder="excerpt" className="rounded border px-3" required />
            <textarea name={`content_${locale.code}`} placeholder="markdown content" className="rounded border p-3" rows={6} required />
          </div>
        ))}
        <button className="rounded bg-brand px-4 py-2 text-white">Save</button>
      </form>
    </div>
  );
}
