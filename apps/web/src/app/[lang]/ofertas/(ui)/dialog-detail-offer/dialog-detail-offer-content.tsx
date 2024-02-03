'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import RichText from '@/components/rich-text/rich-text';
import DirectusImage from '@/components/directus-image/directus-image';
import * as Dialog from '@/components/dialog/dialog';
import BusinessInfo from '@/app/[lang]/[category]/[business]/(ui)/business-info/business-info';

interface DialogDetailOfferContentProps {
  id: string;
  image: string;
  title: string;
  business: {
    address?: { coordinates: [number, number] };
    name: string;
    streetAddress?: string;
    image?: string;
    email?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    phone?: string | null;
    tiktok?: string | null;
    tripadvisor?: string | null;
    twitter?: string | null;
    web?: string | null;
    whatsapp?: string | null;
    youtube?: string | null;
    display_options?: string[];
  } | null;
  description: string;
}

const DialogDetailOfferContent = (props: DialogDetailOfferContentProps) => {
  const { id, image, title, business, description } = props;
  const searchParams = useSearchParams();
  const patname = usePathname();
  const router = useRouter();

  return (
    <Dialog.Root
      defaultOpen
      key={id}
      onOpenChange={(open) => {
        if (open) return;
        const params = new URLSearchParams(searchParams);
        params.delete('p');
        router.push(`${patname}?${params.toString()}`);
      }}
    >
      <Dialog.Content className="max-w-4xl">
        <Dialog.Title>{title}</Dialog.Title>
        <div className="grid md:grid-cols-2 gap-4 py-5">
          <div>
            <div className="flex justify-center">
              <DirectusImage
                alt={title}
                className="border rounded-lg"
                height={300}
                item={image}
                width={300}
              />
            </div>
            <div className="mt-4">
              <RichText className="prose-sm">{description}</RichText>
            </div>
          </div>
          <div className="h-max">
            {business ? (
              <BusinessInfo
                address={business.address?.coordinates}
                display_options={business.display_options}
                email={business.email}
                facebook={business.facebook}
                image={business.image}
                instagram={business.instagram}
                name={business.name}
                phone={business.phone}
                streetAddress={business.streetAddress}
                tiktok={business.tiktok}
                tripadvisor={business.tripadvisor}
                twitter={business.twitter}
                web={business.web}
                whatsapp={business.whatsapp}
                youtube={business.youtube}
              />
            ) : null}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogDetailOfferContent;
