import { readItem } from '@directus/sdk';

import { directus } from '@/lib/directus/server';

import DialogDetailOfferContent from './dialog-detail-offer-content';

interface DialogDetailOfferProps {
  offerId: string;
  lang: string;
}

const DialogDetailOffer = async (props: DialogDetailOfferProps) => {
  const { lang, offerId } = props;

  const data = await directus.request(
    readItem('ideas_offers', offerId, {
      fields: [
        {
          translations: ['title', 'description'],
        },
        'image',
        {
          business: [
            'address',
            'name',
            'streetAddress',
            'image',
            'email',
            'facebook',
            'instagram',
            'phone',
            'tiktok',
            'tripadvisor',
            'twitter',
            'web',
            'whatsapp',
            'youtube',
            'display_options',
          ],
        },
      ],
      deep: {
        translations: {
          _filter: {
            languages_code: lang,
          },
        },
      },
    }),
  );

  if (directus.responseHasAnyError(data)) return null;

  return (
    <DialogDetailOfferContent
      business={data.business as never}
      description={data.translations?.[0]?.description || ''}
      id={offerId}
      image={data.image as string}
      title={data.translations?.[0]?.title || ''}
    />
  );
};

export default DialogDetailOffer;
