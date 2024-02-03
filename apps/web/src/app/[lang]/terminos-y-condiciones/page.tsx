import { notFound } from 'next/navigation';
import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import RichText from '@/components/rich-text/rich-text';

import GenericView from '../(ui)/generic-view/generic-view';

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

interface TermsAndConditionsPageProps {
  params: Record<string, string>;
}

const TermsAndConditionsPage = async (props: TermsAndConditionsPageProps) => {
  const {
    params: { lang },
  } = props;

  const data = await directus.request(
    readItems('terms_conditions_page', {
      fields: [
        {
          translations: ['content', 'title'],
        },
      ],
      deep: {
        translations: {
          _filter: {
            languages_code: lang,
          },
        },
      },
    }),
  );

  if (data.length === 0) return notFound();

  const { title, content } = data[0]!.translations?.[0] || {};

  if (!title || !content) return notFound();

  return (
    <GenericView title={title}>
      <RichText className="prose-sm max-w-none">{content}</RichText>
    </GenericView>
  );
};

export default TermsAndConditionsPage;
