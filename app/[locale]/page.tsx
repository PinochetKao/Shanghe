import Link from 'next/link';
import { FeaturedCarousel } from '@/components/home/featured-carousel';
import { Counter } from '@/components/home/counter';
import { getHomeConfig, t } from '@/lib/home';
import { Locale } from '@/lib/i18n';

export default async function Home({ params }: { params: { locale: Locale } }) {
  const home = await getHomeConfig();

  return (
    <div className="space-y-10 overflow-x-hidden pb-2">
      <section
        className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden rounded-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${home.hero.backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/60" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">{t(params.locale, home.hero.title)}</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base md:text-xl">{t(params.locale, home.hero.subtitle)}</p>
          <Link href={`/${params.locale}/contact`} className="btn-ripple mt-6 inline-flex rounded bg-[#D4AF37] px-6 py-3 font-semibold text-[#003366] transition hover:brightness-105">
            {t(params.locale, home.hero.ctaLabel)}
          </Link>
        </div>
      </section>

      <section className="rounded-2xl bg-[#F5F7FA] p-6 md:p-8">
        <h2 className="mb-4 text-2xl font-bold text-[#003366]">Business Sectors</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {home.sectors.map((sector, i) => (
            <article key={i} className="group rounded-xl border border-transparent bg-white p-4 transition hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-lg hover:bg-[#fffdf5]">
              <div className="mb-3 h-32 overflow-hidden rounded-lg bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sector.imageUrl} alt={t(params.locale, sector.title)} className="h-full w-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-[#003366]">{t(params.locale, sector.title)}</h3>
              <p className="mt-2 text-sm text-[#333333]">{t(params.locale, sector.description)}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold text-[#003366]">Featured Projects</h2>
        <FeaturedCarousel
          locale={params.locale}
          items={home.featuredProjects.map((item) => ({
            title: t(params.locale, item.title),
            description: t(params.locale, item.description),
            imageUrl: item.imageUrl
          }))}
        />
      </section>

      <section className="rounded-2xl bg-[#F5F7FA] p-6 md:p-8">
        <h2 className="mb-4 text-2xl font-bold text-[#003366]">{t(params.locale, home.affiliations.title)}</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {home.affiliations.platforms.map((item, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl bg-white p-4 text-[#333333] shadow-sm">
              <span className="text-2xl">{item.icon || '🏢'}</span>
              <span className="font-medium">{t(params.locale, item.name)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {home.affiliations.counters.map((item, i) => (
            <Counter key={i} value={item.value} label={t(params.locale, item.label)} />
          ))}
        </div>
      </section>

      <section className="rounded-2xl bg-white p-6 md:p-8">
        <h2 className="mb-4 text-2xl font-bold text-[#003366]">{t(params.locale, home.about.title)}</h2>
        <p className="whitespace-pre-wrap leading-8 text-[#666666]">{t(params.locale, home.about.content)}</p>
      </section>
    </div>
  );
}
