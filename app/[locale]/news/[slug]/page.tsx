import { notFound } from 'next/navigation';
import { marked } from 'marked';
import { prisma } from '@/lib/prisma';
import { getLocaleValue, Locale } from '@/lib/i18n';

export default async function NewsDetail({ params }: { params: { locale: Locale; slug: string } }) {
  const item = await prisma.news.findUnique({ where: { slug: params.slug } });
  if (!item) notFound();
  const content = getLocaleValue(item.content as Record<string, string>, params.locale);

  return (
    <article className="prose max-w-none rounded-xl border bg-white p-6">
      <h1>{getLocaleValue(item.title as Record<string, string>, params.locale)}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked.parse(content) }} />
    </article>
  );
}
