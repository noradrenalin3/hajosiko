import { useQuery } from '@tanstack/react-query';
import { getVehicle } from '~/api/queries';
import queryKeys from '~/constants/queryKeys';
import useAuth from '~/hooks/useAuth';

const useVehicleById = (id: number) => {
	const { currentUser } = useAuth();

	const vehicleQuery = useQuery({
		queryKey: [queryKeys.vehicle, id],
		enabled: currentUser !== null,
		queryFn: async () => (currentUser ? getVehicle(currentUser, id) : null),
	});

	return vehicleQuery;
};

export default useVehicleById;
