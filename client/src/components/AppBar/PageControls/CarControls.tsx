import { CarSelect } from '~/components/Toolbar';
import Toolbar from '~/components/Toolbar';
import EditButton from '~/components/Button/EditButton';
import {
	PiCaretRightBold as RightIcon,
	PiGarageFill as GarageIcon,
} from 'react-icons/pi';
import EditForm from '~/pages/Car/EditForm';
import { useCarById, useCars } from '~/hooks/useQuery';
import { useContext, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import { Link } from 'react-router-dom';
import invariant from '~/utils/invariant';

const CarBar = () => {
	const { carId } = useContext(AppContext);
	invariant(carId);

	const { data: car, isLoading, error } = useCarById(carId);

	const [isOpen, setIsOpen] = useState(false);
	const toggleModal = () => setIsOpen(!isOpen);

	if (error) {
		return <div>{error?.message || 'error'}</div>;
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!car) {
		return <div>No data</div>;
	}

	return (
		<div className='ml-auto'>
			<EditForm isOpen={isOpen} closeHandler={toggleModal} car={car} />
			<EditButton onClick={toggleModal} />
		</div>
	);
};
export default CarBar;
