import { RiInstagramFill as InstagramIcon } from '@react-icons/all-files/ri/RiInstagramFill';
import { FaWhatsapp as WhatsappIcon } from '@react-icons/all-files/fa/FaWhatsapp';
import { FaFacebookF as FacebookIcon } from '@react-icons/all-files/fa/FaFacebookF';
import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import * as Grid from '@/components/grid/grid';
import Fab from '@/components/fab/fab';
import BackgroundCarousel from '@/components/background-carousel/background-carousel';

import WeatherInfo from './weather-info/weather-info';
import SocialMediaLink from './social-media-link/social-media-link';

interface HeroSectionProps {
  lang: string;
}

const HeroSection = async (props: HeroSectionProps) => {
  const { lang } = props;

  const result = await directus.request(
    readItems('home_page', {
      fields: [
        'slide_time',
        'instagram',
        'facebook',
        'whatsapp',
        {
          translations: ['title', 'subtitle'],
        },
        {
          images: ['directus_files_id'],
        },
      ],
      deep: {
        translations: {
          _filter: {
            languages_id: {
              _eq: lang,
            },
          },
        },
      },
    }),
  );

  const data = result[0];
  const translations = data?.translations?.[0];

  if (!data || !translations) return null;

  const images = data.images?.map((image) => image.directus_files_id) || [];
  const { title, subtitle } = translations;
  const { facebook, instagram, whatsapp } = data;

  return (
    <div className="relative">
      <Grid.Root className="h-screen">
        <div>
          <BackgroundCarousel
            images={images}
            quality={75}
            slideTime={data.slide_time || 5000}
          />
        </div>
        <div
          aria-hidden
          className="absolute left-0 top-0 bg-black/70 h-full w-full"
        />
        <Fab
          className="bg-[#25D366]"
          href={`https://wa.me/${whatsapp}`}
          position="bottom-right"
        >
          <WhatsappIcon aria-hidden className="text-white w-10 h-10" />
        </Fab>
        <Grid.Item className="text-white uppercase" col="12">
          <h1 className="text-center flex flex-col">
            <span className="text-6xl font-bold leading-[68px] lg:text-9xl text-transparent typo-stroke-white">
              {title?.split(' ')[0]}
            </span>
            <span className="text-3xl lg:text-5xl">
              {title?.split(' ').slice(1).join(' ')}
            </span>
          </h1>
          <p className="text-center text-lg mt-2">{subtitle}</p>
          <div className="flex justify-center gap-2 mt-2">
            {facebook ? (
              <SocialMediaLink
                href={facebook}
                icon={<FacebookIcon aria-hidden className="w-6 h-6" />}
              />
            ) : null}
            {instagram ? (
              <SocialMediaLink
                href={instagram}
                icon={<InstagramIcon aria-hidden className="w-6 h-6" />}
              />
            ) : null}
          </div>
          <div className="mt-6 flex justify-center">
            <WeatherInfo />
          </div>
        </Grid.Item>
      </Grid.Root>
    </div>
  );
};

export default HeroSection;
