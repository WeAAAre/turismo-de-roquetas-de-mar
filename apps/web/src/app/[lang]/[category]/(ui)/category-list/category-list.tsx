import Link from 'next/link';
import { ImShare2 as ShareIcon } from '@react-icons/all-files/im/ImShare2';
import { FiMapPin as MapPinIcon } from '@react-icons/all-files/fi/FiMapPin';
import { FaChevronRight as ArrowRightIcon } from '@react-icons/all-files/fa/FaChevronRight';
import { readItems } from '@directus/sdk';

import { directus } from '@/lib/directus/server';
import DirectusImage from '@/components/directus-image/directus-image';

import ShareButton from './share-button';
import OpenMapButton from './open-map-button';

interface CategoryListProps {
  query?: string;
  sluglify: string;
  categoryType: 'business' | 'site' | null | undefined;
  sortBy: string;
  sortMode: string;
}

function RNG(seed: number) {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let s = seed % m;
  return () => {
    return (s = (s * a) % m) / m;
  };
}

const CategoryList = async (props: CategoryListProps) => {
  const { sluglify, query, sortBy, categoryType, sortMode } = props;

  const sortSign = sortMode === 'asc' ? '' : '-';
  const data = await directus.request(
    readItems('business', {
      fields: [
        'id',
        'name',
        'address',
        'streetAddress',
        'sluglify',
        'redirect_to',
        {
          image: ['id', 'title'],
        },
      ],
      filter: {
        category: {
          sluglify: {
            _eq: sluglify,
          },
        },
        ...(categoryType === 'business'
          ? {
              finalization_date: {
                _gte: new Date().toISOString(),
              },
            }
          : {}),
        ...(query
          ? {
              name: {
                _contains: query,
              },
            }
          : {}),
      },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      sort: sortBy === '?' ? [] : [`${sortSign}${sortBy}`],
      limit: -1,
    }),
  );

  if (sortBy === '?' && query === undefined) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const seed = `${day}-${month}-${year}`;
    const numberSeed = Number(seed.replace(/-/g, ''));
    const random = RNG(numberSeed);
    data.sort(() => random() - 0.5);
  }

  const getItemLink = (slug: string | null) => `/${sluglify}/${slug}`;

  return (
    <ul className="grid auto-rows-[1fr] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((item) => (
        <li className="col-span-1 h-full" key={item.id}>
          <Link
            className="flex flex-col h-full"
            href={item.redirect_to ?? getItemLink(item.sluglify)}
          >
            <div className="relative">
              <DirectusImage
                alt=""
                className="object-cover rounded-t-lg w-full h-64"
                height={250}
                item={item.image as never}
                width={320}
              />
              <ShareButton
                className="absolute text-white top-2 right-2 flex justify-center items-center bg-[#333232] rounded-full p-2 hover:bg-opacity-80 transition-colors duration-300 ease-in-out"
                href={item.redirect_to ?? getItemLink(item.sluglify)}
                name={item.name || 'Compartir'}
              >
                <ShareIcon aria-hidden />
              </ShareButton>
            </div>
            <div className="flex-1 flex flex-col bg-[#333232] text-white px-3 py-2 rounded-b-lg">
              <h2 className="font-semibold line-clamp-2 uppercase leading-6">
                {item.name}
              </h2>
              {item.streetAddress ? (
                <div className="flex gap-2 mt-2">
                  <MapPinIcon aria-hidden className="h-4 min-w-3" />
                  <span className="line-clamp-1 text-xs">
                    {item.streetAddress}
                  </span>
                </div>
              ) : null}
              <div className="flex-1 flex items-end">
                <div className="flex-1 flex justify-between items-center my-2 ml-2">
                  <div className="flex gap-2 items-center w-max px-2 py-1 bg-[#cfd8d7] bg-opacity-30 hover:bg-opacity-50 rounded-lg">
                    <span className="font-medium text-sm">Ver más info</span>
                    <ArrowRightIcon
                      aria-hidden
                      className="w-3 h-3"
                      focusable="false"
                    />
                  </div>
                  <OpenMapButton itemIdToDisplayInMap={item.id} />
                </div>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
