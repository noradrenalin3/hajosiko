import { User } from 'firebase/auth';

export const baseURL = 'http://localhost:3000/api';

export async function request<T, B = undefined>(
	url: RequestInfo,
	opts: {
		method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
		body?: B;
	},
	user: User,
): Promise<T> {
	const token = await user.getIdToken();
	const headers = {
		'Content-Type': 'application/json',
		Authorization: 'Bearer ' + token,
	};
	const init: RequestInit = {
		headers: headers,
		method: opts.method,
	};
	if (opts.body && opts.method !== 'GET') {
		init.body = JSON.stringify(opts.body);
	}
	const response = await fetch(url, init);
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return await response.json();
}
