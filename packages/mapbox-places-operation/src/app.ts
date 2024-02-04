import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
  id: 'mapbox-places-operation',
  name: 'Mapbox Places',
  icon: 'map',
  description: 'Use the Mapbox Places API to search for places and addresses.',
  overview: ({ latitude, longitude }) => [
    {
      label: 'Coordinates',
      text: `${latitude}, ${longitude}`,
    },
  ],
  options: [
    {
      field: 'apiKey',
      name: 'API Key',
      type: 'string',
      meta: {
        width: 'full',
        interface: 'input',
      },
    },
    {
      field: 'latitude',
      name: 'Latitude',
      type: 'number',
      meta: {
        width: 'half',
        interface: 'input',
      },
    },
    {
      field: 'longitude',
      name: 'Longitude',
      type: 'number',
      meta: {
        width: 'half',
        interface: 'input',
      },
    },
    {
      field: 'language',
      name: 'Language',
      type: 'string',
      defaultValue: 'es',
      meta: {
        width: 'half',
        interface: 'select-dropdown',
        options: {
          choices: [
            {
              text: 'Spanish',
              value: 'es',
            },
            {
              text: 'Italian',
              value: 'it',
            },
            {
              text: 'German',
              value: 'de',
            },
            {
              text: 'Portuguese',
              value: 'pt',
            },
            {
              text: 'English',
              value: 'en',
            },
            {
              text: 'French',
              value: 'fr',
            },
          ],
        },
      },
    },
  ],
});
