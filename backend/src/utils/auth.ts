import { MongoClient } from 'mongodb';
import { createAuth } from './createAuth.ts';
import { MONGO_URI, DB_NAME, CLIENT_BASE_URL, BETTER_AUTH_SECRET, DOMAIN } from '#config';

const client = new MongoClient(MONGO_URI);
const db = client.db(DB_NAME);

export const auth = createAuth({
  db,
  client,
  baseURL: CLIENT_BASE_URL!,
  secret: BETTER_AUTH_SECRET!,
  domain: DOMAIN,
  isProduction: true
});
