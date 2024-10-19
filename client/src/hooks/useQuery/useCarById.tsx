import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCars, getCar } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import queryKeys from '~/constants/queryKeys';

const useCarById = (id: number) => {
	const { currentUser } = useContext(AuthContext);

	const carQuery = useQuery({
		queryKey: [queryKeys.car, id],
		enabled: currentUser !== null,
		queryFn: async () => (currentUser ? getCar(currentUser, id) : null),
	});

	return carQuery;
};

export default useCarById;
