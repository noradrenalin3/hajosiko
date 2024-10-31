import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCar } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { CarUpdate } from '~/types/car.types';
import queryKeys from '~/constants/queryKeys';
import { toast } from 'react-toastify';

const useUpdateCar = (id: number, onSuccess?: () => void) => {
	const { currentUser } = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (update: CarUpdate) =>
			currentUser ? updateCar(currentUser, id, update) : null,
		onSuccess: () => {
			toast.success('Success');
			queryClient.invalidateQueries({ queryKey: [queryKeys.cars] });
			if (onSuccess) {
				onSuccess();
			}
		},
	});
};
export default useUpdateCar;
