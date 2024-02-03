import Link from 'next/link';

import { cn } from '@/lib/utils';
import * as Grid from '@/components/grid/grid';

interface FooterProps {
  children: React.ReactNode;
}

const Footer = (props: FooterProps) => {
  const { children } = props;

  return (
    <div className="bg-white">
      <Grid.Root as="footer" className="py-10 ">
        <Grid.Item col="12">
          <div className="flex flex-wrap md:justify-around gap-3">
            {children}
          </div>
        </Grid.Item>
      </Grid.Root>
    </div>
  );
};

interface FooterGroupProps {
  children: React.ReactNode;
}

const FooterGroup = (props: FooterGroupProps) => {
  const { children } = props;

  return <ul className="flex flex-col gap-2 px-3 pb-2">{children}</ul>;
};

const FooterLink = (props: React.ComponentProps<typeof Link>) => {
  const { children, className, ...rest } = props;

  return (
    <Link {...rest} className={cn('hover:text-blue-500/80', className)}>
      {children}
    </Link>
  );
};

const Root = Footer;
const Group = FooterGroup;

export { Group, FooterLink as Link, Root };
