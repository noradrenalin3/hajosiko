import { useQuery } from '@tanstack/react-query';
import { getCars, getCar } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { useParams } from 'react-router-dom';

export const useCars = () => {
	const { currentUser } = useContext(AuthContext);
	return useQuery({
		queryKey: ['cars'],
		enabled: currentUser !== null,
		queryFn: async () => (currentUser ? getCars(currentUser) : null),
	});
};

export const useCar = () => {
	const { currentUser } = useContext(AuthContext);
	const { carId } = useParams();

	return useQuery({
		queryKey: ['car'],
		enabled: currentUser !== null,
		queryFn: async () =>
			currentUser && carId ? getCar(currentUser, carId) : null,
	});
};
