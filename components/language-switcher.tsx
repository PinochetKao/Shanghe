'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { i18nConfig } from '@/lib/i18n';

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const makeTarget = (nextLocale: string) => {
    const segments = pathname.split('/');
    if (segments.length > 1 && i18nConfig.locales.some((l) => l.code === segments[1])) {
      segments[1] = nextLocale;
      return segments.join('/') || '/';
    }
    return `/${nextLocale}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="rounded border px-3 text-sm"
        onClick={() => setOpen((v) => !v)}
      >
        🌐 {currentLocale.toUpperCase()}
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 w-44 rounded-lg border bg-white p-2 shadow-lg">
          {i18nConfig.locales.map((item) => (
            <Link
              key={item.code}
              href={makeTarget(item.code)}
              onClick={() => setOpen(false)}
              className="block rounded px-3 py-2 text-sm hover:bg-slate-100"
            >
              {item.nativeName}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
