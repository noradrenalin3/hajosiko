import { useQuery } from '@tanstack/react-query';
import { getCar } from '~/api/queries';
import queryKeys from '~/constants/queryKeys';
import useAuth from '~/hooks/useAuth';

const useCarById = (id: number) => {
	const { currentUser } = useAuth();

	const carQuery = useQuery({
		queryKey: [queryKeys.car, id],
		enabled: currentUser !== null,
		queryFn: async () => (currentUser ? getCar(currentUser, id) : null),
	});

	return carQuery;
};

export default useCarById;
