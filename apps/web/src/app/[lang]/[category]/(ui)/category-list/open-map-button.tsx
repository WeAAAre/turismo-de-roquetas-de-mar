'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FaMapMarkerAlt as MapIcon } from '@react-icons/all-files/fa/FaMapMarkerAlt';

interface OpenMapButtonProps {
  itemIdToDisplayInMap: number;
}

const OpenMapButton = (props: OpenMapButtonProps) => {
  const { itemIdToDisplayInMap } = props;
  const patname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set('qmap', itemIdToDisplayInMap.toString());
    router.push(`${patname}?${params.toString()}`);
  };

  return (
    <button
      aria-label="Abrir mapa"
      className="p-2 bg-[#cfd8d7] bg-opacity-30 hover:bg-opacity-50 rounded-full"
      onClick={onClick}
      type="button"
    >
      <MapIcon aria-hidden className="size-5 text-white" />
    </button>
  );
};

export default OpenMapButton;
