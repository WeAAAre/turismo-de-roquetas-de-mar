import type DirectusImage from '@/components/directus-image/directus-image';
import type { AssetURLOptions } from '@/components/directus-image/directus-image';
import { assetURL } from '@/components/directus-image/asset-url';

interface BusinessContentPdfsProps {
  pdfs?: React.ComponentProps<typeof DirectusImage>['item'][] | null;
  options?: AssetURLOptions;
}

const BusinessContentPdfs = (props: BusinessContentPdfsProps) => {
  const { pdfs, options } = props;

  if (!pdfs) return null;

  const getTitle = (
    pdf: React.ComponentProps<typeof DirectusImage>['item'],
  ) => {
    return pdf && typeof pdf === 'object' ? pdf.title : '';
  };

  return (
    <div>
      {pdfs.map((pdf, idx) => (
        <object
          aria-label={`PDF ${getTitle(pdf)}`}
          className="w-full min-h-32 h-[30rem]"
          data={`${assetURL(pdf, options)}#toolbar=0&navpanes=0&scrollbar=0`}
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          type="application/pdf"
        >
          <a className="text-[rgba(96,165,250)]" href={assetURL(pdf)}>
            Descargar {getTitle(pdf)}
          </a>
        </object>
      ))}
    </div>
  );
};

export default BusinessContentPdfs;
