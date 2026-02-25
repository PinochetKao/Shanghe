export const i18nConfig = {
  defaultLocale: 'zh',
  locales: [
    { code: 'zh', nativeName: '中文' },
    { code: 'en', nativeName: 'English' },
    { code: 'ru', nativeName: 'Русский' }
  ]
};

export type Locale = (typeof i18nConfig.locales)[number]['code'];

export const isSupportedLocale = (locale: string) =>
  i18nConfig.locales.some((item) => item.code === locale);

export function getLocaleValue<T extends Record<string, any>>(source: T | null | undefined, locale: string, fallback = i18nConfig.defaultLocale) {
  if (!source) return '';
  return source[locale] ?? source[fallback] ?? '';
}
