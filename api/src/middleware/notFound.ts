import { Request, Response, NextFunction } from 'express';
import { Error } from '#middleware/errorHandler.js';

export function notFound(req: Request, res: Response, next: NextFunction) {
	const err: Error = {
		status: 404,
		message: 'Route not found',
	};
	return next(err);
}
