'use client';

import { useState } from 'react';
import { getDictionary } from '@/lib/dictionaries';
import { Locale } from '@/lib/i18n';

export default function ContactPage({ params }: { params: { locale: Locale } }) {
  const dict = getDictionary(params.locale);
  const [msg, setMsg] = useState('');

  async function onSubmit(formData: FormData) {
    const res = await fetch('/api/contact', { method: 'POST', body: formData });
    const data = await res.json();
    setMsg(data.message);
    if (res.ok) (document.getElementById('contact-form') as HTMLFormElement)?.reset();
  }

  return (
    <section className="mx-auto max-w-2xl rounded-xl border bg-white p-6">
      <h1 className="text-3xl font-bold">{dict.contact.title}</h1>
      <form
        id="contact-form"
        action={onSubmit}
        className="mt-4 space-y-3"
      >
        <input type="hidden" name="locale" value={params.locale} />
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
        <input name="name" placeholder={dict.contact.name} className="w-full rounded border px-3" required />
        <input name="email" placeholder={dict.contact.email} className="w-full rounded border px-3" required />
        <input name="subject" placeholder={dict.contact.subject} className="w-full rounded border px-3" required />
        <textarea name="message" placeholder={dict.contact.message} className="w-full rounded border p-3" rows={5} required />
        <button className="rounded bg-brand px-4 py-2 text-white">{dict.common.submit}</button>
      </form>
      {msg && <p className="mt-3 text-sm text-green-700">{msg}</p>}
    </section>
  );
}
