import { z } from 'zod';

export const newCarSchema = z.object({
	body: z.object({
		make: z.string(),
		model: z.string(),
		year: z.number(),
		kilometers: z.number(),
	}),
});
export type ValidNewCar = z.infer<typeof newCarSchema>;

export const carUpdateSchema = newCarSchema;
