'use client';
import React from 'react';

interface ShareProps {
  title: string;
  href: string;
}

const useShare = (props: ShareProps) => {
  const { title, href } = props;

  const onShare = React.useCallback(async () => {
    try {
      const url = `${window.location.href}/${href}`;
      await navigator.share({ title, url });
    } catch (err) {
      /* empty */
    }
  }, [href, title]);

  const compatible =
    typeof navigator !== 'undefined' ? 'share' in navigator : true;

  return { onShare, compatible };
};

export default useShare;
