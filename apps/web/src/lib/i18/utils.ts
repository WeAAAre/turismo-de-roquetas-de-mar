import { i18n } from './config';

const transfromLocaleToLang = (locale?: string) => {
  const TRANSFORM_LOCALE = {
    'en-US': 'en',
    'es-ES': 'es',
    'de-DE': 'de',
    'fr-FR': 'fr',
    'it-IT': 'it',
    'pt-BR': 'pt',
  };
  const defaultLocale = TRANSFORM_LOCALE[i18n.defaultLocale];

  if (!locale) return defaultLocale;

  return (
    TRANSFORM_LOCALE[locale as keyof typeof TRANSFORM_LOCALE] || defaultLocale
  );
};

export { transfromLocaleToLang };
