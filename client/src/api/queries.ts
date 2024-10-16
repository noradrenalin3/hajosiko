import { Car, NewCar } from '~/types/car.types';
import { ServiceRecord, NewServiceRecord } from '~/types/record.types';
import { User } from 'firebase/auth';

const baseUrl = 'http://localhost:3000/api';

export async function getCars(user: User): Promise<Car[]> {
	const token = await user.getIdToken();
	const response = await fetch(baseUrl + '/cars', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});
	if (!response.ok) {
		throw new Error('Error fetching cars');
	}
	const cars: Car[] = await response.json();
	return cars;
}

export async function getCar(user: User, carId: string): Promise<Car> {
	const token = await user.getIdToken();
	const response = await fetch(baseUrl + '/cars/' + carId, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});
	if (!response.ok) {
		throw new Error('Error fetching cars');
	}
	const car: Car = await response.json();
	console.log(car);
	return car;
}

export async function createCar(user: User, newCar: NewCar): Promise<Car> {
	const token = await user.getIdToken();
	const response = await fetch(baseUrl + '/cars', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(newCar),
	});
	if (!response.ok) {
		throw new Error('Error adding car');
	}
	const car: Car = await response.json();
	return car;
}

export async function getServiceRecords(
	user: User,
	carId?: string,
): Promise<ServiceRecord[]> {
	const token = await user.getIdToken();
	console.log(token);

	const params = new URLSearchParams({
		car: carId || '',
	}).toString();

	const url = carId ? `${baseUrl}/records?${params}` : `${baseUrl}/records`;
	console.log(url);

	const response = await fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});

	if (!response.ok) {
		throw new Error('Error fetching ');
	}
	const records: ServiceRecord[] = await response.json();
	console.log(records);
	return records;
}

export async function createServiceRecord(
	user: User,
	record: NewServiceRecord,
): Promise<ServiceRecord> {
	console.log(record);
	const token = await user.getIdToken();
	const url = `${baseUrl}/records`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(record),
	});
	if (!response.ok) {
		console.log(response.status);
		throw new Error('Error fetching ');
	}
	const result: ServiceRecord = await response.json();
	return result;
}
