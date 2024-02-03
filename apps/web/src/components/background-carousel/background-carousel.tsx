'use client';
import React from 'react';

import { cn } from '@/lib/utils';
import useInterval from '@/hooks/use-interval';

import DirectusImage from '../directus-image/directus-image';

interface BackgroundCarouselProps {
  images: React.ComponentProps<typeof DirectusImage>['item'][];
  slideTime: number;
  quality: number;
}

const BackgroundCarousel = (props: BackgroundCarouselProps) => {
  const { images, slideTime, quality } = props;
  const [currentImage, setCurrentImage] = React.useState(0);

  useInterval(() => {
    setCurrentImage((currentImage + 1) % images.length);
  }, slideTime * 1000);

  return (
    <div className="absolute inset-0">
      {images.map((image, idx) => (
        <DirectusImage
          alt=""
          className={cn(
            'object-cover transition-opacity duration-1000 ease-in-out',
            {
              'opacity-0': idx !== currentImage,
              'opacity-100': idx === currentImage,
            },
          )}
          fill
          item={image}
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          priority={idx === 0}
          quality={quality}
          sizes="100vw"
        />
      ))}
    </div>
  );
};

export default BackgroundCarousel;
