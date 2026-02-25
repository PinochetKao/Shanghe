'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Item = { title: string; description: string; imageUrl: string };

export function FeaturedCarousel({ items, locale }: { items: Item[]; locale: string }) {
  const [idx, setIdx] = useState(0);
  const safeItems = useMemo(() => (items.length ? items : []), [items]);
  const max = safeItems.length;

  const prev = () => setIdx((v) => (v - 1 + max) % max);
  const next = () => setIdx((v) => (v + 1) % max);

  let startX = 0;
  if (!max) return null;

  return (
    <div
      className="relative overflow-hidden rounded-2xl border bg-white p-5"
      onTouchStart={(e) => {
        startX = e.changedTouches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const delta = e.changedTouches[0].clientX - startX;
        if (delta > 40) prev();
        if (delta < -40) next();
      }}
    >
      <div className="min-h-[230px]">
        <div className="mb-4 h-40 rounded-xl bg-slate-100">
          {safeItems[idx].imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={safeItems[idx].imageUrl} alt={safeItems[idx].title} className="h-full w-full rounded-xl object-cover" />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">No Image</div>
          )}
        </div>
        <h3 className="text-xl font-semibold text-[#003366]">{safeItems[idx].title}</h3>
        <p className="mt-2 text-[#333333]">{safeItems[idx].description}</p>
        <Link href={`/${locale}/projects`} className="btn-ripple mt-4 inline-flex rounded bg-[#D4AF37] px-4 py-2 text-[#003366]">
          查看详情
        </Link>
      </div>

      <button type="button" onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow">◀</button>
      <button type="button" onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow">▶</button>

      <div className="mt-4 flex justify-center gap-2">
        {safeItems.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`slide-${i}`}
            onClick={() => setIdx(i)}
            className={`h-2.5 w-2.5 rounded-full ${i === idx ? 'bg-[#003366]' : 'bg-slate-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
