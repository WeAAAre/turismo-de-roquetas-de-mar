import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AiOutlineArrowRight as ArrowRightComplete } from '@react-icons/all-files/ai/AiOutlineArrowRight';
import { readItems } from '@directus/sdk';

import { cn } from '@/lib/utils';
import { directus } from '@/lib/directus/server';
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
        date: {
          _gte: new Date().toISOString(),
        },
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
    },
    { images: data[0]?.image },
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
        'price',
        'address',
        'link',
        {
          translations: ['name', 'content'],
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
        <Grid.Item className="md:mx-20" col="12">
          <div className="p-4 border rounded-lg  bg-white ">
            <div className="grid grid-cols-6 gap-4">
              <div className="col-span-6 md:col-span-4 order-1 md:order-0">
                <h1 className="text-3xl font-bold mb-5">{name}</h1>
                {content ? (
                  <RichText className="prose-sm max-w-none">{content}</RichText>
                ) : null}
              </div>
              <div className="relative col-span-6 md:col-span-2 min-h-96 h-full order-0 md:order-1">
                <DirectusImage
                  alt={name || ''}
                  className="object-cover rounded-lg border"
                  fill
                  item={event.image}
                />
              </div>
            </div>
            <div className="mt-6 rounded-lg border overflow-hidden h-96 md:mx-20">
              <Map
                defaultCenter={[36.76419, -2.61475]}
                disableStartOpen
                height="100%"
                items={[
                  {
                    coordinates: event.address?.coordinates,
                    name: name || '',
                    address: '',
                    image: event.image.id,
                  },
                ]}
                zoom={16}
              />
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

export default EventPage;
