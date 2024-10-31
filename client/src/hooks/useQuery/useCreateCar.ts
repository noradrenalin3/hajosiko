import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCar } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { AppContext } from '~/context/AppContext';
import { NewCar, Car } from '~/types/car.types';
import queryKeys from '~/constants/queryKeys';
import { toast } from 'react-toastify';

const useCreateCar = (onSuccess: (car: Car) => void) => {
	const { currentUser } = useContext(AuthContext);
	const { setCarId } = useContext(AppContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (newCar: NewCar) => {
			if (!currentUser) {
				throw new Error('No active user');
			}
			return await createCar(currentUser, newCar);
		},
		onSuccess: (car) => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.cars] });
			onSuccess(car);
			setCarId(car.id);
		},
		onError: () => toast.error('Error creating car'),
	});
};
export default useCreateCar;
