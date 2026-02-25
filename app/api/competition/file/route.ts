import { NextRequest, NextResponse } from 'next/server';
import { getCompetitionPdf } from '@/lib/files';

export async function GET(req: NextRequest) {
  const locale = req.nextUrl.searchParams.get('locale') || 'zh';
  const target = getCompetitionPdf(locale);
  return NextResponse.redirect(new URL(target, req.url));
}
