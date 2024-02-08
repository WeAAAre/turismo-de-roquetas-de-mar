'use client';
import React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { DirectusFile } from '@/lib/directus/schema';

import { assetURL } from './asset-url';

type DirectusImageProps = Omit<React.ComponentProps<typeof Image>, 'src'> & {
  item: DirectusFile | string | null;
};

export interface AssetURLOptions {
  quality?: number;
  width?: number;
  next?: boolean;
  format?: 'auto' | 'jpg' | 'png' | 'webp' | 'tiff';
}

const blurDataURL = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8ePX2fwAIggOCR8M6ygAAAABJRU5ErkJggg==`;

const DirectusImage = (props: DirectusImageProps) => {
  const { item, alt, className, ...restProps } = props;
  const [isReady, setIsReady] = React.useState(false);

  return (
    <Image
      blurDataURL={blurDataURL}
      placeholder="blur"
      {...restProps}
      alt={
        item && typeof item === 'object' && 'title' in item
          ? item.title || alt
          : alt
      }
      className={cn(
        'transition-all blur-none duration-500',
        {
          'blur-lg': !isReady,
        },
        className,
      )}
      onLoad={() => setIsReady(true)}
      src={assetURL(item)}
    />
  );
};

export { assetURL };
export default DirectusImage;
