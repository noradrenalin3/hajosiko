import { db } from '#db/db.pool';
import { Car, CarStats, CarUpdate, NewCar } from '#db/db.types';
import { DeleteResult, sql } from 'kysely';

export async function getCars(uid: string): Promise<CarStats[]> {
	return await db
		.selectFrom('cars')
		.select([
			'cars.id',
			'cars.make',
			'cars.model',
			'cars.year',
			'cars.kilometers',
		])
		.where('owner_id', '=', uid)
		.leftJoin('service_records', 'service_records.car_id', 'cars.id')
		.select((eb) => [
			eb
				.cast<number>(eb.fn.countAll<number>('service_records'), 'integer')
				.as('record_count'),
			eb
				.cast<number>(
					eb.fn.coalesce(
						eb.fn.sum<number | null>('service_records.cost'),
						sql<number>`0`,
					),
					'integer',
				)
				.as('service_costs'),
		])
		.groupBy('cars.id')
		.execute();
}

export async function getCarById(uid: string, id: number): Promise<CarStats> {
	return await db
		.selectFrom('cars')
		.selectAll('cars')
		.where('cars.owner_id', '=', uid)
		.where('cars.id', '=', id)
		.leftJoin('service_records', 'service_records.car_id', 'cars.id')
		.select((eb) => [
			eb
				.cast<number>(eb.fn.countAll<number>('service_records'), 'integer')
				.as('record_count'),
			eb
				.cast<number>(
					eb.fn.coalesce(
						eb.fn.sum<number | null>('service_records.cost'),
						sql<number>`0`,
					),
					'integer',
				)
				.as('service_costs'),
		])
		.groupBy('cars.id')
		.executeTakeFirstOrThrow();
}

export async function createCar(car: NewCar): Promise<Car> {
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
): Promise<Car> {
	return await db
		.updateTable('cars')
		.set(updateWith)
		.where('id', '=', id)
		.where('owner_id', '=', uid)
		.returningAll()
		.executeTakeFirstOrThrow();
}

export async function deleteCar(
	uid: string,
	id: number,
): Promise<DeleteResult> {
	return await db
		.deleteFrom('cars')
		.where('id', '=', id)
		.where('owner_id', '=', uid)
		.executeTakeFirst();
}
