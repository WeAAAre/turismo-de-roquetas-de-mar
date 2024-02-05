'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { MdLanguage as LanguageIcon } from '@react-icons/all-files/md/MdLanguage';

import * as NavigationMenu from '@/components/navigation-menu/navigation-menu';
import DirectusImage from '@/components/directus-image/directus-image';

interface NavigationMenuLanguageSelectProps {
  languanges: {
    code: string | null;
    image: {
      id: string | null;
      title: string | null;
    };
    name: string | null;
  }[];
}

const NavigationMenuLanguageSelect = (
  props: NavigationMenuLanguageSelectProps,
) => {
  const { languanges } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getURL = (code: string) => {
    const realPathname = pathname.split('/').slice(2).join('/');
    const search = new URLSearchParams(searchParams);
    const baseURL = `/${code}/${realPathname}`;

    if (search.size === 0) {
      return baseURL;
    }

    return `${baseURL}?${search.toString()}`;
  };

  const secondToken = pathname.split('/')[2];

  if (secondToken === 'blog') return null;

  return (
    <NavigationMenu.Item submenu>
      <NavigationMenu.Trigger>
        <span className="flex gap-1 items-center">
          <LanguageIcon aria-hidden />
          Idioma
        </span>
      </NavigationMenu.Trigger>
      <NavigationMenu.Content className="md:border md:border-t-0">
        {languanges.map((language) => (
          <NavigationMenu.ItemLink
            className="flex gap-3 items-center"
            href={getURL(language.code as string)}
            key={language.code}
          >
            <DirectusImage
              alt={language.name || ''}
              className="w-6 h-6 rounded-full"
              height={24}
              item={language.image as never}
              width={24}
            />
            {language.name}
          </NavigationMenu.ItemLink>
        ))}
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
};

export default NavigationMenuLanguageSelect;
