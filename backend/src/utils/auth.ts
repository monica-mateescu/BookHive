import { betterAuth } from 'better-auth';
import { testUtils } from 'better-auth/plugins';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { MONGO_URI, DB_NAME, CLIENT_BASE_URL, BETTER_AUTH_SECRET, DOMAIN } from '#config';

const mongodb = await MongoMemoryServer.create();

const uri = MONGO_URI ?? mongodb.getUri();

const client = new MongoClient(uri);
const db = client.db(DB_NAME ?? 'db-test');

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  secret: BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
  baseURL: CLIENT_BASE_URL ?? 'http://localhost:5173',
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60
    }
  },
  user: {
    fields: {
      name: 'firstName'
    },
    additionalFields: { lastName: { type: 'string' }, role: { type: 'string', default: 'user' } }
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true
    },
    crossSubDomainCookies: {
      enabled: true,
      domain: DOMAIN
    }
  },
  plugins: [testUtils()]
});
