import React from 'react';

const useMergeRefs = <T extends HTMLElement = HTMLElement>(
  ...refs: React.Ref<T>[]
): React.RefCallback<T> => {
  return React.useCallback(
    (element) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(element);
          // eslint-disable-next-line eqeqeq
        } else if (ref != null) {
          (ref as React.MutableRefObject<T | null>).current = element;
        }
      });
    },
    [refs],
  );
};
export default useMergeRefs;
