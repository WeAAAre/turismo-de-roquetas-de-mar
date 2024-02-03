import { readItem } from '@directus/sdk';

import { directus } from '@/lib/directus/server';

import DialogMapContent from './dialog-content';

interface DialogMapProps {
  itemId: string;
}

const DialogMap = async (props: DialogMapProps) => {
  const { itemId } = props;

  const data = await directus.request(
    readItem('business', itemId, {
      fields: ['address', 'image', 'name', 'streetAddress'],
    }),
  );

  return (
    <DialogMapContent
      address={data.address}
      image={data.image as string}
      name={data.name}
      streetAddress={data.streetAddress!}
    />
  );
};

export default DialogMap;
