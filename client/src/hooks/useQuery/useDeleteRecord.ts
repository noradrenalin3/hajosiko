import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRecord } from '~/api/queries';
import queryKeys from '~/constants/queryKeys';
import { useNavigate } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import { toast } from 'react-toastify';

const useDeleteRecord = () => {
	const { currentUser } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (id: number) =>
			currentUser ? deleteRecord(currentUser, id) : null,
		onSuccess: () => {
			navigate('/maintenance');
			queryClient.invalidateQueries({ queryKey: [queryKeys.records] });
		},
		onError: (err) => toast.error(err.message),
	});
};
export default useDeleteRecord;
