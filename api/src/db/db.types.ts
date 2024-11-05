import {
	ColumnType,
	Generated,
	Insertable,
	Selectable,
	Updateable,
} from 'kysely';

export interface Database {
	users: Users;
	vehicles: Vehicles;
	service_records: ServiceRecords;
}

export interface Users {
	id: string;
	email: string;
}

export interface Vehicles {
	id: Generated<number>;
	owner_id: ColumnType<string, string, never>;
	make: string;
	model: string;
	year: number;
	kilometers: number;
	//notes?: string;
}

export interface ServiceRecords {
	id: Generated<number>;
	vehicle_id: ColumnType<number, number, never>;
	description: string;
	notes?: string;
	date: ColumnType<Date, Date, string>;
	kilometers: number;
	cost: number;
}

export interface OdometerRecords {
	id: Generated<number>;
	vehicle_id: ColumnType<number, number, never>;
	kilometers: number;
	date: ColumnType<Date, string, string>;
	//unit?
}

export interface ScheduledMaintenance {}

export interface UsersScheduled {}

export type User = Selectable<Users>;
export type NewUser = Insertable<Users>;
export type UserUpdate = Updateable<Users>;

export type Vehicle = Selectable<Vehicles>;
export type NewVehicle = Insertable<Vehicles>;
export type VehicleUpdate = Updateable<Vehicles>;

export type ServiceRecord = Selectable<ServiceRecords>;
export type NewServiceRecord = Insertable<ServiceRecords>;
export type ServiceRecordUpdate = Updateable<ServiceRecords>;

export interface VehicleStats extends Omit<Vehicle, 'owner_id'> {
	record_count: number;
	service_costs: number; //maintenance_costs ?
}
