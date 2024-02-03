'use client';
import { RemoveScroll } from 'react-remove-scroll';
import React from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import HamburgerIcon from 'hamburger-react';

import { cn } from '@/lib/utils';
import useScrollPosition from '@/hooks/use-scroll-position';
import { useMediaQuery } from '@/hooks/use-media-query';
import * as Grid from '@/components/grid/grid';
import * as Collapsible from '@/components/collapsible/collapsible';

interface ChildrenProps {
  children: React.ReactNode;
}

interface NavigationMenuProps {
  children: React.ReactNode;
  ariaLabel: string;
}

interface NavigationMenuContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavigationMenuContext =
  React.createContext<NavigationMenuContextProps | null>(null);

const useNavigationMenuContext = () => {
  const context = React.useContext(NavigationMenuContext);

  if (!context) {
    throw new Error(
      'useNavigationMenuContext must be used within a NavigationMenuContextProvider',
    );
  }

  return context;
};

const NavigationMenu = (props: NavigationMenuProps) => {
  const { children, ariaLabel } = props;
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const pathname = usePathname();
  const params = useParams();
  const { y } = useScrollPosition();

  React.useEffect(() => {
    setOpen(false);
  }, [params]);

  const isFirstLevelOfPath = pathname.split('/').length === 2;

  return (
    <RemoveScroll
      className={cn(
        'bg-white/90 backdrop-blur border-b transition-all duration-300',
        {
          'backdrop-blur-0 bg-transparent text-white border-none':
            y < 50 && !open && isFirstLevelOfPath,
        },
      )}
      // eslint-disable-next-line react/jsx-no-leaked-render
      enabled={open && !isDesktop}
      removeScrollBar={false}
    >
      <NavigationMenuContext.Provider value={{ open, setOpen }}>
        <Grid.Root aria-label={ariaLabel} as="nav">
          <Grid.Item col="12">
            <div className="md:flex py-4">{children}</div>
          </Grid.Item>
        </Grid.Root>
      </NavigationMenuContext.Provider>
    </RemoveScroll>
  );
};

interface NavigationMenuLogoProps {
  src: string;
  alt: string;
}

const NavigationMenuLogo = (props: NavigationMenuLogoProps) => {
  const { open, setOpen } = useNavigationMenuContext();

  return (
    <div className="flex justify-between items-center">
      <Link href="/">
        <Image
          alt={props.alt}
          className="h-full w-12"
          height={96}
          src={props.src}
          width={86}
        />
      </Link>

      <div className="md:hidden">
        <HamburgerIcon
          label="Abrir menú"
          size={23}
          toggle={setOpen}
          toggled={open}
        />
      </div>
    </div>
  );
};

const NavigationMenuItems = (props: ChildrenProps) => {
  const { children } = props;
  const { open } = useNavigationMenuContext();

  return (
    <ul
      className={cn(
        'flex-1 flex flex-col md:flex-auto md:flex-row md:justify-end md:items-center',
        'h-0 md:h-auto transition-[height,margin] overflow-hidden duration-300',
        {
          'h-[calc(100vh-4.60rem)] mt-10 md:mt-0': open,
        },
      )}
    >
      {children}
    </ul>
  );
};

interface NavigationMenuItemProps extends ChildrenProps {
  submenu?: boolean;
  className?: string;
}

const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  const { children, submenu, className } = props;

  const rootCls = cn('py-4 md:py-0 md:px-6', className);

  if (submenu) {
    return (
      <li className={rootCls}>
        <Collapsible.Root>{children}</Collapsible.Root>
      </li>
    );
  }

  return <li className={rootCls}>{children}</li>;
};

interface NavigationMenuItemLinkProps extends ChildrenProps {
  href: string;
  className?: string;
  menuItemClassName?: string;
  lang?: string;
}

const NavigationMenuItemLink = (props: NavigationMenuItemLinkProps) => {
  const { children, href, lang, className, menuItemClassName } = props;

  return (
    <NavigationMenuItem className={menuItemClassName}>
      <Link
        className={cn(
          'w-full block hover:text-blue-400 font-medium',
          className,
        )}
        href={href}
        lang={lang}
      >
        {children}
      </Link>
    </NavigationMenuItem>
  );
};

const NavigationMenuTrigger = (props: ChildrenProps) => {
  const { children } = props;

  return (
    <Collapsible.Trigger className="hover:text-blue-400 font-medium">
      {children}
    </Collapsible.Trigger>
  );
};

const NavigationMenuContent = (props: ChildrenProps) => {
  const { children } = props;

  return (
    <Collapsible.Content>
      <div className="md:fixed md:top-[4.60rem] md:rounded-lg md:w-full md:left-0">
        <Grid.Root className="md:place-items-end">
          <Grid.Item col="12">
            <ul className="md:py-2 md:text-black md:text-right md:bg-white/90 md:backdrop-blur md:w-max md:[&>li]:py-2">
              {children}
            </ul>
          </Grid.Item>
        </Grid.Root>
      </div>
    </Collapsible.Content>
  );
};

const Root = NavigationMenu;
const Logo = NavigationMenuLogo;
const Items = NavigationMenuItems;
const Item = NavigationMenuItem;
const ItemLink = NavigationMenuItemLink;
const Trigger = NavigationMenuTrigger;
const Content = NavigationMenuContent;

export { Content, Item, ItemLink, Items, Logo, Root, Trigger };
