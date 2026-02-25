import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { emailRegex, isRequired, phoneRegex } from '@/lib/validators';
import { hitRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  if (String(formData.get('website') || '').trim()) return NextResponse.json({ message: 'ok' });
  const ip = req.headers.get('x-forwarded-for') ?? 'local';
  if (hitRateLimit(`competition:${ip}`, 4, 60_000)) return NextResponse.json({ message: 'Too many requests' }, { status: 429 });

  const data = {
    name: String(formData.get('name') || ''),
    gender: String(formData.get('gender') || ''),
    phone: String(formData.get('phone') || ''),
    email: String(formData.get('email') || ''),
    school: String(formData.get('school') || ''),
    department: String(formData.get('department') || ''),
    major: String(formData.get('major') || ''),
    grade: String(formData.get('grade') || ''),
    educationLevel: String(formData.get('educationLevel') || ''),
    locale: String(formData.get('locale') || 'zh')
  };

  if (!Object.values(data).every(isRequired) || !emailRegex.test(data.email) || !phoneRegex.test(data.phone)) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }

  await prisma.competitionRegistration.create({ data: { ...data, referer: req.headers.get('referer') || null } });
  return NextResponse.json({ message: 'Registration submitted' });
}
