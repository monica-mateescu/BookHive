import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import type { Db, MongoClient } from 'mongodb';
import type { UserRole } from '#types';

type CreateAuthOptions = {
  db: Db;
  client: MongoClient;
  baseURL: string;
  secret: string;
  domain?: string;
  isProduction?: boolean;
  plugins?: any[];
};

export const createAuth = ({ db, client, baseURL, secret, domain, isProduction, plugins = [] }: CreateAuthOptions) =>
  betterAuth({
    database: mongodbAdapter(db, { client }),
    secret,
    baseURL: baseURL,
    trustedProxies: [baseURL],
    emailAndPassword: { enabled: true },

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
      additionalFields: {
        lastName: {
          type: 'string',
          defaultValue: ''
        },
        role: {
          type: 'string[]',
          input: false,
          defaultValue: ['user'] as UserRole[]
        }
      }
    },
    advanced: {
      defaultCookieAttributes: {
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction
      },
      crossSubDomainCookies: {
        enabled: true,
        domain
      }
    },
    plugins
  });
