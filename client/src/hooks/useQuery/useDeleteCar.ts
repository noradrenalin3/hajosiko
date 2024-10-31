import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCar } from '~/api/queries';
import { useContext } from 'react';
import queryKeys from '~/constants/queryKeys';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '~/context/AppContext';
import useAuth from '../useAuth';
import { toast } from 'react-toastify';

const useDeleteCar = (id: number) => {
	const { currentUser } = useAuth();
	const { setCarId } = useContext(AppContext);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => (currentUser ? deleteCar(currentUser, id) : null),
		onSuccess: () => {
			navigate('/garage');
			setCarId(undefined);
			queryClient.invalidateQueries({ queryKey: [queryKeys.cars] });
		},
		onError: (err) => toast.error(err.message),
	});
};
export default useDeleteCar;
