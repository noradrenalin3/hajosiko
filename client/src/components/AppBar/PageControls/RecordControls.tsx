import { useState } from 'react';
import EditButton from '~/components/Button/EditButton';

const RecordControls = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='ml-auto'>
			<EditButton onClick={() => setIsOpen(true)} />
		</div>
	);
};
export default RecordControls;
