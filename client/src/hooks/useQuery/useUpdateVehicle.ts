import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateVehicle } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { VehicleUpdate } from '@shared/types';
import queryKeys from '~/constants/queryKeys';
import { toast } from 'react-toastify';

const useUpdateVehicle = (id: number, onSuccess?: () => void) => {
	const { currentUser } = useContext(AuthContext);
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (update: VehicleUpdate) => {
			if (!currentUser) {
				throw new Error('No active user');
			}
			return updateVehicle(currentUser, id, update);
		},
		onSuccess: () => {
			toast.success('Success');
			queryClient.invalidateQueries({ queryKey: [queryKeys.vehicles] });
			if (onSuccess) {
				onSuccess();
			}
		},
		onError: (err) => toast.error(err.message),
	});
};
export default useUpdateVehicle;
