import slugify from 'slugify';
import type { Model } from 'mongoose';

const MAX_ATTEMPTS = 10;

type GenerateSlugOptions = {
  model: Model<any>;
  sourceValue: string;
  excludeId: string;
};

export async function generateSlug({ model, sourceValue, excludeId }: GenerateSlugOptions): Promise<string> {
  const base = slugify(sourceValue, { lower: true, strict: true, trim: true, locale: 'en' });
  let slug = base;
  let counter = 2;

  while (await model.exists({ slug, _id: { $ne: excludeId } })) {
    if (counter > MAX_ATTEMPTS) throw new Error(`Cannot generate unique slug for "${base}"`);
    slug = `${base}-${counter++}`;
  }

  return slug;
}
