import { AiOutlineArrowRight as ArrowRightIcon } from '@react-icons/all-files/ai/AiOutlineArrowRight';
import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import * as Grid from '@/components/grid/grid';

import SectionTitle from '../section-title/section-title';
import OffersList from './offers-list';
import * as OfferCard from './offer-card';

interface OffersSectionProps {
  lang: string;
}

const OffersSection = async (props: OffersSectionProps) => {
  const { lang } = props;

  const offers = await directus.request(
    readItems('ideas_offers', {
      fields: [
        'id',
        'end_date',
        {
          image: ['title', 'id'],
        },
        {
          translations: ['title'],
        },
      ],
      sort: ['end_date'],
      limit: 7,
      filter: {
        end_date: {
          _gte: new Date().toISOString(),
        },
      },
      deep: {
        translations: {
          _filter: {
            languages_code: lang,
          },
        },
      },
    }),
  );

  const getOfferLink = (offer: { id: number }) =>
    `/${lang}/ofertas?p=${offer.id}`;

  return (
    <Grid.Root className="px-0">
      <Grid.Item className="px-5 md:px-0" col="12">
        <SectionTitle title="Ofertas e ideas para disfutar" />
      </Grid.Item>
      <Grid.Item className="mt-5 lg:mt-10" col="12">
        <OffersList>
          {offers.map((offer) => (
            <OfferCard.Root
              className="first-of-type:ml-5 md:first-of-type:ml-0"
              href={getOfferLink(offer)}
              key={offer.id}
            >
              <OfferCard.Image
                image={offer.image}
                title={offer.translations?.[0]?.title || ''}
              />
              <OfferCard.Content>
                <OfferCard.Title>
                  {offer.translations?.[0]?.title || ''}
                </OfferCard.Title>
                <OfferCard.RemainTime endDate={offer.end_date!} lang={lang} />
              </OfferCard.Content>
            </OfferCard.Root>
          ))}
          <OfferCard.Root href={`/${lang}/ofertas`}>
            <OfferCard.Content>
              <h3 className="flex h-full items-center font-medium text-lg first-letter:uppercase">
                Ver todas las ofertas
              </h3>
              <div className="flex justify-end">
                <ArrowRightIcon aria-hidden className="w-5 min-h-5" />
              </div>
            </OfferCard.Content>
          </OfferCard.Root>
          <li className="pr-1" />
        </OffersList>
      </Grid.Item>
    </Grid.Root>
  );
};

export default OffersSection;
