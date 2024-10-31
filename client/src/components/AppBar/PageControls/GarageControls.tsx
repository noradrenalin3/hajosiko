import AddButton from '~/components/Button/AddButton';
import { useState } from 'react';
import AddVehicleForm from '~/pages/Garage/AddVehicleForm';

const GarageControls = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className='ml-auto'>
			<AddVehicleForm isOpen={isOpen} closeHandler={() => setIsOpen(false)} />
			<AddButton onClick={() => setIsOpen(true)} />
		</div>
	);
};
export default GarageControls;
