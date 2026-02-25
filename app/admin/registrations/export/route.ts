import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const list = await prisma.competitionRegistration.findMany({ orderBy: { createdAt: 'desc' } });
  const headers = ['name','gender','phone','email','school','department','major','grade','educationLevel','locale','createdAt'];
  const csv = [headers.join(',')]
    .concat(list.map((r) => headers.map((k) => `"${String((r as any)[k] ?? '').replace(/"/g, '""')}"`).join(',')))
    .join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="competition_registrations.csv"'
    }
  });
}
