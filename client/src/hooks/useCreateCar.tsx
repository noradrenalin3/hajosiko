import { useMutation } from '@tanstack/react-query';
import { createCar } from '~/api/queries';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';
import { NewCar } from '~/types/car.types';

export const useCreateCar = () => {
	const { currentUser } = useContext(AuthContext);
	return useMutation({
		mutationFn: async (newCar: NewCar) =>
			currentUser ? createCar(currentUser, newCar) : null,
	});
};
