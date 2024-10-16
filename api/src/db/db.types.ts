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
	owner_id: string;
	id: Generated<number>;
	make: string;
	model: string;
	year: number;
	kilometers: number;
}

export interface ServiceRecords {
	car_id: ColumnType<number, number, never>;
	id: Generated<number>;
	description: string;
	notes: string;
	date: ColumnType<string, string, string>;
	kilometers: number;
	cost: number;
}

export type User = Selectable<Users>;
export type NewUser = Insertable<Users>;
export type UserUpdate = Updateable<Users>;

export type Car = Selectable<Cars>;
export type NewCar = Insertable<Cars>;
export type CarUpdate = Updateable<Cars>;

export type ServiceRecord = Selectable<ServiceRecords>;
export type NewServiceRecord = Insertable<ServiceRecords>;
export type ServiceRecordUpdate = Updateable<ServiceRecords>;
