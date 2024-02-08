import type { DirectusFile } from '@/lib/directus/schema';

import type { AssetURLOptions } from './directus-image';

export const assetURL = (
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
