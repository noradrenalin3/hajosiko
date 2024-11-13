import { Request, Response, NextFunction } from 'express';
import { NewServiceRecord, ServiceRecordUpdate } from '#db/db.types';
import * as db from '#repositories/service.repository';
import { DeleteResult } from 'kysely';
import { summaryQuerySchema } from '#schemas/querySchema';
import { ZodError } from 'zod';

export const getRecords = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;
	const q = req.query;

	if (!q.vehicle && !q.summary) {
		const result = await db.getRecords(uid);
		return res.status(200).json(result);
	}

	const vehicleId = Number(req.query.vehicle);

	if (q.vehicle && !q.summary) {
		const result = await db.getRecordsByVehicle(uid, vehicleId);
		return res.status(200).json(result);
	}

	const result = await db.get12MonthsRecords(uid, vehicleId);
	return res.status(200).json(result);
};

export const getRecordsSummary = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const uid = req.uid;
		const q = await summaryQuerySchema.parseAsync(req.query);
		if (!q.month) {
			const result = await db.get12Months(uid, q.vehicle, q.year);
			return res.status(200).json(result);
		}
		const result = await db.get1Month(uid, q.vehicle, q.year, q.month);
		return res.status(200).json(result);
	} catch (err) {
		let message = 'Query format error';
		if (err instanceof ZodError) {
			message = `Validation failed: ${err.issues.length} errors detected in query params`;
		}
		return next({ status: 400, message: message });
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
