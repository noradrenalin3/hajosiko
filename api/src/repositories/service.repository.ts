import { db } from '#db/db.pool.js';
import {
	ServiceRecord,
	ServiceRecordUpdate,
	NewServiceRecord,
} from '#db/db.types.js';

export async function getRecords(uid: string): Promise<ServiceRecord[]> {
	return await db
		.selectFrom('service_records')
		.selectAll('service_records')
		.innerJoin('cars', 'cars.id', 'service_records.car_id')
		.where('cars.owner_id', '=', uid)
		.execute();
}

export async function getRecordsByCar(uid: string, carId: number) {
	return await db
		.selectFrom('service_records')
		.selectAll('service_records')
		.innerJoin('cars', 'cars.id', 'service_records.car_id')
		.where('cars.owner_id', '=', uid)
		.where('cars.id', '=', carId)
		.execute();
}

export async function getRecordById(uid: string, id: number) {
	return await db
		.selectFrom('service_records')
		.where('id', '=', id)
		.executeTakeFirstOrThrow();
}

export async function createRecord(uid: string, record: NewServiceRecord) {
	return await db
		.insertInto('service_records')
		.values(record)
		.returningAll()
		.executeTakeFirstOrThrow();
}

export async function updateRecord(
	uid: string,
	id: number,
	updateWith: ServiceRecordUpdate,
) {
	return await db
		.updateTable('service_records')
		.innerJoin('cars', (join) => join.on('cars.owner_id', '=', uid))
		.set(updateWith)
		.where('id', '=', id)
		.executeTakeFirstOrThrow();
}

export async function deleteRecord(uid: string, id: number) {
	return await db
		.deleteFrom('service_records')
		.innerJoin('cars', 'cars.id', 'service_records.car_id')
		.where('cars.owner_id', '=', uid)
		.where('service_records.id', '=', id)
		.execute();
}
