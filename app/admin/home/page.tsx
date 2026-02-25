import { redirect } from 'next/navigation';
import { AdminNav } from '@/components/admin/nav';
import { requireAdmin } from '@/lib/auth';
import { defaultHomeConfig, getHomeConfig } from '@/lib/home';
import { i18nConfig } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';

const locales = i18nConfig.locales.map((l) => l.code);

function trans(formData: FormData, key: string) {
  return Object.fromEntries(locales.map((l) => [l, String(formData.get(`${key}_${l}`) || '')]));
}

export default async function AdminHomePage() {
  requireAdmin();
  const current = await getHomeConfig();

  async function save(formData: FormData) {
    'use server';

    const sectors = defaultHomeConfig.sectors.map((_, i) => ({
      title: trans(formData, `sector_${i}_title`),
      description: trans(formData, `sector_${i}_desc`),
      imageUrl: String(formData.get(`sector_${i}_image`) || '')
    }));

    const featuredProjects = defaultHomeConfig.featuredProjects.map((_, i) => ({
      title: trans(formData, `project_${i}_title`),
      description: trans(formData, `project_${i}_desc`),
      imageUrl: String(formData.get(`project_${i}_image`) || '')
    }));

    const platforms = defaultHomeConfig.affiliations.platforms.map((_, i) => ({
      name: trans(formData, `platform_${i}_name`),
      icon: String(formData.get(`platform_${i}_icon`) || '')
    }));

    const counters = defaultHomeConfig.affiliations.counters.map((_, i) => ({
      label: trans(formData, `counter_${i}_label`),
      value: Number(formData.get(`counter_${i}_value`) || 0)
    }));

    const payload = {
      hero: {
        backgroundImage: String(formData.get('hero_backgroundImage') || ''),
        title: trans(formData, 'hero_title'),
        subtitle: trans(formData, 'hero_subtitle'),
        ctaLabel: trans(formData, 'hero_ctaLabel')
      },
      sectors,
      featuredProjects,
      affiliations: {
        title: trans(formData, 'affiliations_title'),
        platforms,
        counters
      },
      about: {
        title: trans(formData, 'about_title'),
        content: trans(formData, 'about_content')
      },
      footer: {
        companyName: trans(formData, 'footer_companyName'),
        copyright: trans(formData, 'footer_copyright'),
        address: trans(formData, 'footer_address'),
        phone: String(formData.get('footer_phone') || '')
      }
    };

    const first = await prisma.homePageConfig.findFirst({ select: { id: true } });
    if (!first) {
      await prisma.homePageConfig.create({ data: payload as any });
    } else {
      await prisma.homePageConfig.update({ where: { id: first.id }, data: payload as any });
    }

    redirect('/admin/home');
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-4 text-3xl font-bold">Home Page Config</h1>
      <AdminNav />
      <form action={save} className="space-y-5">
        <section className="rounded border bg-white p-4">
          <h2 className="mb-3 text-xl font-semibold">Hero</h2>
          <input name="hero_backgroundImage" defaultValue={current.hero.backgroundImage} className="mb-2 w-full rounded border px-3" placeholder="Background image URL" />
          {locales.map((l) => (
            <div key={l} className="mb-2 grid gap-2">
              <strong>{l.toUpperCase()}</strong>
              <input name={`hero_title_${l}`} defaultValue={current.hero.title[l]} className="rounded border px-3" placeholder="Title" />
              <input name={`hero_subtitle_${l}`} defaultValue={current.hero.subtitle[l]} className="rounded border px-3" placeholder="Subtitle" />
              <input name={`hero_ctaLabel_${l}`} defaultValue={current.hero.ctaLabel[l]} className="rounded border px-3" placeholder="CTA" />
            </div>
          ))}
        </section>

        <section className="rounded border bg-white p-4">
          <h2 className="mb-3 text-xl font-semibold">Business Sectors (4)</h2>
          {current.sectors.map((s, i) => (
            <div key={i} className="mb-4 grid gap-2 border-b pb-3">
              <input name={`sector_${i}_image`} defaultValue={s.imageUrl} className="rounded border px-3" placeholder="Image URL" />
              {locales.map((l) => (
                <div key={l} className="grid gap-2">
                  <strong>{l.toUpperCase()}</strong>
                  <input name={`sector_${i}_title_${l}`} defaultValue={s.title[l]} className="rounded border px-3" placeholder="Title" />
                  <input name={`sector_${i}_desc_${l}`} defaultValue={s.description[l]} className="rounded border px-3" placeholder="Description" />
                </div>
              ))}
            </div>
          ))}
        </section>

        <section className="rounded border bg-white p-4">
          <h2 className="mb-3 text-xl font-semibold">Featured Projects (3)</h2>
          {current.featuredProjects.map((p, i) => (
            <div key={i} className="mb-4 grid gap-2 border-b pb-3">
              <input name={`project_${i}_image`} defaultValue={p.imageUrl} className="rounded border px-3" placeholder="Image URL (optional)" />
              {locales.map((l) => (
                <div key={l} className="grid gap-2">
                  <strong>{l.toUpperCase()}</strong>
                  <input name={`project_${i}_title_${l}`} defaultValue={p.title[l]} className="rounded border px-3" placeholder="Title" />
                  <input name={`project_${i}_desc_${l}`} defaultValue={p.description[l]} className="rounded border px-3" placeholder="Description" />
                </div>
              ))}
            </div>
          ))}
        </section>

        <section className="rounded border bg-white p-4">
          <h2 className="mb-3 text-xl font-semibold">Affiliations & Counters</h2>
          {locales.map((l) => (
            <input key={l} name={`affiliations_title_${l}`} defaultValue={current.affiliations.title[l]} className="mb-2 w-full rounded border px-3" placeholder={`Affiliations title (${l})`} />
          ))}
          {current.affiliations.platforms.map((p, i) => (
            <div key={i} className="mb-3 grid gap-2 border-b pb-3">
              <input name={`platform_${i}_icon`} defaultValue={p.icon} className="rounded border px-3" placeholder="icon" />
              {locales.map((l) => (
                <input key={l} name={`platform_${i}_name_${l}`} defaultValue={p.name[l]} className="rounded border px-3" placeholder={`platform name (${l})`} />
              ))}
            </div>
          ))}
          {current.affiliations.counters.map((c, i) => (
            <div key={i} className="mb-3 grid gap-2 border-b pb-3 md:grid-cols-2">
              <input type="number" name={`counter_${i}_value`} defaultValue={c.value} className="rounded border px-3" placeholder="value" />
              {locales.map((l) => (
                <input key={l} name={`counter_${i}_label_${l}`} defaultValue={c.label[l]} className="rounded border px-3" placeholder={`counter label (${l})`} />
              ))}
            </div>
          ))}
        </section>

        <section className="rounded border bg-white p-4">
          <h2 className="mb-3 text-xl font-semibold">About</h2>
          {locales.map((l) => (
            <div key={l} className="mb-2 grid gap-2">
              <input name={`about_title_${l}`} defaultValue={current.about.title[l]} className="rounded border px-3" placeholder={`About title (${l})`} />
              <textarea name={`about_content_${l}`} defaultValue={current.about.content[l]} className="rounded border p-3" rows={5} placeholder={`About content (${l})`} />
            </div>
          ))}
        </section>

        <section className="rounded border bg-white p-4">
          <h2 className="mb-3 text-xl font-semibold">Footer</h2>
          <input name="footer_phone" defaultValue={current.footer.phone} className="mb-2 w-full rounded border px-3" placeholder="Phone" />
          {locales.map((l) => (
            <div key={l} className="mb-2 grid gap-2">
              <input name={`footer_companyName_${l}`} defaultValue={current.footer.companyName[l]} className="rounded border px-3" placeholder={`Company (${l})`} />
              <input name={`footer_copyright_${l}`} defaultValue={current.footer.copyright[l]} className="rounded border px-3" placeholder={`Copyright (${l})`} />
              <input name={`footer_address_${l}`} defaultValue={current.footer.address[l]} className="rounded border px-3" placeholder={`Address (${l})`} />
            </div>
          ))}
        </section>

        <button className="rounded bg-[#003366] px-5 py-2 text-white">Save Home Page</button>
      </form>
    </div>
  );
}
