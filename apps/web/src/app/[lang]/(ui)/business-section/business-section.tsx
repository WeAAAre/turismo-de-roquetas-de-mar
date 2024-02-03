import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import * as Grid from '@/components/grid/grid';

import SectionTitle from '../section-title/section-title';
import * as Card from '../card-horizontal/card-horizontal';

interface BusinessSectionProps {
  lang: string;
}

const getBusinessHref = (item: { sluglify: string | null }) => {
  return `/${item.sluglify}`;
};

const BusinessSection = async (props: BusinessSectionProps) => {
  const { lang } = props;

  const data = await directus.request(
    readItems('category', {
      fields: [
        'id',
        'image',
        'sluglify',
        {
          translations: ['name'],
        },
      ],
      filter: {
        type: {
          _eq: 'business',
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

  return (
    <Grid.Root>
      <Grid.Item col="12">
        <SectionTitle title="Negocios" />
      </Grid.Item>
      <Grid.Item
        className="mt-5 lg:mt-10 grid xl:grid 2xl:grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        col="12"
      >
        {data.map((item) => (
          <Card.Root
            className="col-span-1"
            href={getBusinessHref(item)}
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

export default BusinessSection;
