import { Request, Response, NextFunction } from 'express';
import {
	NewServiceRecord,
	ServiceRecord,
	ServiceRecordUpdate,
} from '#db/db.types.js';
import * as db from '#repositories/service.repository.js';

export const getRecords = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;

	if (req.query.car) {
		const carId = Number(req.query.car);
		const result = await db.getRecordsByCar(uid, carId);
		res.status(200).json(result);
	} else {
		const result = await db.getRecords(uid);
		res.status(200).json(result);
	}
};

export const getRecordById = async (req: Request, res: Response) => {
	const uid = req.uid;
	const carId = Number(req.params.id);
	const result = await db.getRecordById(uid, carId);
	res.status(200).json(result);
};

export const createRecord = async (req: Request, res: Response) => {
	const uid = req.uid;
	const { car_id, description, notes, date, kilometers, cost } = req.body;
	const newRecord: NewServiceRecord = {
		car_id: car_id,
		description: description,
		notes: notes,
		date: date,
		kilometers: kilometers,
		cost: cost,
	};
	const result = await db.createRecord(uid, newRecord);
	res.status(200).json(result);
};

export const updateRecord = async (req: Request, res: Response) => {
	const uid = req.uid;
	const { description, notes, date, kilometers, cost } = req.body;
	const carId = Number(req.params.id);
	const updatedRecord: ServiceRecordUpdate = {
		description: description,
		notes: notes,
		date: date,
		kilometers: kilometers,
		cost: cost,
	};
	const result = await db.updateRecord(uid, carId, updatedRecord);
	res.status(200).json(result);
};
