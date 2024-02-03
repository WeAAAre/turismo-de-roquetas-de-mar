'use client';
import React from 'react';

import useIsomorphicLayoutEffect from './use-isomorphic-layout';

type CallbackHandler = () => void;

const useInterval = (callback: CallbackHandler, delay: number | null) => {
  const savedCallback = React.useRef<CallbackHandler>(() => {});

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
};

export default useInterval;
