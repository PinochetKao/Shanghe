import { Locale } from './i18n';

const dictionaries = {
  zh: {
    nav: { home: '首页', about: '关于我们', services: '服务', projects: '项目', platforms: '平台', news: '新闻', contact: '联系我们', competition: '创业比赛' },
    common: { lang: '语言', submit: '提交', admin: '后台管理' },
    home: { title: '公司官网 MVP', intro: '这是可扩展的多语言企业站骨架。', competitionTitle: '留学生创业比赛', competitionIntro: '欢迎查看大赛详情并提交报名。', viewCompetition: '查看大赛详情' },
    contact: { title: '联系我们', name: '姓名', email: '邮箱', subject: '主题', message: '留言内容', success: '提交成功，我们会尽快联系您。' },
    competition: { title: '留学生创业比赛', intro: '比赛简介（占位）', ctaDownload: '下载资料', ctaRegister: '立即报名', schedule: '赛程/奖项/要求（占位）', success: '报名成功！', gender: ['男', '女', '其他'], grades: ['大一', '大二', '大三', '大四', '研一', '研二'], education: ['本科', '硕士', '博士'] }
  },
  en: {
    nav: { home: 'Home', about: 'About', services: 'Services', projects: 'Projects', platforms: 'Platforms', news: 'News', contact: 'Contact', competition: 'Competition' },
    common: { lang: 'Language', submit: 'Submit', admin: 'Admin' },
    home: { title: 'Corporate Website MVP', intro: 'A scalable multilingual corporate website skeleton.', competitionTitle: 'International Student Innovation Competition', competitionIntro: 'Check details and submit your registration.', viewCompetition: 'View Competition Details' },
    contact: { title: 'Contact Us', name: 'Name', email: 'Email', subject: 'Subject', message: 'Message', success: 'Submitted successfully.' },
    competition: { title: 'International Student Innovation Competition', intro: 'Competition introduction (placeholder)', ctaDownload: 'Download PDF', ctaRegister: 'Register Now', schedule: 'Timeline / Awards / Requirements (placeholder)', success: 'Registration submitted!', gender: ['Male', 'Female', 'Other'], grades: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Master 1', 'Master 2'], education: ['Bachelor', 'Master', 'PhD'] }
  },
  ru: {
    nav: { home: 'Главная', about: 'О нас', services: 'Услуги', projects: 'Проекты', platforms: 'Платформы', news: 'Новости', contact: 'Контакты', competition: 'Конкурс' },
    common: { lang: 'Язык', submit: 'Отправить', admin: 'Админ' },
    home: { title: 'MVP корпоративного сайта', intro: 'Масштабируемый мультиязычный каркас сайта.', competitionTitle: 'Конкурс стартапов для иностранных студентов', competitionIntro: 'Изучите детали конкурса и отправьте заявку.', viewCompetition: 'Подробнее о конкурсе' },
    contact: { title: 'Свяжитесь с нами', name: 'Имя', email: 'Email', subject: 'Тема', message: 'Сообщение', success: 'Успешно отправлено.' },
    competition: { title: 'Конкурс стартапов для иностранных студентов', intro: 'Описание конкурса (заглушка)', ctaDownload: 'Скачать PDF', ctaRegister: 'Подать заявку', schedule: 'Этапы / Награды / Требования (заглушка)', success: 'Заявка отправлена!', gender: ['Мужской', 'Женский', 'Другое'], grades: ['1 курс', '2 курс', '3 курс', '4 курс', 'Магистр 1', 'Магистр 2'], education: ['Бакалавр', 'Магистр', 'PhD'] }
  }
} as const;

export const getDictionary = (locale: Locale) =>
  (dictionaries[locale as keyof typeof dictionaries] ?? dictionaries.zh) as (typeof dictionaries)['zh'];
