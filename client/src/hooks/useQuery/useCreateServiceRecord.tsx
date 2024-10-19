import { useMutation } from '@tanstack/react-query';
import { createServiceRecord } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { NewServiceRecord } from '~/types/record.types';

const useCreateServiceRecord = () => {
	const { currentUser } = useContext(AuthContext);
	return useMutation({
		mutationFn: async (newRecord: NewServiceRecord) =>
			currentUser ? createServiceRecord(currentUser, newRecord) : null,
	});
};
export default useCreateServiceRecord;
