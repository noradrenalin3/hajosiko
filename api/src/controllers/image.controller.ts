import { getStorage } from 'firebase-admin/storage';
import firebase from '#firebase/firebase-config.js';

export async function deleteImage(uid: string, carId: number) {
	try {
		const bucket = getStorage(firebase).bucket();
		const result = await bucket.deleteFiles({
			prefix: `images/${uid}/car-${carId}`,
		});
		return result;
	} catch (err) {
		throw err;
	}
}
