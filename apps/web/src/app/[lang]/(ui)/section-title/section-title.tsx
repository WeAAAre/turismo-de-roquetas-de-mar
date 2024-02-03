import { cn } from '@/lib/utils';
import { forwardRef } from '@/components/system/forward-ref';

interface SectionTitleProps {
  title: string;
}

const SectionTitle = forwardRef<SectionTitleProps, 'h2'>((props, ref) => {
  const { title, as: Component = 'h2', className, ...restProps } = props;

  return (
    <Component
      className={cn('text-3xl text-black/90 font-semibold', className)}
      ref={ref}
      {...restProps}
    >
      {title}
    </Component>
  );
});

export default SectionTitle;
