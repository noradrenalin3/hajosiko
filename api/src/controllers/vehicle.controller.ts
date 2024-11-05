import { NextFunction, Request, Response } from 'express';
import { NewVehicle, VehicleUpdate } from '#db/db.types';
import { Vehicle as VehicleStats } from '@shared/types';
import * as db from '#repositories/vehicle.repository';
import { deleteImage } from '#controllers/image.controller';

export const getVehicles = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;
	const result: VehicleStats[] = await db.getVehicles(uid);
	res.status(200).json(result);
};

export const getVehicleById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;
	const vehicleId = Number(req.params.id);
	const result: VehicleStats = await db.getVehicleById(uid, vehicleId);
	res.status(200).json(result);
};

export const createVehicle = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;
	const { make, model, year, kilometers } = req.body;
	const newVehicle: NewVehicle = {
		owner_id: uid,
		make: make,
		model: model,
		year: year,
		kilometers: kilometers,
	};
	const result = await db.createVehicle(newVehicle).catch(next);
	res.status(200).json(result);
};

export const updateVehicle = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;
	const { make, model, year, kilometers } = req.body;
	const vehicleId = Number(req.params.id);
	const updatedVehicle: VehicleUpdate = {
		make: make,
		model: model,
		year: year,
		kilometers: kilometers,
	};
	const result = await db
		.updateVehicle(uid, vehicleId, updatedVehicle)
		.catch(next);
	console.log(result);
	res.status(200).json(result);
};

export const deleteVehicle = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;
	const vehicleId = Number(req.params.id);
	const result = await db.deleteVehicle(uid, vehicleId);
	const rows = Number(result.numDeletedRows);
	if (rows < 1) {
		return res.status(404).json(rows);
	}

	await deleteImage(uid, vehicleId).catch(next);
	return res.status(200).json(rows);
};
