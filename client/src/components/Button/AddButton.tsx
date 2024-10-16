import { PiPlusBold as PlusIcon } from 'react-icons/pi';

const AddButton = ({ onClick }: { onClick: () => void }) => (
	<button
		onClick={onClick}
		className='ml-auto flex items-center text-lg p-2.5 max-w-fit bg-cinder-950 hover:bg-cinder-900 rounded-lg'
	>
		<PlusIcon className='text-xl' />
	</button>
);

export default AddButton;
