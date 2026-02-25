import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { i18nConfig, isSupportedLocale, Locale } from '@/lib/i18n';
import { PageShell } from '@/components/page-shell';

export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return i18nConfig.locales.map((l) => ({ locale: l.code }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = params.locale;
  const languages = Object.fromEntries(
    i18nConfig.locales.map((item) => [item.code, `/${item.code}`])
  );

  return {
    alternates: {
      canonical: `/${locale}`,
      languages
    }
  };
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isSupportedLocale(params.locale)) notFound();
  return <PageShell locale={params.locale as Locale}>{children}</PageShell>;
}
