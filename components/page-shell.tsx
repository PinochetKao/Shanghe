import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/lib/i18n';

export function PageShell({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const dict = getDictionary(locale);
  return (
    <>
      <SiteHeader locale={locale} nav={dict.nav} />
      <main className="mx-auto min-h-[70vh] w-full max-w-6xl px-4 py-8">{children}</main>
      <SiteFooter />
    </>
  );
}
