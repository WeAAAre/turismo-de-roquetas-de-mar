import Link from 'next/link';
import { AiOutlineArrowRight as ArrowRightIcon } from '@react-icons/all-files/ai/AiOutlineArrowRight';
import { readItems } from '@directus/sdk';

import { cn } from '@/lib/utils';
import { directus } from '@/lib/directus/server';
import * as Grid from '@/components/grid/grid';
import DirectusImage from '@/components/directus-image/directus-image';

import SectionTitle from '../section-title/section-title';
import {
  getEventReferenceDate,
  sortEvents,
} from '../../eventos/_helpers/sort-events';

interface EventsSectionProps {
  lang: string;
}

const EventsSection = async (props: EventsSectionProps) => {
  const { lang } = props;
  const result = await directus.request(
    readItems('events', {
      fields: [
        'id',
        'type',
        'start_date',
        'end_date',
        'date_complete',
        'date',
        'image',
        'id',
        'type',
        'sluglify',
        {
          translations: ['name', 'smallDescription'],
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
      },
      deep: {
        translations: {
          _filter: {
            languages_code: lang,
          },
        },
      },
      limit: -1,
    }),
  );

  const eventsSorted = sortEvents(result).slice(0, 6);
  const mainEvent = eventsSorted.shift();

  if (!mainEvent) return null;

  const secondaryEvents = eventsSorted;

  const getEventLink = (event: { sluglify: string | null }) =>
    `/${lang}/eventos/${event.sluglify}`;

  return (
    <Grid.Root>
      <Grid.Item col="12">
        <SectionTitle title="Eventos" />
      </Grid.Item>
      <Grid.Item className="mt-5" col="12|12|4">
        <div className="rounded-lg overflow-hidden relative">
          <Link href={getEventLink(mainEvent)}>
            <DirectusImage
              alt={mainEvent.translations?.[0]?.name || ''}
              className="w-full max-h-[28rem] object-cover"
              height={400}
              item={mainEvent.image}
              width={400}
            />
            <div className="absolute top-4 right-4 rounded-lg bg-white items-center px-4 py-1 flex flex-col">
              <span className="text-xl font-bold">
                {new Date(getEventReferenceDate(mainEvent)).toLocaleDateString(
                  'es-ES',
                  {
                    day: 'numeric',
                  },
                )}
              </span>
              <span className="text-xs">
                {new Date(getEventReferenceDate(mainEvent)).toLocaleDateString(
                  'es-ES',
                  {
                    month: 'short',
                  },
                )}
              </span>
            </div>
            <div className="absolute bottom-0 w-full backdrop-blur-2xl px-4 bg-black/10 py-4">
              <span className="text-white font-bold text-lg lg:text-xl">
                {mainEvent.translations?.[0]?.name || ''}
              </span>
            </div>
          </Link>
        </div>
      </Grid.Item>
      <Grid.Item className="mt-2 lg:mt-5" col="12|12|8">
        <ul className="grid grid-cols-1 lg:grid-cols-2 rounded-lg border-l border-b overflow-hidden relative">
          {secondaryEvents.map((event, idx) => (
            <li key={event.id}>
              <Link
                className={cn(
                  'col-span-1 w-full pr-1 grid grid-cols-12 h-[9.3rem] border-t border-r hover:bg-blue-100/30',
                  {
                    'hidden lg:grid': idx >= 3,
                  },
                )}
                href={getEventLink(event)}
              >
                <div className="flex flex-col px-4 justify-center col-span-2">
                  <span className="leading-4 lg:leading-5 text-xl lg:text-2xl font-semibold">
                    {new Date(getEventReferenceDate(event)).toLocaleDateString(
                      'es-ES',
                      {
                        day: 'numeric',
                      },
                    )}
                  </span>
                  <span className="text-base lg:text-lg">
                    {new Date(getEventReferenceDate(event)).toLocaleDateString(
                      'es-ES',
                      {
                        month: 'short',
                      },
                    )}
                  </span>
                </div>
                <div className="relative col-span-3 w-full">
                  <DirectusImage
                    alt={event.translations?.[0]?.name || ''}
                    className="object-cover border-x"
                    fill
                    item={event.image}
                    sizes="(max-width: 768px) 20vw, (min-width: 768px) 12vw"
                  />
                </div>
                <h3 className="col-span-7 lowercase text-black/95 py-2 first-letter:uppercase px-4 leading-5">
                  {event.translations?.[0]?.name || ''}
                </h3>
              </Link>
            </li>
          ))}
          <li>
            <Link
              className="flex gap-4 text-2xl font-semibold py-5 justify-center items-center h-full border-t border-r hover:bg-blue-100/30"
              href={`/${lang}/eventos`}
            >
              Ver más eventos
              <ArrowRightIcon aria-hidden />
            </Link>
          </li>
        </ul>
      </Grid.Item>
    </Grid.Root>
  );
};

export default EventsSection;
