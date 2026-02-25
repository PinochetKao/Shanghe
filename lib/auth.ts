import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE_NAME = 'admin_session';

export function setAdminSession() {
  cookies().set(COOKIE_NAME, 'ok', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12
  });
}

export function clearAdminSession() {
  cookies().delete(COOKIE_NAME);
}

export function isAdminAuthenticated() {
  return cookies().get(COOKIE_NAME)?.value === 'ok';
}

export function requireAdmin() {
  if (!isAdminAuthenticated()) redirect('/admin/login');
}
