import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVehicle } from '~/api/queries';
import { useContext } from 'react';
import queryKeys from '~/constants/queryKeys';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '~/context/AppContext';
import useAuth from '~/hooks/useAuth';
import { toast } from 'react-toastify';

const useDeleteVehicle = (id: number) => {
	const { currentUser } = useAuth();
	const { setVehicleId } = useContext(AppContext);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () =>
			currentUser ? deleteVehicle(currentUser, id) : null,
		onSuccess: () => {
			navigate('/garage');
			setVehicleId(undefined);
			queryClient.invalidateQueries({ queryKey: [queryKeys.vehicles] });
		},
		onError: (err) => toast.error(err.message),
	});
};
export default useDeleteVehicle;
