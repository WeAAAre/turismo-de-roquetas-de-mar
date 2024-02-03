import * as z from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  server: {
    URL: z.string().url(),
    DIRECTUS_API_URL: z.string().url(),
    CF_ACCESS_CLIENT_ID: z.string(),
    CF_ACCESS_CLIENT_SECRET: z.string(),
    DIRECTUS_STATIC_TOKEN: z.string(),
  },
  skipValidation: process.env.npm_lifecycle_event === 'lint',
  runtimeEnv: process.env,
});
