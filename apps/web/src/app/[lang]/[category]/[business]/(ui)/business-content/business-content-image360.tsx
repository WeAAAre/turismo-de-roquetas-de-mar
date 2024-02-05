import dynamic from 'next/dynamic';

import { assetURL } from '@/components/directus-image/directus-image';

const Image360 = dynamic(() => import('@/components/image360/image360'), {
  ssr: false,
});

interface BusinessContentImage360Props {
  src?: string | null;
}

const BusinessContentImage360 = (props: BusinessContentImage360Props) => {
  const { src: rawSrc } = props;

  if (!rawSrc) return null;

  const src = `/_next/image?url=${encodeURIComponent(assetURL(rawSrc))}&w=2700&q=75`;

  return <Image360 autoLoad height="450px" image={src} width="100%" />;
};

export default BusinessContentImage360;
