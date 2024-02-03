'use client';
import React from 'react';

import { cn } from '@/lib/utils';
import useMergeRefs from '@/hooks/use-merge-refs';
import useDraggable from '@/hooks/use-draggable';

import { forwardRef } from '../system/forward-ref';

const Draggable = forwardRef<object, 'div'>((props, ref) => {
  const { as: Component = 'div', className, ...restProps } = props;

  const internalRef = React.useRef<HTMLElement>();
  const { events } = useDraggable(internalRef as never);

  return (
    <Component
      className={cn(className)}
      ref={useMergeRefs(ref, internalRef as never)}
      {...events}
      {...restProps}
    />
  );
});

export default Draggable;
