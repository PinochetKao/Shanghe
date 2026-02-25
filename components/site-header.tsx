'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LanguageSwitcher } from './language-switcher';

export function SiteHeader({ locale, nav }: { locale: string; nav: Record<string, string> }) {
  const [open, setOpen] = useState(false);
  const links = [
    ['home', `/${locale}`],
    ['about', `/${locale}/about`],
    ['services', `/${locale}/services`],
    ['projects', `/${locale}/projects`],
    ['platforms', `/${locale}/platforms`],
    ['news', `/${locale}/news`],
    ['contact', `/${locale}/contact`],
    ['competition', `/${locale}/competition`]
  ] as const;

  return (
    <header className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href={`/${locale}`} className="font-semibold text-brand">Shanghe</Link>
        <button className="rounded border px-3 md:hidden" onClick={() => setOpen((v) => !v)}>☰</button>
        <nav className="hidden items-center gap-4 md:flex">
          {links.map(([key, href]) => (
            <Link key={key} href={href} className="text-sm hover:text-brand">{nav[key]}</Link>
          ))}
          <LanguageSwitcher currentLocale={locale} />
        </nav>
      </div>
      {open && (
        <div className="border-t bg-white p-3 md:hidden">
          <div className="grid gap-2">
            {links.map(([key, href]) => (
              <Link key={key} href={href} className="rounded px-2 py-2 hover:bg-slate-100" onClick={() => setOpen(false)}>{nav[key]}</Link>
            ))}
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      )}
    </header>
  );
}
