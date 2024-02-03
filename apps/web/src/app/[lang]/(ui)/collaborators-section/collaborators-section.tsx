import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import * as Grid from '@/components/grid/grid';
import DirectusImage from '@/components/directus-image/directus-image';

import SectionTitle from '../section-title/section-title';

const CollaboratorsSection = async () => {
  const data = await directus.request(
    readItems('collaborator', {
      fields: ['id', { image: ['title', 'id'] }, 'url'],
    }),
  );

  return (
    <Grid.Root>
      <Grid.Item col="12">
        <SectionTitle title="Colaboradores" />
      </Grid.Item>
      <Grid.Item
        className="mt-5 lg:mt-10 grid xl:grid 2xl:grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center"
        col="12"
      >
        {data.map((item) => (
          <a
            className="bg-white p-6 rounded-xl shadow-xl w-max"
            href={item.url!}
            key={item.id}
            rel="noopener noreferrer"
            target="_blank"
          >
            {item.image ? (
              <DirectusImage
                alt=""
                className="w-20 h-20 object-cover"
                height={160}
                item={item.image as never}
                width={160}
              />
            ) : null}
          </a>
        ))}
      </Grid.Item>
    </Grid.Root>
  );
};

export default CollaboratorsSection;
