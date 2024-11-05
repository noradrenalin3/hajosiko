import {
	getDownloadURL,
	getMetadata,
	ref as storageRef,
	updateMetadata,
	uploadBytes,
} from 'firebase/storage';
import { SetStateAction, useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { storage } from '~/firebase/firebase';

const useStorage = (vehicleId: number) => {
	const { currentUser } = useContext(AuthContext);

	const getUrl = async () => {
		if (!currentUser) {
			return;
		}
		const imageRef = storageRef(
			storage,
			`images/${currentUser.uid}/vehicle-${vehicleId}`,
		);
		const url = await getDownloadURL(imageRef).catch((err) => {
			if (err.code === 'storage/object-not-found') {
				return console.log(404);
			}
			throw new Error(err.message);
		});
		getMetadata(imageRef)
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
		return url;
	};
	const updateMeta = async () => {
		if (!currentUser) return console.log('early return');
		const imageRef = storageRef(
			storage,
			`images/${currentUser.uid}/vehicle-${vehicleId}`,
		);

		const metadata = await getMetadata(imageRef).catch((err) =>
			console.error(err),
		);
		if (!metadata) return console.log('no metadata');

		const newMetadata = { ...metadata };
		newMetadata.cacheControl = 'public, max-age=200';

		updateMetadata(imageRef, newMetadata)
			.then((res) => console.log(res))
			.catch((err) => console.error(err));
	};

	const uploadImage = (
		image: Blob,
		setUrl?: React.Dispatch<SetStateAction<string>>,
	) => {
		if (!vehicleId) {
			throw new Error('No vehicle selected');
		}
		if (!currentUser) return console.error('No active user');
		const imageRef = storageRef(
			storage,
			`images/${currentUser.uid}/vehicle-${vehicleId}`,
		);

		uploadBytes(imageRef, image)
			.then((snapshot) => {
				getDownloadURL(snapshot.ref)
					.then((url) => {
						console.log(url);
						if (setUrl) setUrl(url);
					})
					.catch((error) => {
						console.error(error.message);
					});
			})
			.catch((error) => {
				console.error(error.message);
			});
	};

	return { getUrl, uploadImage, updateMeta };
};

export const uploadImage = (image: Blob, vehicleId: number, uid: string) => {
	if (!vehicleId) {
		throw new Error('No vehicle selected');
	}
	const imageRef = storageRef(storage, `images/${uid}/vehicle-${vehicleId}`);

	uploadBytes(imageRef, image)
		.then((snapshot) => {
			getDownloadURL(snapshot.ref)
				.then((url) => {
					console.log(url);
				})
				.catch((error) => {
					console.error(error.message);
				});
		})
		.catch((error) => {
			console.error(error.message);
		});
};

export default useStorage;
