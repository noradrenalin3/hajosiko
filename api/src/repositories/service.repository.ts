import { db, pgPool } from '#db/db.pool';
import {
	ServiceRecord,
	ServiceRecordUpdate,
	NewServiceRecord,
} from '#db/db.types';
import { DaysRecords, MonthsRecords } from '@shared/types';
import { DeleteResult, sql } from 'kysely';

export async function get1Month(
	uid: string,
	vehicleId: number,
	year: number,
	month: number,
): Promise<DaysRecords[]> {
	const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
	const query = `
		SELECT
			to_char(days, 'YYYY-MM-DD') AS date,
			count(sr.id) as events,
			coalesce(sum(sr.cost), 0) AS expenses
		FROM generate_series(
			$1::DATE,
			$1::DATE + interval '1 month' - interval '1 day',
			'1 day'
		) days
		LEFT JOIN service_records sr
			ON sr.date = days
			AND sr.vehicle_id = ANY (
				SELECT id AS vehicle_id
				FROM vehicles
				WHERE vehicles.owner_id = $2
				AND vehicles.id = $3
			)
		GROUP BY days
		ORDER BY days;
	`;
	const result = await pgPool.query(query, [startDate, uid, vehicleId]);
	console.log(result.rows);
	return result.rows;
}

export async function get12Months(
	uid: string,
	vehicleId: number,
	year: number,
): Promise<MonthsRecords[]> {
	const startDate = `${year}-01-01`;
	const query = `
		SELECT
			to_char(months, 'YYYY-MM') AS month,
			count(sr.id),
			coalesce(sum(sr.cost), 0) AS expenses
		FROM generate_series(
			$1::DATE,
			$1::DATE + interval '11 month',
			'1 month'
		) months
		LEFT JOIN service_records sr
			ON to_char(sr.date, 'YYYY-MM') = to_char(months, 'YYYY-MM')
			AND sr.vehicle_id = ANY (
				SELECT id AS vehicle_id
				FROM vehicles
				WHERE vehicles.owner_id = $2
				AND vehicles.id = $3
			)
		GROUP BY months
		ORDER BY months;
	`;
	const result = await pgPool.query(query, [startDate, uid, vehicleId]);
	console.log(result.rows);
	return result.rows;
}

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
