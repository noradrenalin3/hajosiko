import { ref as storageRef, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';
import { storage } from '~/firebase/firebase';
import useAuth from '~/hooks/useAuth';

const useUploadImage = (onSuccess: () => void) => {
	const { currentUser } = useAuth();

	const uploadImage = async (image: Blob, carId: number) => {
		try {
			if (!currentUser) {
				throw new Error('No active user');
			}
			const imageRef = storageRef(
				storage,
				`images/${currentUser.uid}/car-${carId}`,
			);

			uploadBytes(imageRef, image)
				.then(() => onSuccess())
				.catch((err) => {
					throw err;
				});
		} catch (err) {
			if (err instanceof Error) {
				console.error(err.message);
			}
			toast.error('Error uploading image');
		}
	};

	return { uploadImage };
};
export default useUploadImage;
