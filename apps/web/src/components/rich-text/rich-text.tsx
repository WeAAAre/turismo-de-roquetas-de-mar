import React from 'react';
import Image from 'next/image';
import htmr from 'htmr';

import { cn } from '@/lib/utils';

interface RichTextProps {
  children: string;
  className?: string;
}

const RichText = (props: RichTextProps) => {
  const { children, className } = props;

  const cls = cn('prose', className);

  return (
    <div className={cls}>
      {htmr(children, {
        transform: {
          img: RichTextImage,
        },
      })}
    </div>
  );
};

const RichTextImage = (props: React.ComponentPropsWithoutRef<'img'>) => {
  const { src, alt, ...restProps } = props;

  if (!src) return null;

  return (
    <Image {...restProps} alt={alt || ''} height={500} src={src} width={500} />
  );
};

export default RichText;
