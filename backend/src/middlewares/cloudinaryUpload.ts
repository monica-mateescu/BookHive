import { v2 as cloudinary } from 'cloudinary';
import type { RequestHandler } from 'express';
import { buildPublicId } from '#utils';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const cloudinaryUpload =
  (folder: string): RequestHandler =>
  async (req, res, next) => {
    if (!req.image) return next();

    try {
      const endpoint = req.baseUrl.split('/').filter(Boolean).pop();
      const publicId = buildPublicId(endpoint!, req.body);

      const result = await cloudinary.uploader.upload(req.image.filepath, {
        resource_type: 'auto',
        folder,
        public_id: publicId
      });

      req.body.image = result.secure_url;

      next();
    } catch (error: unknown) {
      next(new Error(`Cloud upload failed: ${error}`, { cause: { status: 500 } }));
      return;
    }
  };
