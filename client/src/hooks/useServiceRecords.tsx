import { useQuery } from '@tanstack/react-query';
import { getServiceRecords } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';

export const useServiceRecords = (carId: string) => {
	const { currentUser } = useContext(AuthContext);
	return useQuery({
		queryKey: ['service_records', carId],
		enabled: currentUser !== null,
		queryFn: async () =>
			currentUser ? getServiceRecords(currentUser, carId) : null,
	});
};
