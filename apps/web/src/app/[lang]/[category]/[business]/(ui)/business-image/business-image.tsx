import React from 'react';

import DirectusImage from '@/components/directus-image/directus-image';

interface BusinessImageProps {
  image: React.ComponentProps<typeof DirectusImage>['item'];
}

const BusinessImage = (props: BusinessImageProps) => {
  const { image } = props;
  return (
    <div className="hidden md:block">
      <DirectusImage
        alt=""
        className="rounded-lg border w-full h-full"
        height={1000}
        item={image}
        priority
        width={1000}
      />
    </div>
  );
};

export default BusinessImage;
