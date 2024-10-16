import { useQuery } from '@tanstack/react-query';
import { getServiceRecords } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { useParams } from 'react-router-dom';

export const useServiceRecords = () => {
	const { currentUser } = useContext(AuthContext);
	const { carId } = useParams();
	return useQuery({
		queryKey: ['service_records'],
		enabled: currentUser !== null,
		queryFn: async () =>
			currentUser ? getServiceRecords(currentUser, carId) : null,
	});
};
