import crypto from 'crypto';
import { slugify } from '#utils';

export const buildPublicId = (endpoint: string, body: any): string => {
  const unique = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;

  switch (endpoint) {
    case 'books':
      return `${slugify(body.author)}-${slugify(body.title)}-${unique}`;

    case 'clubs':
      return `${slugify(body.name)}-${unique}`;

    default:
      return unique;
  }
};
