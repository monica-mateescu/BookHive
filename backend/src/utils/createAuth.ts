import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import type { Db, MongoClient } from 'mongodb';
import type { BetterAuthPlugin } from 'better-auth';
import { createAuthMiddleware } from 'better-auth/api';
import { APIError } from 'better-auth/api';

type CreateAuthOptions = {
  db: Db;
  client: MongoClient;
  baseURL: string;
  trustedOrigins?: string[];
  secret: string;
  domain?: string;
  isProduction?: boolean;
};

export const createAuth = <P extends BetterAuthPlugin[] = []>({
  db,
  client,
  baseURL,
  trustedOrigins,
  secret,
  domain,
  isProduction,
  plugins = [] as unknown as P
}: CreateAuthOptions & { plugins?: P }) =>
  betterAuth({
    database: mongodbAdapter(db, { client }),
    secret,
    baseURL,
    trustedOrigins,
    emailAndPassword: { enabled: true, minPasswordLength: 8, maxPasswordLength: 128 },

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
          defaultValue: ['user']
        },
        deletedAt: {
          type: 'date',
          input: false,
          defaultValue: null
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
    hooks: {
      before: createAuthMiddleware(async context => {
        if (context.path !== '/sign-in/email') {
          return;
        }

        const email = context.body?.email;

        if (typeof email !== 'string' || !email.trim()) {
          return;
        }

        const user = await db
          .collection('user')
          .findOne({ email: email.toLowerCase() }, { projection: { deletedAt: 1 } });

        if (user?.deletedAt) {
          throw APIError.from('FORBIDDEN', {
            message: 'Your account is deactivated. Please contact an administrator.',
            code: 'ACCOUNT_DELETED'
          });
        }
      })
    },
    plugins
  });
