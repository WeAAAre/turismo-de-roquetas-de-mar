import axios from 'axios';
import { defineOperationApi } from '@directus/extensions-sdk';

const ENDPOINT = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

type Options = {
  apiKey: string;
  latitude: number;
  longitude: number;
  language: string;
};

interface MapboxPlacesReponse {
  features: {
    id: string;
    place_name: string;
    text: string;
    context: { id: string; text: string }[];
  }[];
}

export default defineOperationApi<Options>({
  id: 'mapbox-places-operation',
  handler: async (options) => {
    const { apiKey, latitude, longitude, language } = options;

    if (!isValidNumber(latitude) || !isValidNumber(longitude)) return {};

    const { data } = await axios.get<MapboxPlacesReponse>(
      `/${latitude},${longitude}.json`,
      {
        baseURL: ENDPOINT,
        params: {
          access_token: apiKey,
          language,
        },
      },
    );

    const {
      features: { 0: feature },
    } = data;

    if (!feature) return {};

    return {
      placeName: feature.place_name,
      postcode: getDataFromFeatureContext('postcode', feature.context),
      country: getDataFromFeatureContext('country', feature.context),
      region: getDataFromFeatureContext('region', feature.context),
    };
  },
});

const isValidNumber = (value: unknown): value is number => {
  if (typeof value === 'number' && !Number.isNaN(value)) return true;
  if (typeof value === 'string' && !Number.isNaN(Number(value))) return true;
  return false;
};

const getDataFromFeatureContext = (
  str: string,
  context: { id: string; text: string }[],
) => context?.find((el) => el.id?.startsWith(str))?.text;
