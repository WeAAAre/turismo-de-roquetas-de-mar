import { cn } from '@/lib/utils';

import { forwardRef } from '../system/forward-ref';
import computeColsSizes from './helpers/compute-cols-sizes';

type GridValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
type GridItemRange = `${GridValues}` | '-';

interface GridItemProps {
  col:
    | `${GridValues}`
    | `${GridValues}|${GridValues}`
    | `${GridValues}|${GridItemRange}|${GridValues}`
    | `${GridValues}|${GridItemRange}|${GridItemRange}|${GridValues}`;
}

const GridItem = forwardRef<GridItemProps, 'div'>((props, ref) => {
  const { as: Component = 'div', className, col, ...restProps } = props;

  const { sm, md, lg, xl } = computeColsSizes(col);

  const rootCls = cn(
    'relative inline-block xl:inline-block 2xl:inline-block',
    {
      hidden: sm === 0,
      'col-span-1': sm === 1,
      'col-span-2': sm === 2,
      'col-span-3': sm === 3,
      'col-span-4': sm === 4,
      'col-span-5': sm === 5,
      'col-span-6': sm === 6,
      'col-span-7': sm === 7,
      'col-span-8': sm === 8,
      'col-span-9': sm === 9,
      'col-span-10': sm === 10,
      'col-span-11': sm === 11,
      'col-span-12': sm === 12,
      'md:hidden': md === 0,
      'md:col-span-1': md === 1,
      'md:col-span-2': md === 2,
      'md:col-span-3': md === 3,
      'md:col-span-4': md === 4,
      'md:col-span-5': md === 5,
      'md:col-span-6': md === 6,
      'md:col-span-7': md === 7,
      'md:col-span-8': md === 8,
      'md:col-span-9': md === 9,
      'md:col-span-10': md === 10,
      'md:col-span-11': md === 11,
      'md:col-span-12': md === 12,
      'lg:hidden': lg === 0,
      'lg:col-span-1': lg === 1,
      'lg:col-span-2': lg === 2,
      'lg:col-span-3': lg === 3,
      'lg:col-span-4': lg === 4,
      'lg:col-span-5': lg === 5,
      'lg:col-span-6': lg === 6,
      'lg:col-span-7': lg === 7,
      'lg:col-span-8': lg === 8,
      'lg:col-span-9': lg === 9,
      'lg:col-span-10': lg === 10,
      'lg:col-span-11': lg === 11,
      'lg:col-span-12': lg === 12,
      'xl:hidden': xl === 0,
      'xl:col-span-1': xl === 1,
      'xl:col-span-2': xl === 2,
      'xl:col-span-3': xl === 3,
      'xl:col-span-4': xl === 4,
      'xl:col-span-5': xl === 5,
      'xl:col-span-6': xl === 6,
      'xl:col-span-7': xl === 7,
      'xl:col-span-8': xl === 8,
      'xl:col-span-9': xl === 9,
      'xl:col-span-10': xl === 10,
      'xl:col-span-11': xl === 11,
      'xl:col-span-12': xl === 12,
    },
    className,
  );

  return <Component ref={ref} {...restProps} className={rootCls} />;
});

GridItem.displayName = 'GridItem';

export type { GridItemProps };
export default GridItem;
