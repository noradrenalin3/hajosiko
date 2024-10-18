import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCars, getCar } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';

export const useCars = () => {
	const { currentUser } = useContext(AuthContext);

	const carsQuery = useQuery({
		queryKey: ['cars'],
		enabled: currentUser !== null,
		queryFn: async () => (currentUser ? getCars(currentUser) : null),
	});

	const queryClient = useQueryClient();

	carsQuery.data?.forEach((car) => {
		queryClient.setQueryData(['car', car.id.toString()], car);
	});

	return carsQuery;
};

export const useCarById = (id: string) => {
	const { currentUser } = useContext(AuthContext);

	const carQuery = useQuery({
		queryKey: ['car', id],
		enabled: currentUser !== null,
		queryFn: async () => (currentUser ? getCar(currentUser, id) : null),
	});

	return carQuery;
};
