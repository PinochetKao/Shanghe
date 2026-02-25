export function SimplePage({ title, desc }: { title: string; desc: string }) {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="max-w-3xl text-slate-600">{desc}</p>
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((n) => (
          <div key={n} className="rounded-xl border bg-white p-4">Card {n}</div>
        ))}
      </div>
    </section>
  );
}
