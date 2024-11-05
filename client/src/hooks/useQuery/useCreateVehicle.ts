import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVehicle } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { AppContext } from '~/context/AppContext';
import { NewVehicle, Vehicle } from '@shared/types';
import queryKeys from '~/constants/queryKeys';
import { toast } from 'react-toastify';

const useCreateVehicle = (onSuccess: (vehicle: Vehicle) => void) => {
	const { currentUser } = useContext(AuthContext);
	const { setVehicleId } = useContext(AppContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (newVehicle: NewVehicle) => {
			if (!currentUser) {
				throw new Error('No active user');
			}
			return await createVehicle(currentUser, newVehicle);
		},
		onSuccess: (vehicle) => {
			queryClient.invalidateQueries({ queryKey: [queryKeys.vehicles] });
			onSuccess(vehicle);
			setVehicleId(vehicle.id);
		},
		onError: () => toast.error('Error creating vehicle'),
	});
};
export default useCreateVehicle;
