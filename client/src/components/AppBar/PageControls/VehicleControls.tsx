import { VehicleSelect } from '~/components/Toolbar';
import Toolbar from '~/components/Toolbar';
import EditButton from '~/components/Button/EditButton';
import {
	PiVehicleetRightBold as RightIcon,
	PiGarageFill as GarageIcon,
} from 'react-icons/pi';
import EditForm from '~/pages/Vehicle/EditForm';
import { useVehicleById, useVehicles } from '~/hooks/useQuery';
import { useContext, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import { Link } from 'react-router-dom';
import invariant from '~/utils/invariant';

const VehicleBar = () => {
	const { vehicleId } = useContext(AppContext);
	invariant(vehicleId);

	const { data: vehicle, isLoading, error } = useVehicleById(vehicleId);

	const [isOpen, setIsOpen] = useState(false);
	const toggleModal = () => setIsOpen(!isOpen);

	if (error) {
		return <div>{error?.message || 'error'}</div>;
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!vehicle) {
		return <div>No data</div>;
	}

	return (
		<div className='ml-auto'>
			<EditForm isOpen={isOpen} closeHandler={toggleModal} vehicle={vehicle} />
			<EditButton onClick={toggleModal} />
		</div>
	);
};
export default VehicleBar;
