import Link from 'next/link';
import { AiOutlineArrowRight as ArrowRightIcon } from '@react-icons/all-files/ai/AiOutlineArrowRight';
import { readItems } from '@directus/sdk';

import { cn } from '@/lib/utils';
import { directus } from '@/lib/directus/server';
import * as Grid from '@/components/grid/grid';
import DirectusImage from '@/components/directus-image/directus-image';

import SectionTitle from '../section-title/section-title';

interface EventsSectionProps {
  lang: string;
}

const getEventLink = (event: { sluglify: string | null }) =>
  `/eventos/${event.sluglify}`;

const EventsSection = async (props: EventsSectionProps) => {
  const { lang } = props;
  const result = await directus.request(
    readItems('events', {
      fields: [
        'id',
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
        date: {
          _gte: new Date().toISOString(),
        },
      },
      deep: {
        translations: {
          _filter: {
            languages_code: lang,
          },
        },
      },
      sort: ['date'],
      limit: 6,
    }),
  );

  const mainEvent = result[0];
  const secondaryEvents = result.slice(1);

  if (!mainEvent) return null;

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
                {new Date(mainEvent.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                })}
              </span>
              <span className="text-xs">
                {new Date(mainEvent.date).toLocaleDateString('es-ES', {
                  month: 'short',
                })}
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
                    {new Date(event.date).toLocaleDateString('es-ES', {
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-base lg:text-lg">
                    {new Date(event.date).toLocaleDateString('es-ES', {
                      month: 'short',
                    })}
                  </span>
                </div>
                <div className="relative col-span-3 w-full">
                  <DirectusImage
                    alt={event.translations?.[0]?.name || ''}
                    className="object-cover border-x"
                    fill
                    item={event.image}
                    sizes="35vw"
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
              href="/eventos"
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
