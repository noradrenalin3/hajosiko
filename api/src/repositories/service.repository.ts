import { db } from '#db/db.pool';
import {
	ServiceRecord,
	ServiceRecordUpdate,
	NewServiceRecord,
} from '#db/db.types';
import { DeleteResult, sql } from 'kysely';

async function isVehicleOwner(
	ownerId: string,
	vehicleId: number,
): Promise<boolean> {
	const row = await db
		.selectFrom('vehicles')
		.selectAll()
		.where(sql`${sql.ref('id')}`, '=', vehicleId)
		.where(sql`${sql.ref('owner_id')}`, '=', ownerId)
		.executeTakeFirst();
	return row !== null;
}

export async function getRecords(uid: string): Promise<ServiceRecord[]> {
	return await db
		.selectFrom('service_records')
		.selectAll('service_records')
		.innerJoin('vehicles', 'vehicles.id', 'service_records.vehicle_id')
		.where('vehicles.owner_id', '=', uid)
		.execute();
}

export async function getRecordsByVehicle(
	uid: string,
	vehicleId: number,
): Promise<ServiceRecord[]> {
	const direction = 'desc';
	return await db
		.selectFrom('service_records')
		.selectAll('service_records')
		.innerJoin('vehicles', 'vehicles.id', 'service_records.vehicle_id')
		.where('vehicles.owner_id', '=', uid)
		.where('vehicles.id', '=', vehicleId)
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
		.innerJoin('vehicles', 'vehicles.id', 'service_records.vehicle_id')
		.where('vehicles.owner_id', '=', uid)
		.executeTakeFirstOrThrow();
}

export async function createRecord(
	uid: string,
	record: NewServiceRecord,
): Promise<ServiceRecord> {
	const isOwner = await isVehicleOwner(uid, record.vehicle_id);
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
		.from('vehicles')
		.where('service_records.id', '=', id)
		.whereRef('vehicles.id', '=', 'service_records.vehicle_id')
		.where('vehicles.owner_id', '=', uid)
		.returningAll('service_records')
		.executeTakeFirstOrThrow();
}

export async function deleteRecord(
	uid: string,
	id: number,
): Promise<DeleteResult> {
	return await db
		.deleteFrom('service_records')
		.using('vehicles')
		.whereRef('service_records.vehicle_id', '=', 'vehicles.id')
		.where('vehicles.owner_id', '=', uid)
		.where('service_records.id', '=', id)
		.executeTakeFirstOrThrow();
}
