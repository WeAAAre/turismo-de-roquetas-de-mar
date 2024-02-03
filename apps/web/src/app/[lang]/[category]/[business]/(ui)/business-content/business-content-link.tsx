import Link from 'next/link';

import { cn } from '@/lib/utils';

interface BusinessContentLinkProps {
  children: React.ReactNode;
  href: string;
  active?: boolean;
}

const BusinessContentLink = (props: BusinessContentLinkProps) => {
  const { children, href, active } = props;

  return (
    <li
      className={cn('text-black text-sm ', {
        'text-[#39f] font-medium': active,
      })}
    >
      <Link href={href}>{children}</Link>
      {active ? <div className="h-0.5 bg-[#39f] rounded-full" /> : null}
    </li>
  );
};

export default BusinessContentLink;
