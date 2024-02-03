'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import * as Dialog from '@/components/dialog/dialog';

import Map from '../../map/map';

interface DialogMapContentProps {
  name: string;
  address: { coordinates: [number, number] };
  image: string;
  streetAddress: string;
}

const DialogMapContent = (props: DialogMapContentProps) => {
  const { name, address, image, streetAddress } = props;
  const router = useRouter();
  const searchParams = useSearchParams();
  const patname = usePathname();

  return (
    <Dialog.Root
      defaultOpen
      key={name}
      onOpenChange={(open) => {
        if (open) return;
        const params = new URLSearchParams(searchParams);
        params.delete('qmap');
        router.push(`${patname}?${params.toString()}`);
      }}
    >
      <Dialog.Content>
        <Dialog.Title>{name}</Dialog.Title>
        <div>
          <Map
            defaultCenter={[36.76419, -2.61475]}
            height={400}
            items={[
              {
                name,
                coordinates: address.coordinates,
                image,
                address: streetAddress,
              },
            ]}
            zoom={16}
          />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DialogMapContent;
