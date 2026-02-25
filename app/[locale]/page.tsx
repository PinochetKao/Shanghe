import Link from 'next/link';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/lib/i18n';

export default function Home({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">{dict.home.title}</h1>
      <p className="text-slate-600">{dict.home.intro}</p>
      <div className="rounded-2xl border bg-white p-6">
        <h2 className="text-2xl font-semibold">{dict.home.competitionTitle}</h2>
        <p className="mt-2 text-slate-600">{dict.home.competitionIntro}</p>
        <Link href={`/${params.locale}/competition`} className="mt-4 inline-flex rounded bg-brand px-4 py-2 text-white">
          {dict.home.viewCompetition}
        </Link>
      </div>
    </section>
  );
}
