export const i18n = {
  locales: ['de-DE', 'en-US', 'fr-FR', 'it-IT', 'pt-BR', 'es-ES'],
  defaultLocale: 'es-ES',
} as const;

export type Locale = (typeof i18n)['locales'][number];
