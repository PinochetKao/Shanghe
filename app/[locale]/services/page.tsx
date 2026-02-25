import { SimplePage } from '@/components/simple-page';
import { getPageBlock } from '@/lib/content';
import { Locale } from '@/lib/i18n';

export default async function Page({ params }: { params: { locale: Locale } }) {
  const data = await getPageBlock('services', params.locale);
  return <SimplePage title={data.title} desc={data.body} />;
}
