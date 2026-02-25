import fs from 'fs';
import path from 'path';

export function getCompetitionPdf(locale: string) {
  const localized = `competition_${locale}.pdf`;
  const localizedPath = path.join(process.cwd(), 'public', 'files', localized);
  if (fs.existsSync(localizedPath)) return `/files/${localized}`;
  return '/files/competition.pdf';
}
