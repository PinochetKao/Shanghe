'use client';

import { useState } from 'react';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/lib/i18n';

export default function CompetitionPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const [msg, setMsg] = useState('');

  async function onSubmit(formData: FormData) {
    const res = await fetch('/api/competition/register', { method: 'POST', body: formData });
    const data = await res.json();
    setMsg(data.message);
    if (res.ok) (document.getElementById('register-form') as HTMLFormElement)?.reset();
  }

  return (
    <section className="space-y-6">
      <div className="rounded-xl border bg-white p-6">
        <h1 className="text-3xl font-bold">{dict.competition.title}</h1>
        <p className="mt-2 text-slate-600">{dict.competition.intro}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href={`/api/competition/file?locale=${params.locale}`} download className="rounded border px-4 py-2">
            {dict.competition.ctaDownload}
          </a>
          <a href="#register" className="rounded bg-brand px-4 py-2 text-white">{dict.competition.ctaRegister}</a>
        </div>
      </div>

      <div className="rounded-xl border bg-white p-6">{dict.competition.schedule}</div>

      <form id="register-form" action={onSubmit} className="grid gap-3 rounded-xl border bg-white p-6 md:grid-cols-2">
        <input type="hidden" name="locale" value={params.locale} />
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <input name="name" placeholder="name" className="rounded border px-3" required />
        <select name="gender" className="rounded border px-3" required>{dict.competition.gender.map((v) => <option key={v}>{v}</option>)}</select>
        <input name="phone" placeholder="phone" className="rounded border px-3" required />
        <input name="email" placeholder="email" className="rounded border px-3" required />
        <input name="school" placeholder="school" className="rounded border px-3" required />
        <input name="department" placeholder="department" className="rounded border px-3" required />
        <input name="major" placeholder="major" className="rounded border px-3" required />
        <select name="grade" className="rounded border px-3" required>{dict.competition.grades.map((v) => <option key={v}>{v}</option>)}</select>
        <select name="educationLevel" className="rounded border px-3 md:col-span-2" required>{dict.competition.education.map((v) => <option key={v}>{v}</option>)}</select>
        <button id="register" className="rounded bg-brand px-4 py-2 text-white md:col-span-2">{dict.common.submit}</button>
        {msg && <p className="text-sm text-green-700 md:col-span-2">{msg}</p>}
      </form>
    </section>
  );
}
