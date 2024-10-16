import { Request, Response, NextFunction } from 'express';
import { getAuth } from 'firebase-admin/auth';
import firebase from '#firebase/firebase-config.js';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.match(/^[Bb]earer (\S+)/)?.[1];
	if (!token) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	getAuth(firebase)
		.verifyIdToken(token)
		.then((decoded) => {
			if (!decoded.uid || !decoded.email) {
				return res.status(401).json({ message: 'Unauthorized' });
			}

			req.uid = decoded.uid;
			req.email = decoded.email;
			console.log('Decoded user', req.email);
			next();
		})
		.catch((error) => {
			console.error(error);
			res.status(500).json({ message: 'Internal error' });
		});
};

export default verifyToken;
