'use client';

import { useDebouncedCallback } from 'use-debounce';
import React from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { VscLoading as LoadingIcon } from '@react-icons/all-files/vsc/VscLoading';
import { IoMdClose as RemoveIcon } from '@react-icons/all-files/io/IoMdClose';
import { FaSearch as SearchIcon } from '@react-icons/all-files/fa/FaSearch';

interface SearchParamsProps {
  defaultQuery?: string;
}

const SearchBar = (props: SearchParamsProps) => {
  const { defaultQuery } = props;

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = React.useState(defaultQuery || '');
  const [isPending, startTransition] = React.useTransition();

  const updateQuery = (v: string) => {
    const params = new URLSearchParams(searchParams);
    if (v.length === 0) params.delete('q');
    else params.set('q', v);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const onChangeValue = useDebouncedCallback(updateQuery, 500);

  return (
    <div className="relative">
      <div className="absolute top-3 left-3 text-gray-400">
        {isPending ? (
          <LoadingIcon aria-hidden className="animate-spin duration-1000" />
        ) : (
          <SearchIcon aria-hidden />
        )}
      </div>
      <input
        className="w-full px-9 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        onChange={(e) => {
          setValue(e.target.value);
          onChangeValue(e.target.value);
        }}
        placeholder="Escribe aquí para comenzar a buscar..."
        type="text"
        value={value}
      />
      {value.length > 0 && (
        <button
          className="absolute top-3 right-3"
          onClick={() => {
            setValue('');
            updateQuery('');
          }}
          type="button"
        >
          <RemoveIcon aria-hidden className="text-gray-400" />
          <span className="sr-only">Limpiar búsqueda</span>
        </button>
      )}
    </div>
  );
};

export default SearchBar;
