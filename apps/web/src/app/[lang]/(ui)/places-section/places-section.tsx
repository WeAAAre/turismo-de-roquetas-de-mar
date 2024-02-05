import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import * as Grid from '@/components/grid/grid';

import SectionTitle from '../section-title/section-title';
import * as Card from '../card-horizontal/card-horizontal';

interface PlacesSectionProps {
  lang: string;
}

const PlacesSection = async (props: PlacesSectionProps) => {
  const { lang } = props;

  const data = await directus.request(
    readItems('category', {
      fields: [
        'id',
        'image',
        'sluglify',
        'redirect_to',
        {
          translations: ['name'],
        },
      ],
      filter: {
        type: {
          _eq: 'site',
        },
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

  const getPlacesHref = (item: { sluglify: string | null }) => {
    return `/${lang}/${item.sluglify}`;
  };

  return (
    <Grid.Root>
      <Grid.Item col="12">
        <SectionTitle title="Datos y lugares de interés" />
      </Grid.Item>
      <Grid.Item
        className="mt-5 lg:mt-10 grid xl:grid 2xl:grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        col="12"
      >
        {data.map((item) => (
          <Card.Root
            className="col-span-1"
            href={item.redirect_to ?? getPlacesHref(item)}
            key={item.id}
          >
            <Card.Image
              image={item.image}
              title={item.translations?.[0]?.name || ''}
            />
            <Card.Title>{item.translations?.[0]?.name || ''}</Card.Title>
            <Card.Arrow />
          </Card.Root>
        ))}
      </Grid.Item>
    </Grid.Root>
  );
};

export default PlacesSection;
