import { Car, CarUpdate, NewCar } from '~/types/car.types';
import { ServiceRecord, NewServiceRecord } from '~/types/record.types';
import { User } from 'firebase/auth';
import sortRecords from '~/api/sortRecords';

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

export async function getCar(user: User, carId: number): Promise<Car> {
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

export async function updateCar(
	user: User,
	id: number,
	car: CarUpdate,
): Promise<Car> {
	const token = await user.getIdToken();

	const response = await fetch(`${baseUrl}/cars/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(car),
	});
	if (!response.ok) {
		throw new Error('Error adding car');
	}
	const result: Car = await response.json();
	return result;
}

export async function getServiceRecords(
	user: User,
	carId?: number,
): Promise<ServiceRecord[]> {
	const token = await user.getIdToken();
	console.log(token);

	const getUrl = () => {
		if (carId) {
			const params = new URLSearchParams({
				car: carId.toString(),
			}).toString();
			return `${baseUrl}/records?${params}`;
		} else {
			return `${baseUrl}/records`;
		}
	};

	const response = await fetch(getUrl(), {
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
	if (!carId) {
		console.log('all records:', records);
	} else {
		console.log('car-' + carId, 'records:', records);
	}
	if (records.length < 2) {
		return records;
	}
	return sortRecords(records);
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
