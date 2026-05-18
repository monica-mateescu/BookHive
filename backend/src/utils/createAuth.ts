import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import type { Db, MongoClient } from 'mongodb';
import type { BetterAuthPlugin } from 'better-auth';
import { createAuthMiddleware } from 'better-auth/api';
import { APIError } from 'better-auth/api';
import type { Mailer } from '#types';

type CreateAuthOptions = {
  db: Db;
  client: MongoClient;
  baseURL: string;
  trustedOrigins?: string[];
  secret: string;
  isProduction: boolean;
  mailer: Mailer;
};

export const createAuth = <P extends BetterAuthPlugin[] = []>({
  db,
  client,
  baseURL,
  trustedOrigins,
  secret,
  isProduction,
  mailer,
  plugins = [] as unknown as P
}: CreateAuthOptions & { plugins?: P }) =>
  betterAuth({
    database: mongodbAdapter(db, { client }),
    secret,
    baseURL,
    trustedOrigins,
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
          defaultValue: ['user']
        },
        deletedAt: {
          type: 'date',
          input: false,
          defaultValue: null
        }
      },
      changeEmail: {
        enabled: true,
        sendChangeEmailConfirmation: async ({ user, newEmail, url }) => {
          console.log(`Verification URL for ${user.email}: ${url}`);
          mailer.sendEmail({
            to: user.email,
            subject: 'Approve email change',
            html: `Click to approve the change to ${newEmail}:  <a href=${url} target='_blank'>Approve</a>`
          });
        }
      }
    },
    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        mailer.sendEmail({
          to: user.email,
          subject: 'Verify your email address',
          html: `Click to verify your email: <a href=${url} target='_blank'>Verify</a>`
        });
      }
    },
    advanced: {
      defaultCookieAttributes: {
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction
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
            message: 'This account has been deleted.',
            code: 'ACCOUNT_DELETED'
          });
        }
      })
    },
    plugins
  });
