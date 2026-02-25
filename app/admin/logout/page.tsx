import { clearAdminSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default function LogoutPage() {
  clearAdminSession();
  redirect('/admin/login');
}
