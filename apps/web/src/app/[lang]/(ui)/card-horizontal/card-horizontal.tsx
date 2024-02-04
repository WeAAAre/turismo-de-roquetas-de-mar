import Link from 'next/link';
import { BsChevronRight as ArrowRightIcon } from '@react-icons/all-files/bs/BsChevronRight';

import { cn } from '@/lib/utils';
import DirectusImage from '@/components/directus-image/directus-image';

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

interface CardHorizontalProps extends BaseProps {
  href: string;
}

const CardHorizontal = (props: CardHorizontalProps) => {
  const { children, className, href } = props;

  return (
    <Link
      className={cn(
        'border flex gap-1 items-center w-full rounded-lg hover:bg-blue-100/30',
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

const CardHorizontalTitle = (props: BaseProps) => {
  const { children, className } = props;

  return (
    <div
      className={cn(
        'flex-1 flex items-center py-1 px-2 line-clamp-3',
        className,
      )}
    >
      {children}
    </div>
  );
};

interface CardHorizontalImageProps {
  image: React.ComponentProps<typeof DirectusImage>['item'];
  className?: string;
  title: string;
}

const CardHorizontalImage = (props: CardHorizontalImageProps) => {
  const { className, image, title } = props;

  return (
    <div className="relative w-20 h-20 ">
      <DirectusImage
        alt={title}
        className={cn('min-w-20 h-20 object-cover rounded-l-lg', className)}
        height={160}
        item={image}
        width={160}
      />
      <div className="absolute left-0 top-0 w-full h-full bg-black bg-opacity-35 rounded-l-lg" />
    </div>
  );
};

const CardHorizontalArrow = (props: Omit<BaseProps, 'children'>) => {
  const { className } = props;

  return (
    <div className={cn('flex justify-center items-center pr-2', className)}>
      <ArrowRightIcon aria-hidden />
    </div>
  );
};

const Root = CardHorizontal;
const Image = CardHorizontalImage;
const Title = CardHorizontalTitle;
const Arrow = CardHorizontalArrow;

export { Root, Image, Title, Arrow };
