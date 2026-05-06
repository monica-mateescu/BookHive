import crypto from 'crypto';
import { slugify } from '#utils';
import { v2 as cloudinary } from 'cloudinary';

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

export const getPublicIdFromUrl = (url: string): string | null => {
  try {
    const parts = url.split('/upload/');
    if (parts.length < 2) return null;

    if (parts.length < 2 || !parts[1]) {
      return null;
    }

    const rightPart = parts[1];

    const pathParts = rightPart.split('/');
    if (pathParts[0]?.startsWith('v')) {
      pathParts.shift();
    }

    const fullPath = pathParts.join('/');

    return fullPath.substring(0, fullPath.lastIndexOf('.'));
  } catch (error) {
    console.error('Error parsing Cloudinary URL:', error);
    return null;
  }
};

export const deleteFromCloudinary = async (url: string | null): Promise<void> => {
  if (!url) return;

  const publicId = getPublicIdFromUrl(url);

  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
  }
};
