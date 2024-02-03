import BusinessContentTitle from './business-content-title';
import BusinessContentText from './business-content-text';
import BusinessContentPdfs from './business-content-pdfs';
import BusinessContentLinks from './business-content-links';
import BusinessContentLink from './business-content-link';
import BusinessContentImage360 from './business-content-image360';
import BusinessContentHeader from './business-content-header';
import BusinessContentGallery from './business-content-gallery';

interface BusinessContentProps {
  children: React.ReactNode;
}

const BusinessContent = (props: BusinessContentProps) => {
  const { children } = props;

  return (
    <div className="bg-white px-4 pb-4 rounded-lg border flex flex-col gap-4">
      {children}
    </div>
  );
};

const Root = BusinessContent;
const Text = BusinessContentText;
const PDFs = BusinessContentPdfs;
const Image360 = BusinessContentImage360;
const Header = BusinessContentHeader;
const Title = BusinessContentTitle;
const Links = BusinessContentLinks;
const Link = BusinessContentLink;
const Gallery = BusinessContentGallery;

export { Image360, Root, Text, PDFs, Header, Title, Links, Link, Gallery };
