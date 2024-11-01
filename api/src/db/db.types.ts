import {
	ColumnType,
	Generated,
	Insertable,
	Selectable,
	Updateable,
} from 'kysely';

export interface Database {
	users: Users;
	cars: Cars;
	service_records: ServiceRecords;
}

export interface Users {
	id: string;
	email: string;
}

export interface Cars {
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
	car_id: ColumnType<number, number, never>;
	description: string;
	notes?: string;
	date: ColumnType<Date, Date, string>;
	kilometers: number;
	cost: number;
}

export interface OdometerRecords {
	id: Generated<number>;
	car_id: ColumnType<number, number, never>;
	kilometers: number;
	date: ColumnType<Date, string, string>;
	//unit?
}

export interface ScheduledMaintenance {}

export interface UsersScheduled {}

export type User = Selectable<Users>;
export type NewUser = Insertable<Users>;
export type UserUpdate = Updateable<Users>;

export type Car = Selectable<Cars>;
export type NewCar = Insertable<Cars>;
export type CarUpdate = Updateable<Cars>;

export type ServiceRecord = Selectable<ServiceRecords>;
export type NewServiceRecord = Insertable<ServiceRecords>;
export type ServiceRecordUpdate = Updateable<ServiceRecords>;

export interface CarStats extends Omit<Car, 'owner_id'> {
	record_count: number;
	service_costs: number; //maintenance_costs ?
}
