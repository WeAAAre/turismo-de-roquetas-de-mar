import { notFound } from 'next/navigation';
import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';

import PlacesSection from './(ui)/places-section/places-section';
import OffersSection from './(ui)/offers-section/offers-section';
import HeroSection from './(ui)/hero-section/hero-section';
import EventsSection from './(ui)/events-section/events-section';
import CollaboratorsSection from './(ui)/collaborators-section/collaborators-section';
import BusinessSection from './(ui)/business-section/business-section';
import generateSeoMetadata from './(helpers)/generate-seo-metadata';

interface HomePageProps {
  params: Record<string, string>;
}

export async function generateStaticParams() {
  const languages = await directus.request(
    readItems('languages', {
      fields: ['code'],
    }),
  );

  return languages.map((language) => ({
    lang: language.code,
  }));
}

export async function generateMetadata({ params }: HomePageProps) {
  const lang = params.lang;
  const data = await directus.request(
    readItems('home_page', {
      fields: [
        {
          images: [
            {
              directus_files_id: ['id', 'width', 'height', 'title'],
            },
          ],
        },
        {
          seo: [
            '*',
            {
              translations: ['title', 'description'],
            },
          ],
        },
      ],
      deep: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        seo: {
          translations: {
            _filter: {
              languages_code: lang,
            },
          },
        },
      },
    }),
  );

  const seo = data[0]?.seo as {
    nofollow: boolean;
    noindex: boolean;
    translations: {
      title: string;
      description: string;
    }[];
  };

  return generateSeoMetadata(seo, { images: data[0]?.images });
}

const HomePage = (props: HomePageProps) => {
  const { params } = props;
  const lang = params.lang;

  if (!lang) return notFound();

  return (
    <main>
      <section id="inicio">
        <HeroSection lang={lang} />
      </section>
      <section className="mt-10" id="eventos">
        <EventsSection lang={lang} />
      </section>
      <section className="mt-10" id="ofertas">
        <OffersSection lang={lang} />
      </section>
      <section className="mt-10" id="informacion">
        <PlacesSection lang={lang} />
      </section>
      <section className="mt-10" id="negocios">
        <BusinessSection lang={lang} />
      </section>
      <section className="mt-10 py-10 bg-[#eeeeee]" id="colaboradores">
        <CollaboratorsSection />
      </section>
    </main>
  );
};

export default HomePage;
