import type { Locale } from '@/lib/i18/config';
import { env } from '@/env/server.mjs';

import { generateStaticParams as termsAndConditionsStaticParams } from './[lang]/terminos-y-condiciones/page';
import { generateStaticParams as policyStaticParams } from './[lang]/politica-de-privacidad/page';
import { generateStaticParams as homeStaticParams } from './[lang]/page';
import { generateStaticParams as offersStaticParams } from './[lang]/ofertas/page';
import { generateStaticParams as eventsStaticParams } from './[lang]/eventos/page';
import { generateStaticParams as eventStaticParams } from './[lang]/eventos/[event]/page';
import { generateStaticParams as postStaticParams } from './[lang]/blog/[post]/page';
import { generateStaticParams as categoryStaticParams } from './[lang]/[category]/page';
import { generateStaticParams as businessStaticParams } from './[lang]/[category]/[business]/page';

import type { MetadataRoute } from 'next';

const LANGUAGES: Locale[] = ['es-ES', 'en-US'];

const config = {
  home: {
    build: (lang: string) => `/${lang}`,
    priority: 1,
    changeFrequency: 'daily',
  },
  event: {
    build: (lang: string, event: string) => `/${lang}/eventos/${event}`,
    priority: 0.95,
    changeFrequency: 'daily',
  },
  offers: {
    build: (lang: string) => `/${lang}/ofertas`,
    priority: 0.9,
    changeFrequency: 'daily',
  },
  events: {
    build: (lang: string) => `/${lang}/eventos`,
    priority: 0.9,
    changeFrequency: 'daily',
  },
  termsAndConditions: {
    build: (lang: string) => `/${lang}/terminos-y-condiciones`,
    priority: 0.5,
    changeFrequency: 'yearly',
  },
  policy: {
    build: (lang: string) => `/${lang}/politica-de-privacidad`,
    priority: 0.5,
    changeFrequency: 'yearly',
  },
  category: {
    build: (lang: string, category: string) => `/${lang}/${category}`,
    priority: 0.8,
    changeFrequency: 'weekly',
  },
  business: {
    build: (lang: string, category: string, business: string) =>
      `/${lang}/${category}/${business}`,
    priority: 0.85,
    changeFrequency: 'weekly',
  },
  post: {
    build: (lang: string, post: string) => `/${lang}/blog/${post}`,
    priority: 0.9,
    changeFrequency: 'weekly',
  },
} as const;

const byPurgeLanguages = (params?: { lang: string }) =>
  params && LANGUAGES.includes(params.lang as Locale);

const toSitemap =
  (cg: {
    build: (...args: string[]) => string;
    priority: number;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[0]>['changeFrequency'];
  }) =>
  (params?: Record<string, string>): MetadataRoute.Sitemap[0] => ({
    url: `${env.URL}${cg.build(...Object.values(params || {}))}`,
    changeFrequency: cg.changeFrequency,
    priority: cg.priority,
  });

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    home,
    offers,
    events,
    event,
    termsAndConditions,
    policy,
    category,
    business,
    post,
  ] = await Promise.all([
    homeStaticParams(),
    offersStaticParams(),
    eventsStaticParams(),
    eventStaticParams(),
    termsAndConditionsStaticParams(),
    policyStaticParams(),
    categoryStaticParams(),
    businessStaticParams(),
    postStaticParams(),
  ]);

  return [
    home.filter(byPurgeLanguages).map(toSitemap(config.home)),
    offers.filter(byPurgeLanguages).map(toSitemap(config.offers)),
    events.filter(byPurgeLanguages).map(toSitemap(config.events)),
    event.filter(byPurgeLanguages).map(toSitemap(config.event)),
    termsAndConditions
      .filter(byPurgeLanguages)
      .map(toSitemap(config.termsAndConditions)),
    policy.filter(byPurgeLanguages).map(toSitemap(config.policy)),
    category.filter(byPurgeLanguages).map(toSitemap(config.category)),
    business.filter(byPurgeLanguages).map(toSitemap(config.business)),
    post.filter(byPurgeLanguages).map(toSitemap(config.post)),
  ].flat();
}
