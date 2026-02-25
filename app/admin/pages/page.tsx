import { AdminNav } from '@/components/admin/nav';
import { requireAdmin } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { i18nConfig, getLocaleValue } from '@/lib/i18n';
import { collectTranslatedFields } from '@/lib/admin-utils';
import { getDefaultPageContent } from '@/lib/content';
import { redirect } from 'next/navigation';

const keys = ['about', 'services', 'projects', 'platforms'];

export default async function AdminPagesPage() {
  requireAdmin();
  const pages = await prisma.pageContent.findMany({ where: { key: { in: keys } } });
  const map = new Map(pages.map((p) => [p.key, p]));

  async function savePage(formData: FormData) {
    'use server';
    const key = String(formData.get('key') || '');
    await prisma.pageContent.upsert({
      where: { key },
      create: { key, title: collectTranslatedFields(formData, 'title'), body: collectTranslatedFields(formData, 'body') },
      update: { title: collectTranslatedFields(formData, 'title'), body: collectTranslatedFields(formData, 'body') }
    });
    redirect('/admin/pages');
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Page Content</h1>
      <AdminNav />
      <div className="space-y-5">
        {keys.map((key) => {
          const row = map.get(key);
          const fallback = getDefaultPageContent(key);
          return (
            <form key={key} action={savePage} className="space-y-2 rounded border bg-white p-4">
              <h2 className="text-xl font-semibold capitalize">{key}</h2>
              <input type="hidden" name="key" value={key} />
              {i18nConfig.locales.map((locale) => (
                <div key={locale.code} className="grid gap-2">
                  <strong>{locale.nativeName}</strong>
                  <input name={`title_${locale.code}`} defaultValue={row ? getLocaleValue(row.title as any, locale.code) : getLocaleValue(fallback.title, locale.code)} className="rounded border px-3" />
                  <textarea name={`body_${locale.code}`} defaultValue={row ? getLocaleValue(row.body as any, locale.code) : getLocaleValue(fallback.body, locale.code)} className="rounded border p-3" rows={3} />
                </div>
              ))}
              <button className="rounded bg-brand px-4 py-2 text-white">Save {key}</button>
            </form>
          );
        })}
      </div>
    </div>
  );
}
