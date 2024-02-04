/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable camelcase */
import z from 'zod';
import { get, pickBy, set } from 'lodash';
import { defineOperationApi } from '@directus/extensions-sdk';

import LibreTranslate from './services/translate/libre-translate';

type Options = {
  endpoint: string;
  base_language: string;
  headers: { value: string; header: string }[];
  target_languages: string[];
  config: unknown;
};

interface OperationData {
  $trigger: {
    collection: string;
    keys?: number[];
    key?: number;
    payload: object;
    event: string;
  };
}

interface FieldMetadata {
  key: string;
  fields: string[];
}

interface GetCurrentItemOptions {
  fields: FieldMetadata[];
  getSchema: () => Promise<unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accountability: any;
  data: OperationData;
}

type OperationContext = Parameters<
  Parameters<typeof defineOperationApi<Options>>[0]['handler']
>[1];

interface Context extends Omit<OperationContext, 'data'> {
  data: OperationData;
}

export default defineOperationApi<Options>({
  id: 'libretranslate-translate',
  handler: async (options, ctx) => {
    const { config, baseLanguage, endpoint, tagetLanguages, headers } =
      computeOptions(options);
    const { collection, accountability, data, getSchema, services, item } =
      computeCtx(ctx);

    const fieldsToTranslateConfigs = config[collection];
    if (!fieldsToTranslateConfigs || !item) return;

    const translator = new LibreTranslate(endpoint, { headers });
    const currentItem = (await getCurrentItem({
      accountability,
      fields: fieldsToTranslateConfigs,
      getSchema,
      services,
      data,
    })) as object;

    await Promise.all(
      fieldsToTranslateConfigs.map(async ({ key, fields }) => {
        const baseLangTranslation = getTranslation(item, key, baseLanguage);
        if (!baseLangTranslation) return;

        const translateFieldsTo = (targetLanguage: string) =>
          translator.translateObject(
            pickBy(baseLangTranslation, (_, k) => fields.includes(k)) as never,
            baseLanguage,
            targetLanguage,
          );

        const targetsLangsTranslations = await Promise.all(
          tagetLanguages.map(async (targetLanguage) => ({
            ...findByLang(get(currentItem, key), targetLanguage),
            languages_code: targetLanguage,
            ...(await translateFieldsTo(targetLanguage)),
          })),
        );

        set(item, key, [baseLangTranslation, ...targetsLangsTranslations]);
      }),
    );

    return item;
  },
});

const isCreating = (data: OperationData) =>
  data.$trigger.event.endsWith('items.create');

const getItemId = (data: OperationData['$trigger']) => {
  return data.keys ? data.keys[0] : data.key;
};

const getCurrentItem = async (params: GetCurrentItemOptions) => {
  const { fields, getSchema, services, accountability, data } = params;

  if (isCreating(data)) return {};

  const itemsService = new services.ItemsService(data.$trigger.collection, {
    schema: await getSchema(),
    accountability,
  });
  const itemId = getItemId(data.$trigger);

  return itemsService.readOne(itemId, {
    fields: fields
      .map(({ key, fields }) => [
        ...key.split('.').map((objNested) => `${objNested}.id`),
        `${key}.languages_code`,
        ...fields.map((field) => `${key}.${field}`),
      ])
      .flat(),
  });
};

const getTranslation = (item: unknown, key: string, language: string) => {
  const translations = get(item, key);
  if (!translations) return null;

  return (
    findByLang(translations.create || [], language) ||
    findByLang(translations.update || [], language)
  );
};

const computeCtx = (rawCtx: OperationContext) => {
  const ctx = rawCtx as never as Context;
  return {
    ...ctx,
    item: ctx.data.$trigger.payload,
    collection: ctx.data.$trigger.collection,
  };
};

const computeOptions = (options: Options) => {
  const configSchema = z.record(
    z.array(
      z.object({
        key: z.string(),
        fields: z.array(z.string()),
      }),
    ),
  );

  const config = configSchema.parse(options.config);

  return {
    ...options,
    baseLanguage: options.base_language,
    tagetLanguages: options.target_languages,
    config,
  };
};

const findByLang = (translations: unknown, language: string) => {
  const schema = z.object({
    languages_code: z.union([
      z.object({
        code: z.string(),
      }),
      z.string(),
    ]),
  });

  if (!translations || !Array.isArray(translations)) return null;

  return translations.find((translation) => {
    const result = schema.safeParse(translation);
    if (!result.success) return false;

    const { languages_code } = result.data;
    if (typeof languages_code === 'string') return languages_code === language;
    if (languages_code.code === language) return true;

    return false;
  }) as Zod.infer<typeof schema> | undefined;
};
