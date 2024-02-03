import * as z from 'zod';
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_URL: z.string().url(),
    NEXT_PUBLIC_DIRECTUS_API_URL: z.string().url(),
  },
  skipValidation: process.env.npm_lifecycle_event === 'lint',
  runtimeEnv: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_DIRECTUS_API_URL: process.env.NEXT_PUBLIC_DIRECTUS_API_URL,
  },
});
