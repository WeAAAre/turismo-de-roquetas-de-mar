import Image from 'next/image';

import type { DirectusFile } from '@/lib/directus/schema';

type DirectusImageProps = Omit<React.ComponentProps<typeof Image>, 'src'> & {
  item: DirectusFile | string | null;
};

export interface AssetURLOptions {
  quality?: number;
  width?: number;
  next?: boolean;
  format?: 'auto' | 'jpg' | 'png' | 'webp' | 'tiff';
}

const assetURL = (
  item?: DirectusFile | string | null,
  options?: AssetURLOptions,
) => {
  const { quality, format, width } = options || {};

  if (!item) return '';

  const params = {
    ...(quality && { quality: quality.toString() }),
    ...(format && { format }),
    ...(width && { width: width.toString() }),
  };
  const searchParams = new URLSearchParams(params).toString();

  const id = typeof item === 'string' ? item : item.id;

  if (searchParams) {
    return `https://console.turismoderoquetasdemar.es/assets/${id}?${searchParams}`;
  }

  return `https://console.turismoderoquetasdemar.es/assets/${id}`;
};

const getBlurDataURL = () => {
  const base64str =
    'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAA1BMVEXw7/B25VM1AAAACXBIWXMAABYlAAAWJQFJUiTwAAAADklEQVR4nGNgGAUMSAAAARAAAVrp4sUAAAAASUVORK5CYII=';
  const blurSvg = `
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'>
      <filter id='b' color-interpolation-filters='sRGB'>
        <feGaussianBlur stdDeviation='1' />
      </filter>

      <image preserveAspectRatio='none' filter='url(#b)' x='0' y='0' height='100%' width='100%' 
      href='data:image/avif;base64,${base64str}' />
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(blurSvg).toString('base64')}`;
};

const blurDataURL = getBlurDataURL();

const DirectusImage = (props: DirectusImageProps) => {
  const { item, alt, ...restProps } = props;

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
      src={assetURL(item)}
    />
  );
};

export { assetURL };
export default DirectusImage;
