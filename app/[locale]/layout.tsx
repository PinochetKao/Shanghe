import { notFound } from 'next/navigation';
import { i18nConfig, isSupportedLocale, Locale } from '@/lib/i18n';
import { PageShell } from '@/components/page-shell';

export function generateStaticParams() {
  return i18nConfig.locales.map((l) => ({ locale: l.code }));
}

export default function LocaleLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isSupportedLocale(params.locale)) notFound();
  return <PageShell locale={params.locale as Locale}>{children}</PageShell>;
}
