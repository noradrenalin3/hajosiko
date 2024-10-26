export type Car = {
	owner_id: string;
	id: number;
	make: string;
	model: string;
	year: number;
	kilometers: number;
	record_count: number;
	service_costs: number;
};

export type NewCar = Omit<Car, 'owner_id' | 'id' | 'record_count' | 'service_costs'>;

export type CarUpdate = Omit<Car, 'owner_id' | 'id' | 'record_count' | 'service_costs'>;
