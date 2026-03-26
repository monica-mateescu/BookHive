import { v2 as cloudinary } from 'cloudinary';
import type { RequestHandler } from 'express';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const slugify = (str: string) =>
  str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');

export const cloudinaryUpload =
  (folder: string): RequestHandler =>
  async (req, res, next) => {
    if (!req.image) {
      return next();
    }

    try {
      const publicId = `${slugify(req.body.author)}-${slugify(req.body.title)}`;

      const imagePath = req.image.filepath;
      const result = await cloudinary.uploader.upload(imagePath, {
        resource_type: 'auto',
        folder,
        public_id: publicId
      });

      req.body.image = result.secure_url;
      next();
    } catch (error: unknown) {
      return next(new Error(`Cloud upload failed: ${error}`, { cause: { status: 500 } }));
    }
  };
