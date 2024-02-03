import { notFound } from 'next/navigation';
import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import type { DirectusFile } from '@/lib/directus/schema';
import * as Grid from '@/components/grid/grid';
import { assetURL } from '@/components/directus-image/directus-image';

import generateSeoMetadata from '../../(helpers)/generate-seo-metadata';
import BusinessInfo from './(ui)/business-info/business-info';
import BusinessImage from './(ui)/business-image/business-image';
import * as BusinessContent from './(ui)/business-content/business-content';

export async function generateStaticParams() {
  const items = await directus.request(
    readItems('business', {
      fields: [
        'sluglify',
        {
          category: ['sluglify'],
        },
        {
          translations: ['languages_code'],
        },
      ],
      filter: {
        _or: [
          {
            type: {
              _eq: 'business',
            },
            finalization_date: {
              _gte: new Date().toISOString(),
            },
          },
          {
            type: {
              _eq: 'site',
            },
          },
        ],
      },
      limit: -1,
    }),
  );

  return items
    .map((item) =>
      item.translations?.map((translation) => ({
        lang: translation.languages_code as string,
        category: item.category.sluglify as string,
        business: item.sluglify as string,
      })),
    )
    .flat();
}

export async function generateMetadata({ params }: BusinessPageProps) {
  const lang = params.lang;
  const category = params.category;
  const business = params.business;

  if (!category) return;
  if (!lang) return;

  const data = await directus.request(
    readItems('business', {
      fields: [
        {
          image: ['id', 'width', 'height', 'title'],
        },
        {
          carousel: [
            {
              directus_files_id: ['id', 'width', 'height', 'title'],
            },
          ],
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
        category: {
          sluglify: {
            _eq: category,
          },
        },
        sluglify: {
          _eq: business,
        },
      },
      limit: 1,
      deep: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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

  const seo = data[0]?.seo as {
    nofollow: boolean;
    noindex: boolean;
    translations: {
      title: string;
      description: string;
    }[];
  } | null;

  if (!seo) return;

  return generateSeoMetadata(seo, {
    images: [data[0]?.image, ...(data[0]?.carousel as never)].filter(
      Boolean,
    ) as never,
  });
}

interface BusinessPageProps {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

const BusinessPage = async (props: BusinessPageProps) => {
  const { params: { lang, category, business: sluglify } = {}, searchParams } =
    props;

  if (!category || !lang || !sluglify) return notFound();

  const business = await directus.request(
    readItems('business', {
      fields: [
        '*',
        {
          translations: ['content'],
        },
        {
          image: ['id', 'title'],
        },
        {
          pdfs: [
            {
              directus_files_id: ['id', 'title'],
            },
          ],
        },
        {
          carousel: [
            {
              directus_files_id: ['id', 'title', 'width', 'height'],
            },
          ],
        },
      ],
      filter: {
        category: {
          sluglify: {
            _eq: category,
          },
        },
        sluglify: {
          _eq: sluglify,
        },
        _or: [
          {
            type: {
              _eq: 'business',
            },
            finalization_date: {
              _gte: new Date().toISOString(),
            },
          },
          {
            type: {
              _eq: 'site',
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
      limit: 1,
    }),
  );

  if (business.length === 0) return notFound();

  const item = business[0]!;

  const hasDisplayComponent = (
    component: 'image' | 'social_media' | 'content',
  ) => {
    return item.display_options.includes(component);
  };

  const hasOnlyOneComponent = item.display_options.length === 1;
  const activeTab = searchParams.tab || 'info';
  const hasGallery = item.carousel?.length && item.carousel.length > 0;

  return (
    <main className="mt-[4.60rem] py-10 bg-[rgb(105,98,109)]/[0.04]">
      <Grid.Root className="xl:px-40">
        <Grid.Item col={hasOnlyOneComponent ? '12' : '12|8'}>
          <BusinessContent.Root>
            <BusinessContent.Header>
              <BusinessContent.Title>{item.name}</BusinessContent.Title>
              {hasGallery ? (
                <BusinessContent.Links>
                  <BusinessContent.Link
                    active={activeTab === 'info'}
                    href="?tab=info"
                  >
                    Información
                  </BusinessContent.Link>
                  <BusinessContent.Link
                    active={activeTab === 'gallery'}
                    href="?tab=gallery"
                  >
                    Galería
                  </BusinessContent.Link>
                </BusinessContent.Links>
              ) : null}
            </BusinessContent.Header>
            {activeTab === 'info' && (
              <>
                <BusinessContent.Text>
                  {item.translations?.[0]?.content}
                </BusinessContent.Text>
                <BusinessContent.PDFs
                  pdfs={item.pdfs?.map((pdf) => pdf.directus_files_id)}
                />
                <BusinessContent.Image360
                  src={assetURL(item.image360, {
                    format: 'webp',
                    quality: 75,
                  })}
                />
              </>
            )}
            {activeTab === 'gallery' && (
              <BusinessContent.Gallery
                images={item.carousel?.map(
                  (image) => image.directus_files_id as DirectusFile,
                )}
              />
            )}
          </BusinessContent.Root>
        </Grid.Item>
        <Grid.Item col={hasOnlyOneComponent ? '12' : '12|4'}>
          {hasDisplayComponent('image') && <BusinessImage image={item.image} />}
          {hasDisplayComponent('social_media') && (
            <div className="mt-5">
              <BusinessInfo
                address={item.address.coordinates}
                display_options={item.display_options}
                email={item.email}
                facebook={item.facebook}
                image={item.image as string}
                instagram={item.instagram}
                name={item.name}
                phone={item.phone}
                tiktok={item.tiktok}
                tripadvisor={item.tripadvisor}
                twitter={item.twitter}
                web={item.web}
                whatsapp={item.whatsapp}
                youtube={item.youtube}
              />
            </div>
          )}
        </Grid.Item>
      </Grid.Root>
    </main>
  );
};

export default BusinessPage;
