import { notFound } from 'next/navigation';
import Link from 'next/link';
import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import type { DirectusFile } from '@/lib/directus/schema';
import * as Grid from '@/components/grid/grid';
import DirectusImage, {
  assetURL,
} from '@/components/directus-image/directus-image';

import CategoriesTags from './(ui)/categories-tags/categories-tags';

import type { Metadata } from 'next';

export async function generateMetadata() {
  const data = await directus.request(
    readItems('blog_post', {
      fields: ['image'],
      filter: {
        status: {
          _eq: 'published',
        },
      },
      limit: 1,
    }),
  );

  const image = data[0]?.image as string;

  return {
    title: 'Blog - Turismo Roquetas de Mar',
    description:
      'Explora Roquetas de Mar con nuestro blog de turismo. Descubre playas doradas, paisajes encantadores y experiencias únicas. Encuentra consejos de viaje y recomendaciones locales para planificar tu escapada perfecta. ¡Bienvenido a la magia de Roquetas de Mar!',
    openGraph: {
      type: 'website',
      title: 'Blog - Turismo Roquetas de Mar',
      description:
        'Explora Roquetas de Mar con nuestro blog de turismo. Descubre playas doradas, paisajes encantadores y experiencias únicas. Encuentra consejos de viaje y recomendaciones locales para planificar tu escapada perfecta. ¡Bienvenido a la magia de Roquetas de Mar!',
      url: 'https://turismoroquetasdemar.com/es-ES/blog',
      siteName: 'Turismo Roquetas de Mar',
      images: image ? assetURL(image) : undefined,
    },
  } satisfies Metadata;
}

const getPostLink = (item: { sluglify: string }) =>
  `/es-ES/blog/${item.sluglify}`;

const BlogPage = async () => {
  const data = await directus.request(
    readItems('blog_post', {
      fields: [
        'id',
        'title',
        'sluglify',
        'categories',
        {
          image: ['id', 'title'],
        },
      ],
      filter: {
        status: {
          _eq: 'published',
        },
      },
      limit: -1,
    }),
  );

  if (data.length === 0) return notFound();

  const mainPost = data[0]!;
  const posts = data.slice(1);

  return (
    <main className="border-b pt-24 pb-10 ">
      <Grid.Root>
        <Grid.Item className="md:mx-40 text-center" col="12">
          <h1 className="text-4xl font-semibold text-balance">Blog</h1>
          <p className="mt-4 text-balance">
            ¡Bienvenido a nuestro blog! Aquí encontrarás todo lo relacionado con
            los mejores planes, actividades, eventos y mucho más en Roquetas de
            Mar.
          </p>
        </Grid.Item>
        <Grid.Item className="md:mx-20 mt-6 md:mt-12" col="12">
          <article className="relative h-72 md:h-[450px] rounded-lg overflow-hidden">
            <Link href={getPostLink(mainPost)}>
              <DirectusImage
                alt={mainPost.title}
                className="absolute top-0 left-0 rounded-lg w-full h-full object-cover"
                fill
                item={mainPost.image as DirectusFile}
                sizes="100vw"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 z-0" />
              <div className="h-full flex flex-col gap-2 justify-end transform px-5 py-5 md:py-10 md:max-w-[80%]">
                <CategoriesTags categories={mainPost.categories} />
                <h2 className="text-xl md:text-4xl text-white font-semibold text-balance">
                  {mainPost.title}
                </h2>
              </div>
            </Link>
          </article>
        </Grid.Item>
        <Grid.Item className="mt-6 md:mt-12 md:mx-20" col="12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Link
                className="relative p-2.5 border rounded-lg"
                href={getPostLink(post)}
                key={post.id}
              >
                <div className="relative h-48">
                  <DirectusImage
                    alt={post.title}
                    className="rounded w-full object-cover"
                    fill
                    item={post.image as DirectusFile}
                  />
                </div>
                <div className="p-1 mt-3">
                  <CategoriesTags
                    categories={post.categories}
                    variant="secondary"
                  />
                  <h3 className="text-lg font-medium mt-2 leading-6 line-clamp-3">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </Grid.Item>
      </Grid.Root>
    </main>
  );
};

export default BlogPage;
