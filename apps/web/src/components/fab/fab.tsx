import Link from 'next/link';

import { cn } from '@/lib/utils';

interface FabProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  position?: 'bottom-right' | 'bottom-left';
}

const Fab = (props: FabProps) => {
  const { href, className, children, position } = props;

  const rootCls = cn(
    'fixed z-50 text-primary rounded-full p-4',
    {
      'bottom-4 right-4': position === 'bottom-right',
      'bottom-4 left-4': position === 'bottom-left',
    },
    className,
  );

  return (
    <Link className={rootCls} href={href}>
      {children}
    </Link>
  );
};

export default Fab;
