import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth';
import firebase from '#firebase/firebase-config';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.match(/^[Bb]earer (\S+)/)?.[1];
	if (!token) {
		res.status(401).json({ message: 'Unauthorized' });
		return;
	}

	getAuth(firebase)
		.verifyIdToken(token)
		.then((decoded) => {
			if (!decoded.uid || !decoded.email) {
				return res.status(401).json({ message: 'Unauthorized' });
			}

			req.uid = decoded.uid;
			req.email = decoded.email;
			console.log('Request from user', req.email);
			return next();
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ message: 'Internal error' });
		});
};

export default verifyToken;
