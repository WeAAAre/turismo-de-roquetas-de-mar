import { createI18nMiddleware } from 'next-international/middleware';

import { i18n } from '@/lib/i18/config';

const I18nMiddleware = createI18nMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
  urlMappingStrategy: 'redirect',
});

export default I18nMiddleware;

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|robots.txt|sitemap.xml|favicon.ico).*)',
  ],
};
