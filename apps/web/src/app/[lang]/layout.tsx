import PlausibleProvider from 'next-plausible';
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
  const { children, params } = props;

  return (
    <html
      className={cn('h-full w-full', poppins.variable)}
      lang={transfromLocaleToLang(params.lang)}
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
        <Header />
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
            <Footer.Link href="/#inicio">Inicio</Footer.Link>
            <Footer.Link href="/#informacion">Información</Footer.Link>
            <Footer.Link href="/#negocios">Negocios</Footer.Link>
            <Footer.Link href="/#colaboradores">Colaboradores</Footer.Link>
            <Footer.Link href="/eventos">Eventos</Footer.Link>
            <Footer.Link href="/ofertas">
              Ofertas e ideas para disfrutar
            </Footer.Link>
          </Footer.Group>
          <Footer.Group>
            <Footer.Link href="/terminos-y-condiciones">
              Términos y condiciones
            </Footer.Link>
            <Footer.Link href="/politica-de-privacidad">
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
