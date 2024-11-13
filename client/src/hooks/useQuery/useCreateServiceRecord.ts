import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createServiceRecord } from '~/api/queries';
import { NewServiceRecord } from '@shared/types';
import { toast } from 'react-toastify';
import useAuth from '~/hooks/useAuth';
import queryKeys from '~/constants/queryKeys';

const useCreateServiceRecord = () => {
	const { currentUser } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (newRecord: NewServiceRecord) => {
			if (!currentUser) {
				throw new Error('Error creating a record');
			}
			createServiceRecord(currentUser, newRecord);
		},
		onSuccess: () =>
			Promise.all([
				queryClient.invalidateQueries({ queryKey: [queryKeys.records] }),
				queryClient.invalidateQueries({
					queryKey: [queryKeys.records_summary],
				}),
			]),
		onError: (err) => toast.error(err.message),
	});
};
export default useCreateServiceRecord;
