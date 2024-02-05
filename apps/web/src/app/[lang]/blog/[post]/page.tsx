import { notFound } from 'next/navigation';
import Link from 'next/link';
import edjsHTML from 'editorjs-html';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import type { DirectusFile } from '@/lib/directus/schema';
import { env } from '@/env/server.mjs';
import RichText from '@/components/rich-text/rich-text';
import DirectusImage, {
  assetURL,
} from '@/components/directus-image/directus-image';

import CategoriesTags from '../(ui)/categories-tags/categories-tags';

import type { Metadata } from 'next';

interface BlogPostPageProps {
  params: Record<string, string>;
}

const parserToHTML = edjsHTML();

export async function generateStaticParams() {
  const posts = await directus.request(
    readItems('blog_post', {
      fields: ['sluglify'],
      filter: {
        status: {
          _eq: 'published',
        },
      },
      limit: -1,
    }),
  );

  return posts.map((post) => ({
    lang: 'es-Es',
    post: post.sluglify,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { post } = params;

  const data = await directus.request(
    readItems('blog_post', {
      fields: ['title', 'content', 'categories', 'image', 'description'],
      filter: {
        status: {
          _eq: 'published',
        },
        sluglify: {
          _eq: post,
        },
      },
    }),
  );

  const postItem = data[0]!;
  if (!postItem) return;

  return {
    title: postItem.title,
    description: postItem.description,
    metadataBase: new URL(env.DIRECTUS_API_URL),
    openGraph: {
      type: 'article',
      title: postItem.title,
      description: postItem.description,
      url: `https://turismoroquetasdemar.com/blog/${post}`,
      siteName: 'Turismo Roquetas de Mar',
      images: postItem.image ? [assetURL(postItem.image as string)] : undefined,
    },
  } satisfies Metadata;
}

const BlogPostPage = async (props: BlogPostPageProps) => {
  const {
    params: { post: sluglify },
  } = props;

  const data = await directus.request(
    readItems('blog_post', {
      fields: [
        'title',
        'content',
        'categories',
        {
          image: ['id', 'title'],
        },
      ],
      filter: {
        status: {
          _eq: 'published',
        },
        sluglify: {
          _eq: sluglify,
        },
      },
    }),
  );

  if (data.length === 0) return notFound();

  const post = data[0]!;
  const contentHTML = parserToHTML.parse(post.content as object).join('');

  return (
    <div className="border-b">
      <main className="max-w-[70ch] mx-auto pt-28 pb-10 px-5">
        <CategoriesTags categories={post.categories} />
        <h1 className="text-4xl font-semibold mt-3">{post.title}</h1>
        <div className="relative h-72 md:h-[470px] my-8">
          <DirectusImage
            alt={post.title}
            className="rounded-lg"
            fill
            item={post.image as DirectusFile}
            sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw"
          />
        </div>
        <RichText className="max-w-none prose-blue">{contentHTML}</RichText>
        <Link
          className="text-balance flex gap-2 items-center mt-6 text-lg font-medium"
          href="/blog"
        >
          <ArrowLeftIcon aria-hidden className="size-4" />
          Volver al blog
        </Link>
      </main>
    </div>
  );
};

export default BlogPostPage;
