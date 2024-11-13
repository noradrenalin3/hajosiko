import Details from './Details';
import EditForm from './EditForm';
import { useVehicleById } from '~/hooks/useQuery';
import { useContext, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import invariant from '~/utils/invariant';
import { toast } from 'react-toastify';

const VehiclePage = () => {
	const { vehicleId } = useContext(AppContext);
	invariant(vehicleId);

	const { data: vehicle, isLoading, isError } = useVehicleById(vehicleId);

	const [isOpen, setIsOpen] = useState(false);
	const toggleModal = () => setIsOpen(!isOpen);

	if (isError) {
		toast.error('Error loading vehicle');
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!vehicle || isError) {
		return <div>No data</div>;
	}
	return (
		<div className='flex flex-col gap-2'>
			<Details vehicle={vehicle} />
			<EditForm isOpen={isOpen} closeHandler={toggleModal} vehicle={vehicle} />
		</div>
	);
};

export default VehiclePage;
