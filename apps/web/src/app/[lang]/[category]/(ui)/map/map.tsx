'use client';
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from 'react-leaflet';
import React from 'react';
import Leaflet from 'leaflet';
import { MdGpsFixed as GPSIcon } from '@react-icons/all-files/md/MdGpsFixed';

import DirectusImage from '@/components/directus-image/directus-image';

import 'leaflet/dist/leaflet.css';

export interface MapItem {
  coordinates: readonly [number, number];
  name: string;
  address?: string;
  image?: string;
}

interface MapProps {
  items: MapItem[];
  defaultCenter: [number, number];
  zoom?: number;
  height?: number | string;
  disableStartOpen?: boolean;
}

interface MarkerItemProps {
  item: MapItem;
  icon: Leaflet.DivIcon;
  map: Leaflet.Map | null;
  open: boolean;
}

const MarkerItem = ({ item, icon, map, open }: MarkerItemProps) => {
  const popupRef = React.useRef<Leaflet.Popup | null>();
  const [refReady, setRefReady] = React.useState(false);
  const coordinates: [number, number] = [
    item.coordinates[1],
    item.coordinates[0],
  ];

  React.useEffect(() => {
    if (popupRef.current && refReady && open && map) {
      popupRef.current.openOn(map);
    }
  }, [open, refReady, map]);

  return (
    <Marker icon={icon} position={coordinates}>
      <Popup
        keepInView
        ref={(r) => {
          popupRef.current = r;
          setRefReady(true);
        }}
      >
        {item.image ? (
          <DirectusImage
            alt={item.name}
            className="max-h-32 w-full object-cover rounded-md"
            decoding="async"
            height={128}
            item={item.image}
            width={300}
          />
        ) : null}
        <div className="flex p-2.5 gap-2 flex-col">
          <span className="text-black font-semibold">{item.name}</span>
          <span className="">{item.address}</span>
          <div className="flex gap-3">
            <a
              className="max-w-full flex gap-2 items-center px-2 py-1.5 rounded-lg border hover:bg-black/5 transition-colors "
              href={`https://www.google.es/maps/dir/${coordinates[0]},${coordinates[1]}`}
              rel="noreferrer"
              target="_blank"
            >
              <GPSIcon />
              <span className="text-black text-sm font-medium">
                Como llegar
              </span>
            </a>
          </div>
        </div>
      </Popup>
      <Tooltip>{item.name}</Tooltip>
    </Marker>
  );
};

const Map = ({
  items,
  defaultCenter,
  zoom = 13,
  height = 400,
  disableStartOpen = false,
}: MapProps) => {
  const [map, setMap] = React.useState<Leaflet.Map | null>(null);
  const iconHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" class="text-[rgba(239,68,68,1)] -mt-2 text-3xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"></path></svg>`;

  const customMarkerIcon = new Leaflet.DivIcon({
    html: iconHTML,
    iconSize: [30, 30],
    shadowSize: [30, 30],
    className: 'bg-transparent border-none',
  });

  const center =
    items.length === 1
      ? ([items[0]!.coordinates[1], items[0]!.coordinates[0]] as [
          number,
          number,
        ])
      : defaultCenter;

  return (
    <>
      <div className="text-[rgba(239,68,68,1)] -mt-2 text-3xl hidden" />
      <MapContainer
        center={center}
        ref={setMap}
        scrollWheelZoom
        style={{ height, width: '100%' }}
        zoom={zoom}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {items.map((item, idx) => (
          <MarkerItem
            icon={customMarkerIcon}
            item={item}
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            map={map}
            open={items.length === 1 && !disableStartOpen}
          />
        ))}
      </MapContainer>
    </>
  );
};
export default Map;
