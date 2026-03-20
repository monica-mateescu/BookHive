import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { MONGO_URI, DB_NAME, CLIENT_BASE_URL, BETTER_AUTH_SECRET, DOMAIN } from '#config';

const client = new MongoClient(MONGO_URI);
const db = client.db(DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  secret: BETTER_AUTH_SECRET,
  emailAndPassword: { enabled: true },
  baseURL: CLIENT_BASE_URL,
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
  }
});
