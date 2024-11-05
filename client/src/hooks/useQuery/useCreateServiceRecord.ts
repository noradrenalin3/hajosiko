import { useMutation } from '@tanstack/react-query';
import { createServiceRecord } from '~/api/queries';
import { NewServiceRecord } from '@shared/types';
import { toast } from 'react-toastify';
import useAuth from '~/hooks/useAuth';

const useCreateServiceRecord = () => {
	const { currentUser } = useAuth();
	return useMutation({
		mutationFn: async (newRecord: NewServiceRecord) => {
			if (!currentUser) {
				throw new Error('Error creating a record');
			}
			createServiceRecord(currentUser, newRecord);
		},
		onSuccess: (res) => console.log(res),
		onError: (err) => toast.error(err.message),
	});
};
export default useCreateServiceRecord;
