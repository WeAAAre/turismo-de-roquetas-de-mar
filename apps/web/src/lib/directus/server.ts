// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/naming-convention */
import 'server-only';
import { createDirectus, rest, staticToken } from '@directus/sdk';

import fetcher from '@/lib/fetcher/fetcher';
import { env } from '@/env/server.mjs';

import type { Collections } from './schema';

interface OptionalDirectusError {
  errors?: (
    | {
        message?: string | null;
        extensions?: {
          code?: DirectusErrorType;
        } | null;
      }
    | undefined
  )[];
}

interface DirectusError {
  errors: {
    message: string;
    extensions: {
      code: DirectusErrorType;
    };
  }[];
}

const responseHasAnyError = (rawData: unknown): rawData is DirectusError => {
  const data = rawData as OptionalDirectusError;
  const result = Boolean(data.errors?.some((error) => error?.extensions?.code));

  if (result) {
    // eslint-disable-next-line no-console
    console.error('DIRECTUS ERROR', data.errors);
  }

  return result;
};

const responseHasError = (
  rawData: unknown,
  code: DirectusErrorType,
): rawData is DirectusError => {
  const data = rawData as OptionalDirectusError;

  return Boolean(
    data.errors?.some(
      (error) =>
        error?.extensions?.code !== undefined && error.extensions.code === code,
    ),
  );
};

const createError = (code: DirectusErrorType, message: string) => {
  return {
    errors: [
      {
        message,
        extensions: {
          code,
        },
      },
    ],
  } as DirectusError;
};

enum DirectusErrorType {
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  FORBIDDEN = 'FORBIDDEN',
  NO_REFRESH_TOKEN = 'NO_REFRESH_TOKEN',
  REFRESH_TOKEN_INVALID = 'REFRESH_TOKEN_INVALID',
}

const sdk = createDirectus<Collections>(env.DIRECTUS_API_URL, {
  globals: {
    fetch: fetcher,
  },
})
  .with(rest())
  .with(staticToken(env.DIRECTUS_STATIC_TOKEN));

const directus = {
  ...sdk,
  request: ((...params) => {
    try {
      return sdk.request(...params);
    } catch (error) {
      return createError(DirectusErrorType.FORBIDDEN, 'Token expired');
    }
  }) as typeof sdk.request,
  responseHasAnyError,
  responseHasError,
  createError,
};

export { directus };
