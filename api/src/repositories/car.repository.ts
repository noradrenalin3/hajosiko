import { db } from '#db/db.pool.js';
import { Car, CarUpdate, NewCar } from '#db/db.types.js';

export async function getCars(uid: string) {
	return await db
		.selectFrom('cars')
		.where('owner_id', '=', uid)
		.selectAll()
		.execute();
}

export async function getCarById(uid: string, id: number) {
	console.log(uid, id);
	return await db
		.selectFrom('cars')
		.where('owner_id', '=', uid)
		.where('id', '=', id)
		.selectAll()
		.executeTakeFirstOrThrow();
}

export async function createCar(car: NewCar) {
	return await db
		.insertInto('cars')
		.values(car)
		.returningAll()
		.executeTakeFirstOrThrow();
}

export async function updateCar(
	uid: string,
	id: number,
	updateWith: CarUpdate,
) {
	return await db
		.updateTable('cars')
		.set(updateWith)
		.where('id', '=', id)
		.where('owner_id', '=', uid)
		.returningAll()
		.executeTakeFirstOrThrow();
}
