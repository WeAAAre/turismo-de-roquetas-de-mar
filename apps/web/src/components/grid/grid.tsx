import React from 'react';

import { cn } from '@/lib/utils';
import { forwardRef } from '@/components/system/forward-ref';

import GridItem from './grid-item';

type GridProps = object;

const Grid = forwardRef<GridProps, 'div'>((props, ref) => {
  const { as: Component = 'div', className, ...restProps } = props;

  const rootCls = cn(
    `h-full w-full grid grid-cols-12 gap-x-5 px-4 md:px-6`,
    ' lg:max-w-[1104px] xl:max-w-[1448px] lg:mx-auto',
    className,
  );

  return <Component className={rootCls} ref={ref} {...restProps} />;
});

Grid.displayName = 'Grid';

const Root = Grid;
const Item = GridItem;

export { Root, Item };
