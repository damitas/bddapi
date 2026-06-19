import { z } from "zod";

export const PostcodeResponseSchema = z.object({
  country: z.string(),
  "country abbreviation": z.string(),
  "post code": z.string(),
  places: z.array(z.object({
    "place name": z.string(),
    longitude: z.string(),
    latitude: z.string(),
    state: z.string(),
    "state abbreviation": z.string(),
  })).min(1),
});

export type PostcodeResponse = z.infer<typeof PostcodeResponseSchema>;
