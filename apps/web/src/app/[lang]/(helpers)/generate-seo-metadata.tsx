import { i18n } from '@/lib/i18/config';
import type { DirectusFile } from '@/lib/directus/schema';
import { env } from '@/env/server.mjs';

import type { Metadata } from 'next';

interface GenerateSeoMetadataOptions {
  images?:
    | {
        directus_files_id?: DirectusFile | DirectusFile['id'] | null;
      }[]
    | string[]
    | string
    | null
    | DirectusFile;
  url: string;
  lang?: string;
}

type OGImageDescriptor = {
  url: string | URL;
  secureUrl?: string | URL;
  alt?: string;
  type?: string;
  width?: string | number;
  height?: string | number;
};

export interface Seo {
  nofollow?: boolean;
  noindex?: boolean;
  translations?: {
    title?: string;
    description?: string;
    languages_code: string;
  }[];
}

const computeDirectusFile = (file: DirectusFile): OGImageDescriptor => {
  return {
    url: `${env.DIRECTUS_API_URL}assets/${file.id}`,
    secureUrl: `${env.DIRECTUS_API_URL}assets/${file.id}`,
    alt: file.title || undefined,
    width: file.width || undefined,
    height: file.height || undefined,
  };
};

const isNotNull = <T,>(e: T): e is NonNullable<T> =>
  e !== null && e !== undefined;

const computeImages = (images: GenerateSeoMetadataOptions['images']) => {
  if (!images) return;

  if (typeof images === 'string') {
    return images;
  }
  if (typeof images === 'object' && !Array.isArray(images)) {
    return computeDirectusFile(images);
  }

  return images
    .map((image) => {
      if (typeof image === 'string') {
        return image;
      }
      if (typeof image === 'object' && !Array.isArray(image)) {
        const file = image.directus_files_id;
        if (typeof file === 'string') {
          return file;
        }
        if (file && typeof file === 'object') {
          return computeDirectusFile(file);
        }
      }
      return null;
    })
    .filter(isNotNull);
};

const generateSeoMetadata = (
  seo: Seo | null,
  options: GenerateSeoMetadataOptions,
) => {
  if (!seo) return { title: '' };
  const { images: rawImages, lang = '' } = options;

  const title = seo?.translations?.[0]?.title;
  const description = seo?.translations?.[0]?.description;
  const images = computeImages(rawImages);

  const languages = i18n.locales.reduce(
    (acc, cLang) => {
      if (cLang === options.lang) return acc;
      return {
        ...acc,
        [cLang.toLowerCase()]: `${env.URL}/${cLang}${options.url}`,
      };
    },
    {} as Record<string, string>,
  );

  return {
    title,
    description,
    robots: {
      follow: !seo?.nofollow,
      index: !seo?.noindex,
    },
    alternates: {
      canonical: `${env.URL}/${lang}${options.url}`,
      languages,
    },
    openGraph: {
      images,
    },
  } satisfies Metadata;
};

export default generateSeoMetadata;
