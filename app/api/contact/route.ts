import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { emailRegex, isRequired } from '@/lib/validators';
import { hitRateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  if (String(formData.get('website') || '').trim()) return NextResponse.json({ message: 'ok' });
  const ip = req.headers.get('x-forwarded-for') ?? 'local';
  if (hitRateLimit(`contact:${ip}`, 5, 60_000)) return NextResponse.json({ message: 'Too many requests' }, { status: 429 });

  const name = String(formData.get('name') || '');
  const email = String(formData.get('email') || '');
  const subject = String(formData.get('subject') || '');
  const message = String(formData.get('message') || '');
  const locale = String(formData.get('locale') || 'zh');

  if (![name, email, subject, message].every(isRequired) || !emailRegex.test(email)) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }

  await prisma.contactSubmission.create({ data: { name, email, subject, message, locale, referer: req.headers.get('referer') || null } });
  return NextResponse.json({ message: 'Submitted successfully' });
}
