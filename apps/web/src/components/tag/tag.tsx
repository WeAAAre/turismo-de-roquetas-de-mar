import { cn } from '@/lib/utils';

import { forwardRef } from '../system/forward-ref';

interface TagProps {
  variant: 'warning' | 'success' | 'error';
}

const Tag = forwardRef<TagProps, 'div'>((props, ref) => {
  const { as: Component = 'div', variant, className, ...restProps } = props;

  const rootCls = cn(
    'rounded-full text-xs py-1 px-3',
    {
      'bg-yellow-600 text-white': variant === 'warning',
      'bg-green-600 text-white': variant === 'success',
      'bg-red-500 text-white': variant === 'error',
    },
    className,
  );

  return <Component className={rootCls} ref={ref} {...restProps} />;
});

export default Tag;
