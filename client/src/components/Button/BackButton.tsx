import { useNavigate } from 'react-router-dom';
import { PiCaretLeftFill as BackIcon } from 'react-icons/pi';

const BackButton = ({ url }: { url?: string }) => {
	const navigate = useNavigate();
	const navBack = () => url ? navigate(url) : navigate(-1);
	return (
		<button
			className='p-2.5 max-w-fit rounded-lg bg-cinder-200 hover:bg-cinder-300 dark:bg-cinder-950 dark:hover:bg-cinder-900'
			onClick={navBack}
		>
			<BackIcon className='text-xl' />
		</button>
	);
};
export default BackButton;
