import { Request, Response } from 'express';
import { NewUser } from '#db/db.types.js';
import * as db from '#repositories/user.repository.js';

export const createUser = async (req: Request, res: Response) => {
	const newUser: NewUser = {
		id: req.uid,
		email: req.email,
	};
	const result = await db.createUser(newUser);
	res.status(200).json(result);
};
