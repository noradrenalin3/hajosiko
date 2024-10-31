import { IoPencil as PencilIcon } from 'react-icons/io5';

const EditButton = ({ onClick }: { onClick: () => void }) => (
	<button
		onClick={onClick}
		className='flex items-center text-lg p-2.5 max-w-fit bg-cinder-200 dark:bg-cinder-950 hover:bg-cinder-300 dark:hover:bg-cinder-900 rounded-lg'
	>
		<PencilIcon className='text-xl' />
	</button>
);

export default EditButton;
