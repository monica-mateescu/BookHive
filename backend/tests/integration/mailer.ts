import type { Mailer } from '../../src/types';

export const mailer = (): Mailer & {
  sent: any[];
  clear: () => void;
} => {
  const sent: any[] = [];

  return {
    sent,

    sendEmail: async email => {
      sent.push(email);
    },

    clear: () => {
      sent.length = 0;
    }
  };
};
