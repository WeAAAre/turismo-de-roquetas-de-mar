import dynamic from 'next/dynamic';

const Image360 = dynamic(() => import('@/components/image360/image360'), {
  ssr: false,
});

interface BusinessContentImage360Props {
  src?: string | null;
}

const BusinessContentImage360 = (props: BusinessContentImage360Props) => {
  const { src } = props;

  if (!src) return null;

  return <Image360 autoLoad height="450px" image={src} width="100%" />;
};

export default BusinessContentImage360;
