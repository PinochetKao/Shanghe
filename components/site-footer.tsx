import { getHomeConfig, t } from '@/lib/home';
import { Locale } from '@/lib/i18n';

export async function SiteFooter({ locale }: { locale: Locale }) {
  const home = await getHomeConfig();
  return (
    <footer className="mt-12 bg-slate-200">
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 text-sm text-[#333333] md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-[#003366]">{t(locale, home.footer.companyName)}</h3>
          <p className="mt-2">{t(locale, home.footer.copyright)}</p>
        </div>
        <div>
          <h4 className="font-semibold text-[#003366]">Contact</h4>
          <p className="mt-2">{t(locale, home.footer.address)}</p>
          <p>{home.footer.phone}</p>
        </div>
        <div>
          <h4 className="font-semibold text-[#003366]">Social</h4>
          <div className="mt-2 flex gap-2 text-lg">
            <span>◯</span><span>◯</span><span>◯</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
