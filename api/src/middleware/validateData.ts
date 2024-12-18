import { Request, Response, NextFunction } from 'express';
import { ZodError, AnyZodObject } from 'zod';

export const validateData =
	(validator: AnyZodObject) =>
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			await validator.parseAsync({
				body: req.body,
				query: req.query,
				params: req.params,
			});

			return next();
		} catch (error) {
			console.log(error);
			if (error instanceof ZodError) {
				return res.status(400).json({ message: error.issues[0].message });
			}

			return res.status(500).json('Internal server error');
		}
	};
