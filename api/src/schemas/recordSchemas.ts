import { z } from 'zod';

export const newRecordSchema = z.object({
	body: z.object({
		description: z.string(),
		notes: z.optional(z.string()),
		date: z.string(),
		kilometers: z.number(),
		cost: z.number(),
	}),
});

export const recordUpdateSchema = newRecordSchema;
