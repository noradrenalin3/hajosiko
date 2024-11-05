import type {
	Vehicle,
	VehicleUpdate,
	NewVehicle,
	ServiceRecord,
	NewServiceRecord,
	ServiceRecordUpdate,
} from '@shared/types';
import { User } from 'firebase/auth';

const baseUrl = 'http://localhost:3000/api';

export async function getVehicles(user: User): Promise<Vehicle[]> {
	const token = await user.getIdToken();
	const response = await fetch(baseUrl + '/vehicles', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});
	if (!response.ok) {
		throw new Error('Error fetching vehicles');
	}
	const vehicles: Vehicle[] = await response.json();
	console.log(vehicles);
	return vehicles;
}

export async function getVehicle(
	user: User,
	vehicleId: number,
): Promise<Vehicle> {
	const token = await user.getIdToken();
	const response = await fetch(baseUrl + '/vehicles/' + vehicleId, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});
	if (!response.ok) {
		throw new Error('Error fetching vehicles');
	}
	const vehicle: Vehicle = await response.json();
	console.log(vehicle);
	return vehicle;
}

export async function createVehicle(
	user: User,
	newVehicle: NewVehicle,
): Promise<Vehicle> {
	const token = await user.getIdToken();
	const response = await fetch(baseUrl + '/vehicles', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(newVehicle),
	});
	if (!response.ok) {
		throw new Error('Error adding vehicle');
	}
	const vehicle: Vehicle = await response.json();
	return vehicle;
}

export async function updateVehicle(
	user: User,
	id: number,
	vehicle: VehicleUpdate,
): Promise<Vehicle> {
	const token = await user.getIdToken();

	const response = await fetch(`${baseUrl}/vehicles/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(vehicle),
	});
	if (!response.ok) {
		throw new Error('Error adding vehicle');
	}
	const result: Vehicle = await response.json();
	return result;
}
export async function deleteVehicle(user: User, id: number): Promise<Vehicle> {
	const token = await user.getIdToken();

	const response = await fetch(`${baseUrl}/vehicles/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});
	if (!response.ok) {
		throw new Error('Error deleting vehicle');
	}
	const result: Vehicle = await response.json();
	return result;
}

export async function getServiceRecords(
	user: User,
	vehicleId?: number,
): Promise<ServiceRecord[]> {
	const token = await user.getIdToken();
	console.log(token);

	const getUrl = () => {
		if (vehicleId) {
			const params = new URLSearchParams({
				vehicle: vehicleId.toString(),
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
	if (!vehicleId) {
		console.log('all records:', records);
	} else {
		console.log('vehicle-' + vehicleId, 'records:', records);
	}
	if (records.length < 2) {
		return records;
	}
	return records;
}

export async function getRecord(
	user: User,
	id: number,
): Promise<ServiceRecord> {
	const token = await user.getIdToken();
	console.log(token);

	const response = await fetch(`${baseUrl}/records/${id}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});

	if (!response.ok) {
		throw new Error('Error fetching ');
	}
	const record: ServiceRecord = await response.json();
	return record;
}

export async function createServiceRecord(
	user: User,
	record: NewServiceRecord,
): Promise<ServiceRecord> {
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
		throw new Error('Error creating record');
	}
	const result: ServiceRecord = await response.json();
	return result;
}

export async function deleteRecord(user: User, id: number): Promise<unknown> {
	const token = await user.getIdToken();

	const response = await fetch(`${baseUrl}/records/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
	});
	if (!response.ok) {
		throw new Error('Error deleting record');
	}
	const result: unknown = await response.json();
	console.log(result);
	return result;
}

export async function updateRecord(
	user: User,
	id: number,
	record: ServiceRecordUpdate,
): Promise<ServiceRecord> {
	const token = await user.getIdToken();

	const response = await fetch(`${baseUrl}/records/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token,
		},
		body: JSON.stringify(record),
	});
	if (!response.ok) {
		throw new Error('Error updating record');
	}
	const result: ServiceRecord = await response.json();
	return result;
}
