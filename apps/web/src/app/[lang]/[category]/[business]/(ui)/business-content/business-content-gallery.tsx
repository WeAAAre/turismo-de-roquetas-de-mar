'use client';
import PhotoAlbum from 'react-photo-album';
import React from 'react';

import type { DirectusFile } from '@/lib/directus/schema';
import DirectusImage from '@/components/directus-image/directus-image';
import * as Dialog from '@/components/dialog/dialog';

interface BusinessContentGalleryProps {
  images?: DirectusFile[] | null;
}
const BusinessContentGallery = (props: BusinessContentGalleryProps) => {
  const { images } = props;
  const [dialogState, setDialogState] = React.useState<{
    open: boolean;
    image: {
      src: string;
      alt: string;
      width: number;
      height: number;
      id: string;
    } | null;
  }>({
    open: false,
    image: null,
  });

  if (!images) return null;

  return (
    <>
      <PhotoAlbum
        defaultContainerWidth={600}
        layout="masonry"
        photos={images.map((img) => ({
          key: img.id,
          height: img.height,
          width: img.width,
          src: img.id,
          alt: img.title || '',
          id: img.id,
        }))}
        renderPhoto={({ photo }) => (
          <button
            className="mt-2"
            onClick={() => setDialogState({ open: true, image: photo })}
            type="button"
          >
            <DirectusImage
              alt={photo.alt}
              className="rounded-lg"
              height={300}
              item={photo.src}
              width={300}
            />
          </button>
        )}
        spacing={8}
        targetRowHeight={600}
      />
      <Dialog.Root
        onOpenChange={() =>
          setDialogState((prev) => ({ ...prev, open: false }))
        }
        open={dialogState.open}
      >
        <Dialog.Content aria-label={dialogState.image?.alt || ''}>
          <DirectusImage
            alt={dialogState.image?.alt || ''}
            className="w-full h-full"
            height={(dialogState.image?.height || 500) * 2}
            item={dialogState.image?.src || ''}
            width={(dialogState.image?.width || 500) * 2}
          />
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};

export default BusinessContentGallery;
