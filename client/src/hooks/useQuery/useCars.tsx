import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCars, getCar } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import queryKeys from '~/constants/queryKeys';

const useCars = () => {
	const { currentUser } = useContext(AuthContext);

	const carsQuery = useQuery({
		queryKey: ['cars'],
		enabled: currentUser !== null,
		queryFn: async () => (currentUser ? getCars(currentUser) : null),
	});

	const queryClient = useQueryClient();

	carsQuery.data?.forEach((car) => {
		queryClient.setQueryData(['car', car.id], car);
	});

	return carsQuery;
};
export default useCars;
