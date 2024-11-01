import { db } from '#db/db.pool';
import {
	ServiceRecord,
	ServiceRecordUpdate,
	NewServiceRecord,
} from '#db/db.types';
import { DeleteResult, sql } from 'kysely';

async function isCarOwner(ownerId: string, carId: number): Promise<boolean> {
	const row = await db
		.selectFrom('cars')
		.selectAll()
		.where(sql`${sql.ref('id')}`, '=', carId)
		.where(sql`${sql.ref('owner_id')}`, '=', ownerId)
		.executeTakeFirst();
	return row !== null;
}

export async function getRecords(uid: string): Promise<ServiceRecord[]> {
	return await db
		.selectFrom('service_records')
		.selectAll('service_records')
		.innerJoin('cars', 'cars.id', 'service_records.car_id')
		.where('cars.owner_id', '=', uid)
		.execute();
}

export async function getRecordsByCar(
	uid: string,
	carId: number,
): Promise<ServiceRecord[]> {
	const direction = 'desc';
	return await db
		.selectFrom('service_records')
		.selectAll('service_records')
		.innerJoin('cars', 'cars.id', 'service_records.car_id')
		.where('cars.owner_id', '=', uid)
		.where('cars.id', '=', carId)
		.orderBy('service_records.date', direction)
		.execute();
}

export async function getRecordById(
	uid: string,
	id: number,
): Promise<ServiceRecord> {
	return await db
		.selectFrom('service_records')
		.selectAll('service_records')
		.where('service_records.id', '=', id)
		.innerJoin('cars', 'cars.id', 'service_records.car_id')
		.where('cars.owner_id', '=', uid)
		.executeTakeFirstOrThrow();
}

export async function createRecord(
	uid: string,
	record: NewServiceRecord,
): Promise<ServiceRecord> {
	const isOwner = await isCarOwner(uid, record.car_id);
	if (!isOwner) {
		throw new Error('Unauthorized');
	}
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
): Promise<ServiceRecord> {
	return await db
		.updateTable('service_records')
		.set(updateWith)
		.from('cars')
		.where('service_records.id', '=', id)
		.whereRef('cars.id', '=', 'service_records.car_id')
		.where('cars.owner_id', '=', uid)
		.returningAll('service_records')
		.executeTakeFirstOrThrow();
}

export async function deleteRecord(
	uid: string,
	id: number,
): Promise<DeleteResult> {
	return await db
		.deleteFrom('service_records')
		.using('cars')
		.whereRef('service_records.car_id', '=', 'cars.id')
		.where('cars.owner_id', '=', uid)
		.where('service_records.id', '=', id)
		.executeTakeFirstOrThrow();
}
