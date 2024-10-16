export type ServiceRecord = {
	car_id: number;
	id: number;
	description: string;
	notes: string;
	date: string;
	kilometers: number;
	cost: number;
};
export type NewServiceRecord = Omit<ServiceRecord, 'id'>;
