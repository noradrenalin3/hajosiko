export type Vehicle = {
	owner_id: string;
	id: number;
	make: string;
	model: string;
	year: number;
	kilometers: number;
	record_count: number;
	service_costs: number;
};
export type NewVehicle = Omit<
	Vehicle,
	'owner_id' | 'id' | 'record_count' | 'service_costs'
>;
export type VehicleUpdate = Omit<
	Vehicle,
	'owner_id' | 'id' | 'record_count' | 'service_costs'
>;

export type ServiceRecord = {
	vehicle_id: number;
	id: number;
	description: string;
	notes?: string;
	date: string;
	kilometers: number;
	cost: number;
};
export type NewServiceRecord = Omit<ServiceRecord, 'id'>;
export type ServiceRecordUpdate = Omit<NewServiceRecord, 'vehicle_id'>;

export type TypeOfVehicle = 'car' | 'motorcycle' | 'scooter';

export type MonthsRecords = {
	month: string;
	count: number;
	expenses: number;
};

export type DaysRecords = {
	date: string;
	events: number;
	expenses: number;
};
