import { z } from 'zod';

const envSchema = z.object({
  MONGO_URI: z.url({ protocol: /mongodb/ }),
  DB_NAME: z.string(),
  CLIENT_BASE_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.url()
});

const { data, error, success } = envSchema.safeParse(process.env);

if (!success) {
  console.error('Invalid environment variables:', z.prettifyError(error));
  process.exit(1);
}

export const { MONGO_URI, DB_NAME, CLIENT_BASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL } = data;
