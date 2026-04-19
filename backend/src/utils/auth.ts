import { MongoClient } from 'mongodb';
import { admin } from 'better-auth/plugins';
import { createAuth } from './createAuth.ts';
import { MONGO_URI, DB_NAME, CLIENT_BASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL, DOMAIN } from '#config';

const client = new MongoClient(MONGO_URI);
const db = client.db(DB_NAME);

export const auth = createAuth({
  db,
  client,
  baseURL: BETTER_AUTH_URL!,
  trustedOrigins: [CLIENT_BASE_URL!],
  secret: BETTER_AUTH_SECRET!,
  domain: DOMAIN,
  isProduction: true,
  plugins: [admin()]
});
