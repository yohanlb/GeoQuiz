import { z } from 'zod';

export type CountryForVideo = z.infer<typeof countrySchema>;

export const countrySchema = z.object({
  name: z.string(),
  iso2: z.string(),
});

export const videoPropsSchema = z.object({
  countries: z.array(countrySchema),
  difficultyPercent: z.number().min(0).max(100),
});
