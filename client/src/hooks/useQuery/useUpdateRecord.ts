import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRecord } from '~/api/queries';
import useAuth from '~/hooks/useAuth';
import queryKeys from '~/constants/queryKeys';
import { toast } from 'react-toastify';
import { ServiceRecordUpdate } from '@shared/types';

const useUpdateRecord = (id: number) => {
	const { currentUser } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (update: ServiceRecordUpdate) =>
			currentUser ? updateRecord(currentUser, id, update) : null,
		onSuccess: (res) => {
			console.log(res);
			toast.success('Success');
			queryClient.invalidateQueries({ queryKey: [queryKeys.records] });
		},
	});
};
export default useUpdateRecord;
