import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { setAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default function AdminLogin() {
  async function login(formData: FormData) {
    'use server';
    const email = String(formData.get('email') || '');
    const password = String(formData.get('password') || '');
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user) return;
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return;
    setAdminSession();
    redirect('/admin');
  }

  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border bg-white p-6">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <form action={login} className="mt-4 space-y-3">
        <input className="w-full rounded border px-3" name="email" type="email" placeholder="email" required />
        <input className="w-full rounded border px-3" name="password" type="password" placeholder="password" required />
        <button className="w-full rounded bg-brand text-white">Login</button>
      </form>
    </div>
  );
}
