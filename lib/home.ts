import { prisma } from './prisma';
import { i18nConfig, Locale } from './i18n';

type LocalizedText = Record<string, string>;

export type HomeConfig = {
  hero: {
    backgroundImage: string;
    title: LocalizedText;
    subtitle: LocalizedText;
    ctaLabel: LocalizedText;
  };
  sectors: Array<{ title: LocalizedText; description: LocalizedText; imageUrl: string }>;
  featuredProjects: Array<{ title: LocalizedText; description: LocalizedText; imageUrl: string }>;
  affiliations: {
    title: LocalizedText;
    platforms: Array<{ name: LocalizedText; icon: string }>;
    counters: Array<{ label: LocalizedText; value: number }>;
  };
  about: {
    title: LocalizedText;
    content: LocalizedText;
  };
  footer: {
    companyName: LocalizedText;
    copyright: LocalizedText;
    address: LocalizedText;
    phone: string;
  };
};

const zhAbout = '公司简介尚合丝路(西安)国际贸易有限公司立足古丝绸之路起点--西安，积极响应国家高水平对外开放战略，致力于搭建国际经贸合作桥梁，促进区域协同与全球资源整合。公司以“和合共生、开放协作”为理念，聚焦实体经济与数字经济融合，推动绿色可持续发展，努力成为连接中国与上海合作组织国家、欧洲乃至全球市场的重要服务平台。公司目前承载并协同运营“上合组织国家多功能经贸平台西安中心”、“中国基本建设优化研究会-品牌与产业分会”、“中国经济改革研究基金会-低空经济智能化发展专项基金“，同时筹建“中国欧洲经济技术合作协会西安办事处”，分别面向中亚、西亚、南亚、白俄罗斯等区域深化经贸合作，以及在中亚、中欧之间推动绿色、数字、创新等领域的产业对接与协作。通过政策沟通、贸易畅通与民心相通，公司旨在构建开放、务实、共赢的国际合作生态，为落实全球发展倡议、共建人类命运共同体贡献企业力量。';

export const defaultHomeConfig: HomeConfig = {
  hero: {
    backgroundImage: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80',
    title: { zh: '连接中国与世界的重要服务平台', en: 'A key platform connecting China and the world', ru: 'Ключевая платформа, соединяющая Китай и мир' },
    subtitle: {
      zh: '和合共生、开放协作 —— 聚焦实体与数字经济融合，推动绿色可持续发展',
      en: 'Co-existence and open collaboration — integrating real and digital economies for green growth',
      ru: 'Гармоничное сосуществование и открытое сотрудничество — синергия реальной и цифровой экономики'
    },
    ctaLabel: { zh: '探索合作机遇', en: 'Explore Opportunities', ru: 'Изучить возможности сотрудничества' }
  },
  sectors: [
    { title: { zh: '外事接待', en: 'Foreign Affairs Reception', ru: 'Международный приём' }, description: { zh: '专业的高规格国际接待服务', en: 'Professional high-standard international reception services', ru: 'Профессиональные международные приёмные услуги высокого уровня' }, imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80' },
    { title: { zh: '国际贸易', en: 'International Trade', ru: 'Международная торговля' }, description: { zh: '促进区域协同与全球资源整合', en: 'Promoting regional synergy and global resource integration', ru: 'Содействие региональной кооперации и глобальной интеграции ресурсов' }, imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
    { title: { zh: '跨境电商', en: 'Cross-border E-commerce', ru: 'Трансграничная электронная коммерция' }, description: { zh: '搭建数字化国际贸易通路', en: 'Building digital channels for international trade', ru: 'Создание цифровых каналов международной торговли' }, imageUrl: 'https://images.unsplash.com/photo-1556740714-a8395b3bf30f?auto=format&fit=crop&w=800&q=80' },
    { title: { zh: '国际合作', en: 'International Cooperation', ru: 'Международное сотрудничество' }, description: { zh: '中亚、西亚、南亚及欧洲区域深度合作', en: 'Deep cooperation across Central/West/South Asia and Europe', ru: 'Глубокое сотрудничество с Центральной, Западной и Южной Азией, а также Европой' }, imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80' }
  ],
  featuredProjects: [
    { title: { zh: '“一带一路”国家政府官员研修项目', en: 'Belt and Road Government Officer Training', ru: 'Программа повышения квалификации госслужащих стран «Пояса и пути»' }, description: { zh: '政策沟通与能力建设。', en: 'Policy communication and capacity building.', ru: 'Политическая коммуникация и развитие потенциала.' }, imageUrl: '' },
    { title: { zh: '“一带一路”留学生创业大赛', en: 'Belt and Road Student Entrepreneurship Competition', ru: 'Предпринимательский конкурс для иностранных студентов «Пояса и пути»' }, description: { zh: '激发青年创新活力。', en: 'Igniting youth innovation vitality.', ru: 'Стимулирование инновационной активности молодёжи.' }, imageUrl: '' },
    { title: { zh: '“一带一路”跨境商品交易中心', en: 'Belt and Road Cross-border Commodity Trading Center', ru: 'Трансграничный торговый центр товаров «Пояса и пути»' }, description: { zh: '打造永不落幕的丝路贸易展。', en: 'Building a never-ending Silk Road trade expo.', ru: 'Создание «вечной» торговой выставки Шёлкового пути.' }, imageUrl: '' }
  ],
  affiliations: {
    title: { zh: '协同运营与战略合作', en: 'Affiliations & Strategic Platforms', ru: 'Совместная деятельность и стратегическое сотрудничество' },
    platforms: [
      { name: { zh: '上合组织国家多功能经贸平台西安中心', en: 'SCO Multifunctional Trade Platform Xi’an Center', ru: 'Сианьский центр многофункциональной торговой платформы стран ШОС' }, icon: '🏛️' },
      { name: { zh: '中国基本建设优化研究会-品牌与产业分会', en: 'China Basic Construction Optimization Research Society - Brand & Industry Branch', ru: 'Китайское общество оптимизации базового строительства — отделение бренда и индустрии' }, icon: '🤝' },
      { name: { zh: '中国经济改革研究基金会-低空经济智能化发展专项基金', en: 'China Economic Reform Research Foundation - Low-altitude Economy Intelligence Fund', ru: 'Фонд исследований экономических реформ Китая — спецфонд интеллектуального развития низковысотной экономики' }, icon: '🚀' },
      { name: { zh: '中国欧洲经济技术合作协会西安办事处（筹）', en: 'China-Europe Economic and Technical Cooperation Association Xi’an Office (Planned)', ru: 'Сианьский офис Китайско-Европейской ассоциации экономико-технического сотрудничества (в подготовке)' }, icon: '🌍' }
    ],
    counters: [
      { label: { zh: '合作平台', en: 'Platforms', ru: 'Платформы' }, value: 50 },
      { label: { zh: '合作项目', en: 'Projects', ru: 'Проекты' }, value: 200 },
      { label: { zh: '国际合作伙伴', en: 'Partners', ru: 'Партнёры' }, value: 100 }
    ]
  },
  about: {
    title: { zh: '关于我们', en: 'About Us', ru: 'О нас' },
    content: { zh: zhAbout, en: zhAbout, ru: zhAbout }
  },
  footer: {
    companyName: { zh: '尚合丝路(西安)国际贸易有限公司', en: 'Shanghe Silk Road (Xi’an) International Trade Co., Ltd.', ru: 'Shanghe Silk Road (Сиань) International Trade Co., Ltd.' },
    copyright: { zh: '© 2026 尚合丝路 版权所有', en: '© 2026 Shanghe Silk Road. All rights reserved.', ru: '© 2026 Shanghe Silk Road. Все права защищены.' },
    address: { zh: '地址：西安市（占位）', en: 'Address: Xi’an (Placeholder)', ru: 'Адрес: Сиань (заполнитель)' },
    phone: '+86 000-0000-0000'
  }
};

export function t(locale: Locale, map: LocalizedText) {
  return map[locale] ?? map[i18nConfig.defaultLocale] ?? '';
}

export async function getHomeConfig(): Promise<HomeConfig> {
  const row = await prisma.homePageConfig.findFirst();
  if (!row) return defaultHomeConfig;
  return {
    hero: (row.hero as HomeConfig['hero']) ?? defaultHomeConfig.hero,
    sectors: (row.sectors as HomeConfig['sectors']) ?? defaultHomeConfig.sectors,
    featuredProjects: (row.featuredProjects as HomeConfig['featuredProjects']) ?? defaultHomeConfig.featuredProjects,
    affiliations: (row.affiliations as HomeConfig['affiliations']) ?? defaultHomeConfig.affiliations,
    about: (row.about as HomeConfig['about']) ?? defaultHomeConfig.about,
    footer: (row.footer as HomeConfig['footer']) ?? defaultHomeConfig.footer
  };
}
