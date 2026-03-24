import { z } from 'zod';

const envSchema = z.object({
  MONGO_URI: z.url({ protocol: /mongodb/ }),
  DB_NAME: z.string(),
  CLIENT_BASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),
  DOMAIN: z.string()
});

const { data, error, success } = envSchema.safeParse(process.env);

if (!success) {
  console.error('Invalid environment variables:', z.prettifyError(error));
  if (process.env.NODE_ENV !== 'test') process.exit(1);
}

export const { MONGO_URI, DB_NAME, CLIENT_BASE_URL, BETTER_AUTH_SECRET, DOMAIN } = data || {};
