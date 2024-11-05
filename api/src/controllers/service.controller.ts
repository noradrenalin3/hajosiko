import { Request, Response, NextFunction } from 'express';
import { NewServiceRecord, ServiceRecordUpdate } from '#db/db.types';
import * as db from '#repositories/service.repository';
import { DeleteResult } from 'kysely';

export const getRecords = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;

	if (req.query.vehicle) {
		const vehicleId = Number(req.query.vehicle);
		const result = await db.getRecordsByVehicle(uid, vehicleId);
		res.status(200).json(result);
	} else {
		const result = await db.getRecords(uid);
		res.status(200).json(result);
	}
};

export const getRecordById = async (req: Request, res: Response) => {
	const uid = req.uid;
	const vehicleId = Number(req.params.id);
	const result = await db.getRecordById(uid, vehicleId);
	res.status(200).json(result);
};

export const createRecord = async (req: Request, res: Response) => {
	const uid = req.uid;
	const { vehicle_id, description, notes, date, kilometers, cost } = req.body;
	const newRecord: NewServiceRecord = {
		vehicle_id: vehicle_id,
		description: description,
		notes: notes,
		date: date,
		kilometers: kilometers,
		cost: cost,
	};
	const result = await db.createRecord(uid, newRecord);
	res.status(200).json(result);
};

export const updateRecord = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;
	const { description, notes, date, kilometers, cost } = req.body;
	const recordId = Number(req.params.id);
	const updatedRecord: ServiceRecordUpdate = {
		description: description,
		notes: notes,
		date: date,
		kilometers: kilometers,
		cost: cost,
	};
	const result = await db
		.updateRecord(uid, recordId, updatedRecord)
		.catch(next);
	res.status(200).json(result);
};

export const deleteRecord = async (req: Request, res: Response) => {
	const uid = req.uid;
	const recordId = Number(req.params.id);
	const result: DeleteResult = await db.deleteRecord(uid, recordId);
	res.status(200).json(result);
};
