import { Request, Response, NextFunction } from 'express';

export interface Error {
	status: number;
	message: string;
}

export function errorHandler(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	console.log('errorHandler', err);
	try {
		const msg = JSON.parse(err.message);
		res.status(err.status).json({ msg });
	} catch (error) {
		res.status(err.status).json({ msg: err.message });
	}
}
