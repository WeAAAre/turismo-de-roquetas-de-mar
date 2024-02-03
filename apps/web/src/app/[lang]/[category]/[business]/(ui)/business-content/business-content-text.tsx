import RichText from '@/components/rich-text/rich-text';

interface BusinessContentTextProps {
  children?: string | null;
}

const BusinessContentText = (props: BusinessContentTextProps) => {
  const { children } = props;

  if (!children) return null;

  return <RichText className="prose-sm max-w-none">{children}</RichText>;
};

export default BusinessContentText;
