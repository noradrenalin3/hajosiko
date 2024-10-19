import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCar } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { CarUpdate } from '~/types/car.types';
import queryKeys from '~/constants/queryKeys';

const useUpdateCar = (id: number) => {
	const { currentUser } = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		//mutationKey: [queryKeys.car, id],
		mutationFn: async (update: CarUpdate) =>
			currentUser ? updateCar(currentUser, id, update) : null,
		onSuccess: () => {
			//queryClient.invalidateQueries({ queryKey: [queryKeys.car, id] });
			queryClient.invalidateQueries({ queryKey: [queryKeys.cars] });
		},
	});
};
export default useUpdateCar;
