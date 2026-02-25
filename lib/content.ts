import { prisma } from './prisma';
import { getLocaleValue } from './i18n';

const defaults: Record<string, { title: Record<string, string>; body: Record<string, string> }> = {
  about: {
    title: { zh: '关于我们', en: 'About Us', ru: 'О нас' },
    body: { zh: '关于页面占位内容。', en: 'About page placeholder.', ru: 'Заглушка страницы о нас.' }
  },
  services: {
    title: { zh: '服务', en: 'Services', ru: 'Услуги' },
    body: { zh: '服务页面占位内容。', en: 'Services placeholder.', ru: 'Заглушка услуг.' }
  },
  projects: {
    title: { zh: '项目', en: 'Projects', ru: 'Проекты' },
    body: { zh: '项目页面占位内容。', en: 'Projects placeholder.', ru: 'Заглушка проектов.' }
  },
  platforms: {
    title: { zh: '平台', en: 'Platforms', ru: 'Платформы' },
    body: { zh: '平台页面占位内容。', en: 'Platforms placeholder.', ru: 'Заглушка платформ.' }
  }
};

export async function getPageBlock(key: string, locale: string) {
  const item = await prisma.pageContent.findUnique({ where: { key } });
  if (!item) {
    const fallback = defaults[key];
    return { title: getLocaleValue(fallback.title, locale), body: getLocaleValue(fallback.body, locale) };
  }
  return {
    title: getLocaleValue(item.title as Record<string, string>, locale),
    body: getLocaleValue(item.body as Record<string, string>, locale)
  };
}

export function getDefaultPageContent(key: string) {
  return defaults[key] || { title: {}, body: {} };
}
