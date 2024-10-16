export type Car = {
	id: number;
	make: string;
	model: string;
	year: number;
	kilometers: number;
};

export type NewCar = Omit<Car, 'id'>;
