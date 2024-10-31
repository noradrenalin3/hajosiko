import { z } from 'zod';

export const newCarSchema = z.object({
	body: z.object({
		make: z.string().min(1).max(48),
		model: z.string().min(1).max(48),
		year: z.number().min(1800).max(2099),
		kilometers: z
			.number()
			.min(0, 'Please enter a valid value')
			.max(10000000, 'Please enter a valid value'),
	}),
});

export const carUpdateSchema = newCarSchema;
