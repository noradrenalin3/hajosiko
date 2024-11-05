import { db } from '#db/db.pool';
import { Vehicle, VehicleUpdate, NewVehicle } from '#db/db.types';
import { DeleteResult, sql } from 'kysely';
import { Vehicle as VehicleStats } from '@shared/types';

export async function getVehicles(uid: string): Promise<VehicleStats[]> {
	return await db
		.selectFrom('vehicles')
		.selectAll('vehicles')
		.where('owner_id', '=', uid)
		.leftJoin('service_records', 'service_records.vehicle_id', 'vehicles.id')
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
		.groupBy('vehicles.id')
		.execute();
}

export async function getVehicleById(
	uid: string,
	id: number,
): Promise<VehicleStats> {
	return await db
		.selectFrom('vehicles')
		.selectAll('vehicles')
		.where('vehicles.owner_id', '=', uid)
		.where('vehicles.id', '=', id)
		.leftJoin('service_records', 'service_records.vehicle_id', 'vehicles.id')
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
		.groupBy('vehicles.id')
		.executeTakeFirstOrThrow();
}

export async function createVehicle(vehicle: NewVehicle): Promise<Vehicle> {
	return await db
		.insertInto('vehicles')
		.values(vehicle)
		.returningAll()
		.executeTakeFirstOrThrow();
}

export async function updateVehicle(
	uid: string,
	id: number,
	updateWith: VehicleUpdate,
): Promise<Vehicle> {
	return await db
		.updateTable('vehicles')
		.set(updateWith)
		.where('id', '=', id)
		.where('owner_id', '=', uid)
		.returningAll()
		.executeTakeFirstOrThrow();
}

export async function deleteVehicle(
	uid: string,
	id: number,
): Promise<DeleteResult> {
	return await db
		.deleteFrom('vehicles')
		.where('id', '=', id)
		.where('owner_id', '=', uid)
		.executeTakeFirst();
}
