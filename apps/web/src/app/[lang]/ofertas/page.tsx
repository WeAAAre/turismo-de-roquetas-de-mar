import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BsClockHistory as ClockIcon } from '@react-icons/all-files/bs/BsClockHistory';
import { BsChevronRight as ArrowRightIcon } from '@react-icons/all-files/bs/BsChevronRight';
import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import * as Grid from '@/components/grid/grid';
import DirectusImage from '@/components/directus-image/directus-image';

import SearchBar from '../[category]/(ui)/search-bar/search-bar';
import generateSeoMetadata from '../(helpers)/generate-seo-metadata';
import DialogDetailOffer from './(ui)/dialog-detail-offer/dialog-detail-offer';

import type { Seo } from '../(helpers)/generate-seo-metadata';

export async function generateStaticParams() {
  const languages = await directus.request(
    readItems('languages', {
      fields: ['code'],
    }),
  );

  return languages.map((language) => ({
    lang: language.code,
  }));
}

export async function generateMetadata({ params }: OffersPageProps) {
  const lang = params.lang;

  const offers = await directus.request(
    readItems('ideas_offers', {
      fields: ['image'],
      limit: 4,
      filter: {
        end_date: {
          _gte: new Date().toISOString(),
        },
      },
    }),
  );

  const data = await directus.request(
    readItems('ideas_offer_page', {
      fields: [
        {
          seo: [
            '*',
            {
              translations: ['title', 'description'],
            },
          ],
        },
      ],
      deep: {
        seo: {
          translations: {
            _filter: {
              languages_code: lang,
            },
          },
        },
      },
    }),
  );

  const images = offers.map((offer) => offer.image as string);
  const seo = data[0]?.seo as Seo;

  if (!seo) return;

  return generateSeoMetadata(seo, { images, url: `/${lang}/ofertas` });
}

interface OffersPageProps {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

const OffersPage = async (props: OffersPageProps) => {
  const {
    params: { lang },
    searchParams,
  } = props;

  if (!lang) return notFound();

  const offers = await directus.request(
    readItems('ideas_offers', {
      fields: [
        'id',
        { image: ['id', 'title'] },
        {
          translations: ['title', 'description'],
        },
        'end_date',
        {
          business: ['address', 'streetAddress'],
        },
      ],
      limit: -1,
      sort: 'end_date',
      filter: {
        end_date: {
          _gte: new Date().toISOString(),
        },
        ...(searchParams.q
          ? {
              translations: {
                _some: {
                  languages_code: {
                    _eq: lang,
                  },
                  title: {
                    _contains: searchParams.q,
                  },
                },
              },
            }
          : {}),
      },
      deep: {
        translations: {
          _filter: {
            languages_code: lang,
          },
        },
      },
    }),
  );

  const itemId = searchParams.p;

  return (
    <main className="bg-[rgb(105,98,109)]/10 py-24">
      <Grid.Root>
        <Grid.Item col="12">
          <h1 className="text-3xl font-semibold lg:text-4xl">
            Ofertas e ideas para disfrutar
          </h1>
        </Grid.Item>
        <Grid.Item className="mt-6" col="12">
          <Suspense>
            <SearchBar defaultQuery={searchParams.q} />
          </Suspense>
        </Grid.Item>
        <Grid.Item className="mt-6" col="12">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3">
            {offers.map((offer) => (
              <li key={offer.id}>
                <Link
                  className="bg-white border rounded-lg p-4 col-span-1 flex gap-3 hover:border-blue-500/20 hover:bg-blue-500/5 transition-colors"
                  href={`?p=${offer.id}${
                    searchParams.q ? `&q=${searchParams.q}` : ''
                  }`}
                >
                  <DirectusImage
                    alt={offer.translations?.[0]?.title || ''}
                    className="max-w-24 max-h-24 md:max-w-32 md:max-h-32 w-full h-full object-cover rounded-lg"
                    height={450}
                    item={offer.image}
                    width={300}
                  />
                  <div className="flex flex-col flex-1">
                    <h2 className="line-clamp-4 flex-1 text-sm md:text-base">
                      {offer.translations?.[0]?.title}
                    </h2>
                    {offer.end_date ? (
                      <div className="text-xs text-black border px-2 py-1 rounded-lg w-max mt-1 flex gap-1">
                        <ClockIcon aria-hidden className="self-center size-3" />
                        <p>
                          Termina el{' '}
                          {new Date(offer.end_date).toLocaleDateString(
                            'es-ES',
                            {
                              day: 'numeric',
                              month: 'short',
                            },
                          )}
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <ArrowRightIcon
                    aria-hidden
                    className="self-center min-w-5 h-5"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Grid.Item>
      </Grid.Root>
      {itemId ? (
        <Suspense>
          <DialogDetailOffer lang={lang} offerId={itemId} />
        </Suspense>
      ) : null}
    </main>
  );
};

export default OffersPage;
