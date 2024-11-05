import '#polyfills';
import express from 'express';
import cors from 'cors';
import vehicleRouter from '#routes/vehicle.router';
import userRouter from '#routes/user.router';
import serviceRouter from '#routes/service.router';
import verifyToken from '#middleware/verifyToken';
import { notFound } from '#middleware/notFound';
import { errorHandler } from '#middleware/errorHandler';
//import { insertRecords } from '#tests/record.test';
//import createTables from '#db/db.init';

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

app.use('/api/vehicles', verifyToken, vehicleRouter);
app.use('/api/users', verifyToken, userRouter);
app.use('/api/records', verifyToken, serviceRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	//createTables();
	console.log('Server running on port', PORT);
});
