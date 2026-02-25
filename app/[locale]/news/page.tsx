import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { getLocaleValue, Locale } from '@/lib/i18n';

export default async function NewsList({ params }: { params: { locale: Locale } }) {
  const list = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">News</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {list.map((item) => (
          <article key={item.id} className="rounded-xl border bg-white p-4">
            <h2 className="text-xl font-semibold">{getLocaleValue(item.title as Record<string, string>, params.locale)}</h2>
            <p className="mt-2 text-slate-600">{getLocaleValue(item.excerpt as Record<string, string>, params.locale)}</p>
            <Link href={`/${params.locale}/news/${item.slug}`} className="mt-3 inline-block text-brand">Read more</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
