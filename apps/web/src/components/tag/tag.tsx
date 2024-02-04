import { cn } from '@/lib/utils';

import { forwardRef } from '../system/forward-ref';

interface TagProps {
  variant: 'warning' | 'success' | 'error';
}

const Tag = forwardRef<TagProps, 'div'>((props, ref) => {
  const { as: Component = 'div', variant, className, ...restProps } = props;

  const rootCls = cn(
    'rounded-full text-xs py-1 px-3 font-medium',
    {
      'bg-[#ffc845] text-black': variant === 'warning',
      'bg-[#2ecda7] text-black': variant === 'success',
      'bg-[#d3273e] text-white': variant === 'error',
    },
    className,
  );

  return <Component className={rootCls} ref={ref} {...restProps} />;
});

export default Tag;
