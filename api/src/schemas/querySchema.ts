import { z } from 'zod';

export const summaryQuerySchema = z.object({
	vehicle: z.coerce.number().min(1),
	year: z.coerce.number().min(2000).max(2050),
	month: z.coerce.number().min(1).max(12).optional(),
});
