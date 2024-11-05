import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getVehicles } from '~/api/queries';
import queryKeys from '~/constants/queryKeys';
import useAuth from '../useAuth';

const useVehicles = () => {
	const { currentUser } = useAuth();

	const query = useQuery({
		queryKey: [queryKeys.vehicles],
		enabled: currentUser !== null,
		queryFn: async () => (currentUser ? getVehicles(currentUser) : null),
	});

	const queryClient = useQueryClient();

	query.data?.forEach((vehicle) => {
		queryClient.setQueryData([queryKeys.vehicle, vehicle.id], vehicle);
	});

	return query;
};
export default useVehicles;
