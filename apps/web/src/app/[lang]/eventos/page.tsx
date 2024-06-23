'use server';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MdShare as ShareIcon } from '@react-icons/all-files/md/MdShare';
import { BsChevronRight as ArrowRightIcon } from '@react-icons/all-files/bs/BsChevronRight';
import { readItems } from '@directus/sdk';

import { cn } from '@/lib/utils';
import { directus } from '@/lib/directus/server';
import RichText from '@/components/rich-text/rich-text';
import * as Grid from '@/components/grid/grid';
import DirectusImage from '@/components/directus-image/directus-image';

import SearchBar from '../[category]/(ui)/search-bar/search-bar';
import ShareButton from '../[category]/(ui)/category-list/share-button';
import generateSeoMetadata from '../(helpers)/generate-seo-metadata';
import { sortEvents } from './_helpers/sort-events';
import { formatEventDate } from './_helpers/format-event-date';

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

export async function generateMetadata({ params }: EventsPageProps) {
  const lang = params.lang;

  const firstEvent = await directus.request(
    readItems('events', {
      fields: [
        {
          image: ['id', 'title', 'width', 'height'],
        },
      ],
      limit: 1,
      filter: {
        _or: [
          {
            type: {
              _eq: 'long_event',
            },
            end_date: {
              _gte: new Date().toISOString(),
            },
          },
          {
            type: {
              _eq: 'one_day_event',
            },
            date: {
              _gte: new Date().toISOString(),
            },
          },
          {
            type: {
              _eq: 'one_day_complete',
            },
            date_complete: {
              _gte: new Date().toISOString(),
            },
          },
        ],
      },
      sort: ['date'],
    }),
  );

  const data = await directus.request(
    readItems('events_page', {
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

  const images = firstEvent.map((event) => event.image as never);
  const seo = data[0]?.seo as Seo;

  return generateSeoMetadata(seo, { images, url: `/eventos`, lang });
}

interface EventsPageProps {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

const EventsPage = async (props: EventsPageProps) => {
  const {
    params: { lang },
    searchParams,
  } = props;

  if (!lang) return notFound();

  const query = searchParams.q;

  const data = await directus.request(
    readItems('events', {
      fields: [
        'id',
        'type',
        'start_date',
        'end_date',
        'date',
        'date_complete',
        { image: ['id', 'title'] },
        'sluglify',
        {
          translations: ['name', 'smallDescription', 'content'],
        },
      ],
      filter: {
        _or: [
          {
            type: {
              _eq: 'long_event',
            },
            end_date: {
              _gte: new Date().toISOString(),
            },
          },
          {
            type: {
              _eq: 'one_day_event',
            },
            date: {
              _gte: new Date().toISOString(),
            },
          },
          {
            type: {
              _eq: 'one_day_complete',
            },
            date_complete: {
              _gte: new Date().toISOString(),
            },
          },
        ],
        ...(query
          ? {
              translations: {
                _some: {
                  languages_code: {
                    _eq: lang,
                  },
                  name: {
                    _contains: query,
                  },
                },
              },
            }
          : {}),
      },
      sort: ['date'],
      limit: -1,
      deep: {
        translations: {
          _filter: {
            languages_code: lang,
          },
        },
      },
    }),
  );
  if (!data.length) return notFound();

  const eventsSorted = sortEvents(data);
  const mainEvent = eventsSorted.shift()!;
  const events = eventsSorted;

  return (
    <main className="bg-[rgb(105,98,109)]/10 py-24">
      <Grid.Root className="">
        <Grid.Item col="12">
          <div className="border rounded-lg md:h-96 overflow-hidden grid grid-cols-4 p-4 gap-5 bg-white">
            <div className="relative col-span-4 h-96 md:mx-0 md:h-auto md:col-span-1">
              <DirectusImage
                alt={mainEvent.translations?.[0]?.name || ''}
                className="object-cover rounded-lg"
                fill
                item={mainEvent.image}
                sizes="(max-width: 768px) 70vw, (min-width: 768px) 30vw"
              />
            </div>
            <div className="col-span-4 md:col-span-3 flex flex-col">
              <h1 className="md:text-2xl font-medium">
                {mainEvent.translations?.[0]?.name}
              </h1>
              <ShareButton
                className="border text-sm px-2 py-1 rounded-lg mt-2 flex items-center gap-2 w-max"
                href={mainEvent.sluglify || ''}
                name={mainEvent.translations?.[0]?.name || ''}
              >
                <span>Compartir</span>
                <ShareIcon className="inline-block size-4" />
              </ShareButton>
              {mainEvent.translations?.[0]?.content ? (
                <div className="mt-2 text-gray-500 line-clamp-6">
                  <RichText className="prose-sm max-w-none">
                    {mainEvent.translations?.[0]?.content}
                  </RichText>
                </div>
              ) : null}
              <div className="flex-1 mt-4 flex items-end justify-center md:justify-end">
                <Link
                  className="bg-[#39f] w-full justify-center md:w-max px-3 py-2 hover:bg-blue-500 text-white text-sm rounded-lg flex items-center gap-2 transition-colors"
                  href={`/${lang}/eventos/${mainEvent.sluglify}`}
                >
                  <span>Ver más información</span>
                  <ArrowRightIcon className="inline-block size-4" />
                </Link>
              </div>
            </div>
          </div>
        </Grid.Item>
        <Grid.Item className="mt-6" col="12">
          <h2 className="text-3xl font-semibold lg:text-4xl">
            Próximos eventos
          </h2>
        </Grid.Item>
        <Grid.Item className="mt-4" col="12">
          <Suspense>
            <SearchBar defaultQuery={searchParams.q} />
          </Suspense>
        </Grid.Item>
        <Grid.Item col="12">
          <ul className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <li key={event.id}>
                <Link
                  className={cn(
                    'gap-2 md:gap-4 p-3 bg-white rounded-lg border grid grid-cols-12',
                    'hover:border-blue-500/20 hover:bg-blue-500/5 transition-colors',
                  )}
                  href={`/${lang}/eventos/${event.sluglify}`}
                >
                  <div className="relative overflow-hidden bg-gray-200 rounded-lg h-36 col-span-4 md:col-span-3">
                    <DirectusImage
                      alt={event.translations?.[0]?.name || ''}
                      className="object-cover"
                      fill
                      item={event.image}
                      sizes="20vw"
                    />
                  </div>
                  <div className="col-span-8 md:col-span-8 flex flex-col gap-1">
                    <h3 className="text-sm md:text-lg">
                      {event.translations?.[0]?.name}
                    </h3>
                    <time className="border px-2 py-1 w-max rounded-lg text-xs text-gray-500">
                      {formatEventDate(event)}
                    </time>
                    <p className="mt-2 text-xs text-gray-500 line-clamp-3">
                      {event.translations?.[0]?.smallDescription}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Grid.Item>
      </Grid.Root>
    </main>
  );
};

export default EventsPage;
