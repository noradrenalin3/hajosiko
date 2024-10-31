import { useState } from 'react';
import AddRecordForm from '~/pages/Maintenance/AddRecordForm';
import AddButton from '~/components/Button/AddButton';

const RecordsControls = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='ml-auto'>
			<AddRecordForm isOpen={isOpen} close={() => setIsOpen(false)} />
			<AddButton onClick={() => setIsOpen(true)} />
		</div>
	);
};
export default RecordsControls;
