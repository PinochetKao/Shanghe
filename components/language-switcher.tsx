'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { i18nConfig } from '@/lib/i18n';

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
          {i18nConfig.locales.map((item) => {
            const target = pathname.replace(/^\/(zh|en|ru)/, `/${item.code}`);
            return (
              <Link
                key={item.code}
                href={target}
                onClick={() => setOpen(false)}
                className="block rounded px-3 py-2 text-sm hover:bg-slate-100"
              >
                {item.nativeName}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
