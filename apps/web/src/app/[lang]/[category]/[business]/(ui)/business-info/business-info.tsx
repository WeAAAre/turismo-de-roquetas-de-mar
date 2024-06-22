// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import dynamic from 'next/dynamic';
import { SiTiktok as TiktokIcon } from '@react-icons/all-files/si/SiTiktok';
import { FaYoutube as YoutubeIcon } from '@react-icons/all-files/fa/FaYoutube';
import { FaWhatsapp as WhatsappIcon } from '@react-icons/all-files/fa/FaWhatsapp';
import { FaTwitter as TwitterIcon } from '@react-icons/all-files/fa/FaTwitter';
import { FaTripadvisor as TripadvisorIcon } from '@react-icons/all-files/fa/FaTripadvisor';
import { FaPhoneAlt as PhoneIcon } from '@react-icons/all-files/fa/FaPhoneAlt';
import { FaMapMarkerAlt as MapIcon } from '@react-icons/all-files/fa/FaMapMarkerAlt';
import { FaInstagram as InstagramIcon } from '@react-icons/all-files/fa/FaInstagram';
import { FaGlobe as WebIcon } from '@react-icons/all-files/fa/FaGlobe';
import { FaFacebookF as FacebookIcon } from '@react-icons/all-files/fa/FaFacebookF';
import { FaEnvelope as EmailIcon } from '@react-icons/all-files/fa/FaEnvelope';

import { cn } from '@/lib/utils';

const Map = dynamic(() => import('@/app/[lang]/[category]/(ui)/map/map'), {
  loading: () => <div className="h-[300px] w-full bg-gray-300 animate-pulse" />,
  ssr: false,
});

interface BusinessInfoProps {
  address?: [number, number];
  name: string;
  streetAddress?: string | null;
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
  withShadow?: boolean;
}

const BusinessInfo = (props: BusinessInfoProps) => {
  const {
    address: [lat, lon] = [0, 0] as const,
    name,
    streetAddress,
    image,
    email,
    facebook,
    instagram,
    phone,
    tiktok,
    tripadvisor,
    twitter,
    web,
    whatsapp,
    youtube,
    withShadow,
  } = props;

  const mapItem = {
    address: streetAddress || '',
    coordinates: [lat, lon] as const,
    image: image ? image : undefined,
    name,
  };

  const infoItems = [
    {
      href: `https://maps.google.com/maps?q=${lon}+${lat}`,
      Icon: MapIcon,
      content: streetAddress,
    },
    {
      href: `mailto:${email}`,
      Icon: EmailIcon,
      content: email,
    },
    {
      href: web,
      Icon: WebIcon,
      content: name,
    },
    {
      href: `tel:${phone}`,
      Icon: PhoneIcon,
      content: phone,
    },
  ];

  const socialMedias = [
    {
      url: facebook,
      Icon: FacebookIcon,
      className: 'hover:bg-[#1877f2]',
      'aria-label': `${name}`,
    },
    {
      url: twitter,
      Icon: TwitterIcon,
      className: 'hover:bg-[#1da1f2]',
      'aria-label': `${name}`,
    },
    {
      url: instagram,
      Icon: InstagramIcon,
      className: 'hover:bg-[#e1306c]',
      'aria-label': `${name}`,
    },
    {
      url: tiktok,
      Icon: TiktokIcon,
      className: 'hover:bg-[#010101]',
      'aria-label': `${name}`,
    },
    {
      url: youtube,
      Icon: YoutubeIcon,
      className: 'hover:bg-[#ff0000]',
      'aria-label': `${name}`,
    },
    {
      url: whatsapp ? `https://wa.me/${whatsapp}` : undefined,
      Icon: WhatsappIcon,
      className: 'hover:bg-[#25d366]',
      'aria-label': `${name}`,
    },
    {
      url: tripadvisor,
      Icon: TripadvisorIcon,
      className: 'hover:bg-[#00af87]',
      'aria-label': `${name}`,
    },
  ];

  return (
    <div
      className={cn('bg-white rounded-lg border sticky top-[30%] p-4', {
        'shadow-md': withShadow,
      })}
    >
      <Map
        defaultCenter={[36.7642, -2.614]}
        disableStartOpen
        height={300}
        items={[mapItem]}
        zoom={15}
      />
      <div className="mt-5">
        {infoItems
          .filter((it) => it.content && it.href)
          .map((item, idx) => (
            <a
              className="flex items-center text-sm text-[#202124] mb-2"
              href={item.href!}
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
            >
              <item.Icon
                aria-hidden
                className="min-w-4 h-3 mr-2 text-black/30"
              />
              <span className="hover:text-[rgb(96,165,250)]">
                {item.content}
              </span>
            </a>
          ))}
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {socialMedias
          .filter((it) => it.url)
          .map((it, idx) => (
            <a
              aria-label={it['aria-label']}
              className={cn(
                'flex items-center justify-center rounded-full w-10 h-10 bg-black/30 transition-colors cursor-pointer',
                it.className,
              )}
              href={it.url!}
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
            >
              <it.Icon aria-hidden className="text-white size-6" />
            </a>
          ))}
      </div>
    </div>
  );
};

export default BusinessInfo;
