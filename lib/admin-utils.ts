import { i18nConfig } from './i18n';

export function collectTranslatedFields(formData: FormData, prefix: string) {
  const entries = i18nConfig.locales.map((l) => [l.code, String(formData.get(`${prefix}_${l.code}`) || '')]);
  return Object.fromEntries(entries);
}
