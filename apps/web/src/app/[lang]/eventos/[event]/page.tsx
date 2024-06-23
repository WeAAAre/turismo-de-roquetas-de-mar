import { notFound } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AiOutlineArrowRight as ArrowRightComplete } from '@react-icons/all-files/ai/AiOutlineArrowRight';
import { CalendarIcon, ClockIcon } from '@radix-ui/react-icons';
import { readItems } from '@directus/sdk';

import { cn } from '@/lib/utils';
import { directus } from '@/lib/directus/server';
import type { Event } from '@/lib/directus/schema';
import RichText from '@/components/rich-text/rich-text';
import * as Grid from '@/components/grid/grid';
import DirectusImage from '@/components/directus-image/directus-image';

import generateSeoMetadata from '../../(helpers)/generate-seo-metadata';

const Map = dynamic(() => import('../../[category]/(ui)/map/map'), {
  ssr: false,
  loading: () => <div className="h-96 w-full bg-gray-100 animate-pulse" />,
});

export async function generateStaticParams() {
  const events = await directus.request(
    readItems('events', {
      fields: [
        'sluglify',
        {
          translations: ['languages_code'],
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
    }),
  );

  return events
    .map((event) =>
      event.translations?.map((translation) => ({
        lang: translation.languages_code as string,
        event: event.sluglify as string,
      })),
    )
    .flat();
}

export async function generateMetadata({ params }: EventPageProps) {
  const lang = params.lang;
  const sluglify = params.event;
  const data = await directus.request(
    readItems('events', {
      fields: [
        {
          image: ['id', 'width', 'height', 'title'],
        },
        {
          translations: ['name'],
        },
        {
          seo: [
            '*',
            {
              translations: ['title', 'description'],
            },
          ],
        },
      ],
      filter: {
        date: {
          _gte: new Date().toISOString(),
        },
        sluglify: {
          _eq: sluglify,
        },
      },
      deep: {
        seo: {
          translations: {
            _filter: {
              languages_code: lang,
            },
          },
        },
        translations: {
          _filter: {
            languages_code: lang,
          },
        },
      },
    }),
  );

  const seo = data[0]?.seo as {
    nofollow: boolean;
    noindex: boolean;
    translations?: {
      title: string;
      description: string;
    }[];
  } | null;

  return generateSeoMetadata(
    {
      ...seo,
      translations:
        !seo || seo?.translations?.length === 0
          ? [{ title: data[0]?.translations?.[0]?.name || '' }]
          : seo?.translations,
    } as never,
    { images: data[0]?.image, url: `/eventos/${sluglify}`, lang },
  );
}

interface EventPageProps {
  params: Record<string, string>;
}

const EventPage = async (props: EventPageProps) => {
  const {
    params: { lang, event: sluglify },
  } = props;

  if (!lang || !sluglify) return notFound();

  const data = await directus.request(
    readItems('events', {
      fields: [
        {
          image: ['id', 'title'],
        },
        'date',
        'type',
        'date_complete',
        'start_date',
        'end_date',
        'price',
        'address',
        'link',
        {
          translations: ['name', 'content'],
        },
      ],
      filter: {
        sluglify: {
          _eq: sluglify,
        },
      },
      limit: 1,
      deep: {
        translations: {
          _filter: {
            languages_code: lang,
          },
        },
      },
    }),
  );

  if (data.length === 0) return notFound();

  const event = data[0]!;
  const { name, content } = event.translations?.[0] || {};

  return (
    <main className="bg-[rgb(105,98,109)]/10 pt-24 pb-10">
      <Grid.Root>
        <Grid.Item className="lg:mx-20" col="12">
          <div className="p-4 border rounded-lg  bg-white ">
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-6 md:col-span-4 order-1 md:order-0">
                <h1 className="text-2xl md:text-3xl font-semibold">{name}</h1>
                <div className="py-4 border-y my-4">
                  <DetailEvent {...event} />
                </div>
                {content ? (
                  <div className="grid gap-4">
                    <h2 className="text-lg font-medium">Descripción</h2>
                    <RichText className="prose-sm max-w-none">
                      {content}
                    </RichText>
                  </div>
                ) : null}
              </div>
              <div className="col-span-6 md:col-span-2 md:order-1 h-full">
                <DirectusImage
                  alt={name || ''}
                  className="object-cover rounded-lg border aspect-square mx-auto"
                  height={500}
                  item={event.image}
                  width={500}
                />
                <div className="mt-6 rounded-lg border overflow-hidden h-56 hidden lg:block">
                  <Map
                    defaultCenter={[36.76419, -2.61475]}
                    disableStartOpen
                    height="100%"
                    items={[
                      {
                        coordinates: event.address?.coordinates,
                        name: name || '',
                        image: event.image.id,
                      },
                    ]}
                    zoom={16}
                  />
                </div>
              </div>
            </div>
          </div>
        </Grid.Item>
      </Grid.Root>
      {event.link ? (
        <div className="fixed bottom-0 left-0 right-0 bg-white py-4 border-t border-gray-200 z-[9999]">
          <Grid.Root>
            <Grid.Item className="md:mx-20" col="12">
              <div
                className={cn('flex justify-between', {
                  'justify-end': !event.price,
                })}
              >
                {event.price ? (
                  <span className="flex flex-col items-start">
                    <span>Desde</span>
                    <span className="font-bold ml-2">{event.price}€</span>
                  </span>
                ) : null}
                <div>
                  <a
                    className=" bg-[#39f] flex gap-2 items-center text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 ease-in-out"
                    href={event.link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Comprar
                    <ArrowRightComplete
                      aria-hidden
                      className="ctr-animation size-5 fill-current"
                      focusable="false"
                    />
                  </a>
                </div>
              </div>
            </Grid.Item>
          </Grid.Root>
        </div>
      ) : null}
    </main>
  );
};

interface DetailEventProps {
  type: Event['type'];
  start_date: Event['start_date'];
  end_date: Event['end_date'];
  date_complete: Event['date_complete'];
  date: Event['date'];
  address: Event['address'];
}

const DetailEvent = (props: DetailEventProps) => {
  const {
    type,
    start_date: startDate,
    end_date: endDate,
    date_complete: dateComplete,
    date,
    address,
  } = props;

  const dateLongTimeFormat = new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const dateShortTimeFormat = new Intl.DateTimeFormat('es', {
    month: 'long',
    day: 'numeric',
  });

  const hourFormat = new Intl.DateTimeFormat('es', {
    hour: 'numeric',
    minute: 'numeric',
  });

  const yearFormat = new Intl.DateTimeFormat('es', {
    year: 'numeric',
  });

  const features = {
    one_day_event: date
      ? [
          {
            icon: CalendarIcon,
            label: 'Fecha del evento',
            value: dateLongTimeFormat.format(new Date(date)),
          },
          {
            icon: ClockIcon,
            label: 'Hora de inicio',
            value: hourFormat.format(new Date(date)),
          },
        ]
      : [],
    long_event:
      startDate && endDate
        ? [
            {
              icon: CalendarIcon,
              label: 'Periodo del evento',
              value: `${dateShortTimeFormat.format(new Date(startDate ?? ''))} - ${dateShortTimeFormat.format(new Date(endDate ?? ''))}, ${yearFormat.format(new Date(startDate ?? ''))}`,
            },
          ]
        : [],
    one_day_complete: dateComplete
      ? [
          {
            icon: CalendarIcon,
            label: 'Fecha del evento',
            value: dateLongTimeFormat.format(new Date(dateComplete)),
          },
        ]
      : [],
  } as const;

  const config = features[type ?? 'one_day_event'];

  const hrefGoogleMaps = `https://www.google.es/maps/dir/${address?.coordinates?.[1]},${address?.coordinates?.[0]}`;

  return (
    <div className="grid gap-3">
      <div className="flex gap-3">
        <Link
          aria-label="Como llegar en Google Maps"
          className="lg:hidden relative h-20 w-20 rounded-full overflow-hidden border"
          href={hrefGoogleMaps}
        >
          <DirectusImage
            alt=""
            height={160}
            item="269afadc-7dcf-4847-944b-5de804626546"
            width={160}
          />
          <div className="absolute inset-0 m-auto bg-red-500 w-4 h-4 rounded-full border border-slate-300" />
        </Link>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-medium">Detalles</h2>
          {config.map((feature, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="text-black/80 flex items-center gap-2" key={index}>
              <feature.icon aria-hidden />
              <time className="text-sm">{feature.value}</time>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPage;
