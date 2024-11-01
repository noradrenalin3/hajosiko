import { z } from 'zod';

export const newRecordSchema = z.object({
	body: z.object({
		description: z.string().min(2),
		notes: z.string().max(255).optional(),
		date: z.string(),
		kilometers: z.number().min(0).max(10000000),
		cost: z.number().min(0).max(10000000),
	}),
});

export const recordUpdateSchema = z.object({
	body: z.object({
		description: z.string().min(2),
		notes: z.string().max(255).optional(),
		date: z.string(),
		kilometers: z.number().min(0).max(10000000),
		cost: z.number().min(0).max(10000000),
	}),
});
