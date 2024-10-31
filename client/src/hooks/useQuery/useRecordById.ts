import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getRecord } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import queryKeys from '~/constants/queryKeys';

const useRecordById = (id: number) => {
	const { currentUser } = useContext(AuthContext);

	const carQuery = useQuery({
		queryKey: [queryKeys.record, id],
		enabled: currentUser !== null,
		queryFn: async () => (currentUser ? getRecord(currentUser, id) : null),
	});

	return carQuery;
};

export default useRecordById;
