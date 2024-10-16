import express from 'express';
import cors from 'cors';
import carRouter from '#routes/car.router.js';
import userRouter from '#routes/user.router.js';
import serviceRouter from '#routes/service.router.js';
import verifyToken from '#middleware/verifyToken.js';
import createTables from '#db/db.init.js';

declare global {
	namespace Express {
		interface Request {
			uid: string;
			email: string;
		}
	}
}

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/api/cars', verifyToken, carRouter);
app.use('/api/users', verifyToken, userRouter);
app.use('/api/records', verifyToken, serviceRouter);

app.listen(PORT, () => {
	//createTables();
	console.log('Server running on port', PORT);
});
