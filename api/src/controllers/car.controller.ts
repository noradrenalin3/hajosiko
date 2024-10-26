import { NextFunction, Request, Response } from 'express';
import { NewCar, CarUpdate } from '#db/db.types.js';
import * as db from '#repositories/car.repository.js';

export const getCars = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;
	const result = await db.getCars(uid).catch(next);
	res.status(200).json(result);
};

export const getCarById = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;
	const carId = Number(req.params.id);
	const result = await db.getCarById(uid, carId).catch(next);
	res.status(200).json(result);
};

export const createCar = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;
	const { make, model, year, kilometers } = req.body;
	const newCar: NewCar = {
		owner_id: uid,
		make: make,
		model: model,
		year: year,
		kilometers: kilometers,
	};
	const result = await db.createCar(newCar).catch(next);
	res.status(200).json(result);
};

export const updateCar = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;
	const { make, model, year, kilometers } = req.body;
	const carId = Number(req.params.id);
	const updatedCar: CarUpdate = {
		make: make,
		model: model,
		year: year,
		kilometers: kilometers,
	};
	const result = await db.updateCar(uid, carId, updatedCar).catch(next);
	res.status(200).json(result);
};

export const deleteCar = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const uid = req.uid;
	const carId = Number(req.params.id);
	const result = await db.deleteCar(uid, carId);

	res.status(200).json(Number(result.numDeletedRows));
};
