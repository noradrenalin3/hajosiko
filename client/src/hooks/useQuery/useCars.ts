import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCars } from '~/api/queries';
import queryKeys from '~/constants/queryKeys';
import useAuth from '../useAuth';

const useCars = () => {
	const { currentUser } = useAuth();

	const query = useQuery({
		queryKey: [queryKeys.cars],
		enabled: currentUser !== null,
		queryFn: async () => (currentUser ? getCars(currentUser) : null),
	});

	const queryClient = useQueryClient();

	query.data?.forEach((car) => {
		queryClient.setQueryData([queryKeys.car, car.id], car);
	});

	return query;
};
export default useCars;
