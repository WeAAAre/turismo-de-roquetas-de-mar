import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import * as Grid from '@/components/grid/grid';

import generateSeoMetadata from '../(helpers)/generate-seo-metadata';
import SearchBar from './(ui)/search-bar/search-bar';
import DialogMap from './(ui)/category-list/dialog-map/dialog-map';
import CategoryList from './(ui)/category-list/category-list';

import type { Seo } from '../(helpers)/generate-seo-metadata';

export async function generateStaticParams() {
  const categories = await directus.request(
    readItems('category', {
      fields: [
        'sluglify',
        {
          translations: ['languages_code'],
        },
      ],
      filter: {
        redirect_to: {
          _null: true,
        },
      },
      limit: -1,
    }),
  );

  return categories
    .map((category) =>
      category.translations?.map((translation) => ({
        lang: translation.languages_code as string,
        category: category.sluglify as string,
      })),
    )
    .flat();
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const lang = params.lang;
  const category = params.category;

  if (!category) return;
  if (!lang) return;

  const data = await directus.request(
    readItems('category', {
      fields: [
        {
          image: ['id', 'width', 'height', 'title'],
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
        sluglify: {
          _eq: category,
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

  const seo = data[0]?.seo as Seo;

  return generateSeoMetadata(seo, {
    images: data[0]?.image,
    url: `/${lang}/${category}`,
  });
}

interface CategoryPageProps {
  params: Record<string, string>;
  searchParams: Record<string, string>;
}

const CategoryPage = async (props: CategoryPageProps) => {
  const { params: { lang, category: sluglify } = {}, searchParams } = props;

  if (!lang || !sluglify) return notFound();

  const category = await directus.request(
    readItems('category', {
      fields: [
        'sort_by',
        'mode',
        'type',
        {
          translations: ['name'],
        },
      ],
      filter: {
        sluglify: {
          _eq: sluglify,
        },
        redirect_to: {
          _null: true,
        },
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

  if (category.length === 0) return notFound();

  const name = category?.[0]?.translations?.[0]?.name;
  const query = searchParams.q;
  const itemIdToOpenInMap = searchParams.qmap;

  return (
    <main className="bg-[#69626D]  bg-opacity-10 ">
      <Grid.Root className="mt-[4.60rem] pt-4 pb-8">
        <Grid.Item col="12">
          <h1 className="text-[#303030] text-4xl font-bold">{name}</h1>
        </Grid.Item>
        <Grid.Item className="mt-4" col="12">
          <Suspense>
            <SearchBar defaultQuery={query} />
          </Suspense>
        </Grid.Item>
        <Grid.Item className="mt-6" col="12">
          <CategoryList
            categoryType={category?.[0]?.type}
            lang={lang}
            query={query}
            sluglify={sluglify}
            sortBy={category?.[0]?.sort_by || 'name'}
            sortMode={category?.[0]?.mode || 'asc'}
          />
        </Grid.Item>
      </Grid.Root>
      {itemIdToOpenInMap ? <DialogMap itemId={itemIdToOpenInMap} /> : null}
    </main>
  );
};

export default CategoryPage;
