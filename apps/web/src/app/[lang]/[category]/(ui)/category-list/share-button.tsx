'use client';

import useShare from '@/hooks/use-share';

interface ShareButtonProps
  extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'type' | 'onClick'> {
  name: string;
  href: string;
  children: React.ReactNode;
}

const ShareButton = (props: ShareButtonProps) => {
  const { name, href, children, ...restProps } = props;
  const { onShare, compatible } = useShare({
    title: name,
    href,
  });

  if (!compatible) return null;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        void onShare();
      }}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
};

export default ShareButton;
