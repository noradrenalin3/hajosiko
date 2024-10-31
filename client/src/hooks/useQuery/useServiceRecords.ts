import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getServiceRecords } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import queryKeys from '~/constants/queryKeys';

const useServiceRecords = (carId: number | undefined) => {
	const { currentUser } = useContext(AuthContext);

	const query = useQuery({
		queryKey: [queryKeys.records, carId],
		enabled: currentUser !== null,
		queryFn: async () => {
			if (!currentUser) return;
			if (carId) {
				return getServiceRecords(currentUser, carId);
			} else {
				return getServiceRecords(currentUser);
			}
		},
	});

	const queryClient = useQueryClient();

	query.data?.forEach((record) => {
		queryClient.setQueryData([queryKeys.record, record.id], record);
	});

	return query;
};
export default useServiceRecords;
