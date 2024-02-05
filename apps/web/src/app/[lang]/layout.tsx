import PlausibleProvider from 'next-plausible';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

import { cn } from '@/lib/utils';
import { transfromLocaleToLang } from '@/lib/i18/utils';
import * as Footer from '@/components/footer/footer';

import logo from './logo.webp';
import Header from './(ui)/header/header';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: Record<string, string>;
}

const RootLayout = (props: RootLayoutProps) => {
  const {
    children,
    params: { lang },
  } = props;

  if (!lang) return notFound();

  const getFooterLink = (href: string) => `/${lang}${href}`;

  return (
    <html
      className={cn('h-full w-full', poppins.variable)}
      lang={transfromLocaleToLang(lang)}
    >
      <head>
        <PlausibleProvider
          customDomain="https://analytics.gisei.es"
          domain="turismoderoquetasdemar.es"
          enabled
          selfHosted
          trackLocalhost
        />
        <link href="/favicon.ico" rel="icon" sizes="any" />
      </head>
      <body>
        <Header lang={lang} />
        {children}
        <Footer.Root>
          <Image
            alt="Logo - Turismo Roquetas de Mar"
            className="w-36 h-32"
            height={200}
            src={logo}
            width={250}
          />
          <Footer.Group>
            <Footer.Link href={getFooterLink('/#inicio')}>Inicio</Footer.Link>
            <Footer.Link href={getFooterLink('/#informacion')}>
              Información
            </Footer.Link>
            <Footer.Link href={getFooterLink('/#negocios')}>
              Negocios
            </Footer.Link>
            <Footer.Link href={getFooterLink('/#colaboradores')}>
              Colaboradores
            </Footer.Link>
            <Footer.Link href={getFooterLink('/eventos')}>Eventos</Footer.Link>
          </Footer.Group>
          <Footer.Group>
            <Footer.Link href={getFooterLink('/ofertas')}>
              Ofertas e ideas para disfrutar
            </Footer.Link>
            <Footer.Link href={getFooterLink('/blog')}>Blog</Footer.Link>
            <Footer.Link
              href={getFooterLink('/terminos-y-condiciones')}
              prefetch={false}
            >
              Términos y condiciones
            </Footer.Link>
            <Footer.Link
              href={getFooterLink('/politica-de-privacidad')}
              prefetch={false}
            >
              Política de privacidad
            </Footer.Link>
            <Footer.Link href="mailto:info@turismoderoquetasdemar.es">
              Contacto
            </Footer.Link>
          </Footer.Group>
        </Footer.Root>
      </body>
    </html>
  );
};

export default RootLayout;
