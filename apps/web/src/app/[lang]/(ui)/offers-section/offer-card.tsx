import Link from 'next/link';
import humanizeDuration from 'humanize-duration';
import { AiOutlineArrowRight as ArrowRightIcon } from '@react-icons/all-files/ai/AiOutlineArrowRight';

import { cn } from '@/lib/utils';
import { transfromLocaleToLang } from '@/lib/i18/utils';
import Tag from '@/components/tag/tag';
import DirectusImage from '@/components/directus-image/directus-image';

interface OfferCardProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

const OfferCard = (props: OfferCardProps) => {
  const { children, href, className } = props;

  return (
    <li className="min-w-52 max-w-52 border rounded-lg overflow-hidden">
      <Link className={cn('flex flex-col h-full', className)} href={href}>
        {children}
      </Link>
    </li>
  );
};

interface OfferCardImageProps {
  image: React.ComponentProps<typeof DirectusImage>['item'];
  title: string;
}

const OfferCardImage = (props: OfferCardImageProps) => {
  const { image, title } = props;

  return (
    <DirectusImage
      alt={title}
      className="w-full h-48 object-cover"
      height={300}
      item={image}
      width={300}
    />
  );
};

interface OfferCardContentProps {
  children: React.ReactNode;
  className?: string;
}

const OfferCardContent = (props: OfferCardContentProps) => {
  const { children, className } = props;

  return (
    <div className={cn('p-3 flex flex-col flex-1', className)}>{children}</div>
  );
};

interface OfferCardTitleProps {
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
}

const OfferCardTitle = (props: OfferCardTitleProps) => {
  const { children, className, textClassName } = props;

  return (
    <div className={cn('flex-1', className)}>
      <h3
        className={cn(
          'h-full text-[0.9rem] text-black/90 leading-5 lowercase first-letter:uppercase',
          textClassName,
        )}
      >
        {children || 'Sin título'}
      </h3>
    </div>
  );
};

interface OfferCardRemainTimeProps {
  endDate: string;
  lang: string;
}

const OfferCardRemainTime = (props: OfferCardRemainTimeProps) => {
  const { endDate, lang } = props;
  const timeRemaining = new Date(endDate).getTime() - Date.now();

  const variant =
    // eslint-disable-next-line no-nested-ternary
    timeRemaining > 1000 * 60 * 60 * 24 * 7
      ? 'success'
      : timeRemaining > 1000 * 60 * 60 * 24
        ? 'warning'
        : 'error';

  const humanizedTimeRemaining = humanizeDuration(timeRemaining, {
    language: transfromLocaleToLang(lang),
    largest: 2,
    units: ['d', 'h', 'm'],
    maxDecimalPoints: 0,
  });

  return (
    <div className="flex justify-between items-center mt-2">
      <Tag variant={variant}>{humanizedTimeRemaining}</Tag>
      <ArrowRightIcon aria-hidden className="w-5 min-h-5" />
    </div>
  );
};

const Root = OfferCard;
const Image = OfferCardImage;
const Title = OfferCardTitle;
const Content = OfferCardContent;
const RemainTime = OfferCardRemainTime;

export { Root, Image, Title, RemainTime, Content };
