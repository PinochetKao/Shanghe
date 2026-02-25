import Link from 'next/link';

export function AdminNav() {
  return (
    <nav className="mb-6 flex flex-wrap gap-3 text-sm">
      <Link href="/admin" className="rounded border px-3 py-2">Dashboard</Link>
      <Link href="/admin/home" className="rounded border px-3 py-2">Home Page</Link>
      <Link href="/admin/pages" className="rounded border px-3 py-2">Pages</Link>
      <Link href="/admin/news" className="rounded border px-3 py-2">News</Link>
      <Link href="/admin/submissions" className="rounded border px-3 py-2">Contact</Link>
      <Link href="/admin/registrations" className="rounded border px-3 py-2">Competition</Link>
      <Link href="/admin/logout" className="rounded border px-3 py-2">Logout</Link>
    </nav>
  );
}
