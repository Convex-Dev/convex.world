export const locales = ['en', 'zh', 'es', 'fr', 'ar', 'hi', 'pt', 'ru', 'ja', 'de'] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  es: 'Español',
  fr: 'Français',
  ar: 'العربية',
  hi: 'हिन्दी',
  pt: 'Português',
  ru: 'Русский',
  ja: '日本語',
  de: 'Deutsch',
};

export const defaultLocale: Locale = 'en';
