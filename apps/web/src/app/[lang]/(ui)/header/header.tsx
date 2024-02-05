import { Suspense } from 'react';
import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import * as NavigationMenu from '@/components/navigation-menu/navigation-menu';

import NavigationMenuLanguageSelect from './navigation-language-select';
import logo from './logo.webp';

interface HeaderProps {
  lang: string;
}

const Header = (props: HeaderProps) => {
  const { lang } = props;

  const getHeaderLink = (href: string) => `/${lang}${href}`;

  return (
    <header className="fixed w-full top-0 z-[999999]">
      <NavigationMenu.Root ariaLabel="Menú principal">
        <NavigationMenu.Logo
          alt="Logo de Turismo de Roquetas de Mar"
          src={logo as never}
        />
        <NavigationMenu.Items>
          <NavigationMenu.ItemLink
            href={getHeaderLink('/')}
            menuItemClassName="md:hidden"
          >
            Inicio
          </NavigationMenu.ItemLink>

          <NavigationMenu.ItemLink href={getHeaderLink('/#informacion')}>
            Información
          </NavigationMenu.ItemLink>
          <NavigationMenu.ItemLink href={getHeaderLink('/#negocios')}>
            Negocios
          </NavigationMenu.ItemLink>
          <NavigationMenu.ItemLink href={getHeaderLink('/#colaboradores')}>
            Colaboradores
          </NavigationMenu.ItemLink>
          <NavigationMenu.ItemLink href={getHeaderLink('/blog')}>
            Blog
          </NavigationMenu.ItemLink>
          <NavigationMenu.ItemLink
            href={getHeaderLink('/eventos')}
            menuItemClassName="md:hidden"
          >
            Eventos
          </NavigationMenu.ItemLink>
          <NavigationMenu.ItemLink
            href={getHeaderLink('/ofertas')}
            menuItemClassName="md:hidden"
          >
            Ofertas e ideas para disfrutar
          </NavigationMenu.ItemLink>
          <Suspense fallback={<div>Cargando...</div>}>
            <LanguageSelect />
          </Suspense>
        </NavigationMenu.Items>
      </NavigationMenu.Root>
    </header>
  );
};

const LanguageSelect = async () => {
  const languanges = await directus.request(
    readItems('languages', {
      fields: [
        'code',
        {
          image: ['id', 'title'],
        },
        'name',
      ],
    }),
  );

  return <NavigationMenuLanguageSelect languanges={languanges as never} />;
};

export default Header;
