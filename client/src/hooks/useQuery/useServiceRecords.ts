import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getServiceRecords } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import queryKeys from '~/constants/queryKeys';

const useServiceRecords = (vehicleId: number | undefined) => {
	const { currentUser } = useContext(AuthContext);

	const query = useQuery({
		queryKey: [queryKeys.records, vehicleId],
		enabled: currentUser !== null,
		queryFn: async () => {
			if (!currentUser) return;
			if (vehicleId) {
				return getServiceRecords(currentUser, vehicleId);
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
