import { PiXBold as XIcon } from 'react-icons/pi';

const Preview = ({
	src,
	deleteImage,
}: {
	src: string;
	deleteImage: () => void;
}) => {
	return (
		<div className='w-1/2 relative'>
			<button
				onClick={deleteImage}
				className='
				cursor-pointer absolute text-cinder-50 bg-red-500 rounded-full
				-right-3 -top-3 p-1 text-lg shadow-main'
			>
				<XIcon />
			</button>
			<img src={src} className='rounded-lg border-2 border-cinder-800' />
		</div>
	);
};

export default Preview;
