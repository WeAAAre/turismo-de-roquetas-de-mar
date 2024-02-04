import { defineOperationApp } from '@directus/extensions-sdk';

export default defineOperationApp({
  id: 'libretranslate-translate',
  name: 'Traducir',
  icon: 'language',
  description: 'Translate collections using LibreTranslate API',
  overview: ({ endpoint }) => [
    {
      label: 'URL',
      text: endpoint as string,
    },
  ],
  options: [
    {
      field: 'endpoint',
      name: 'Endpoint',
      type: 'string',
      required: true,
      meta: {
        width: 'half',
        interface: 'select',
      },
    },
    {
      field: 'base_language',
      name: 'Base Language',
      type: 'string',
      meta: {
        width: 'half',
        interface: 'select-dropdown',
        required: true,
        options: {
          choices: [
            {
              text: 'Italian',
              value: 'it-IT',
            },
            {
              text: 'German',
              value: 'de-DE',
            },
            {
              text: 'Portuguese',
              value: 'pt-BR',
            },
            {
              text: 'English',
              value: 'en-US',
            },
            {
              text: 'French',
              value: 'fr-FR',
            },
            {
              text: 'Spanish',
              value: 'es-ES',
            },
          ],
        },
      },
    },
    {
      field: 'target_languages',
      name: 'Target Languages',
      type: 'string',
      meta: {
        width: 'half',
        interface: 'select-multiple-dropdown',
        required: true,
        options: {
          choices: [
            {
              text: 'Italian',
              value: 'it-IT',
            },
            {
              text: 'German',
              value: 'de-DE',
            },
            {
              text: 'Portuguese',
              value: 'pt-BR',
            },
            {
              text: 'English',
              value: 'en-US',
            },
            {
              text: 'French',
              value: 'fr-FR',
            },
            {
              text: 'Spanish',
              value: 'es-ES',
            },
          ],
        },
      },
    },
    {
      field: 'config',
      name: 'Config',
      type: 'json',
      meta: {
        width: 'full',
        interface: 'json',
        required: true,
      },
    },
    {
      field: 'headers',
      name: '$t:operations.request.headers',
      type: 'json',
      meta: {
        width: 'full',
        interface: 'list',
        options: {
          fields: [
            {
              field: 'header',
              name: '$t:operations.request.header',
              type: 'string',
              meta: {
                width: 'half',
                interface: 'input',
                required: true,
                options: {
                  placeholder: '$t:operations.request.header_placeholder',
                },
              },
            },
            {
              field: 'value',
              name: '$t:value',
              type: 'string',
              meta: {
                width: 'half',
                interface: 'input',
                required: true,
                options: {
                  placeholder: '$t:operations.request.value_placeholder',
                },
              },
            },
          ],
        },
      },
    },
  ],
});
