import Details from './Details';
import EditForm from './EditForm';
import { useVehicleById } from '~/hooks/useQuery';
import { useContext, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import useStorage from '~/hooks/useStorage';
import invariant from '~/utils/invariant';
import { toast } from 'react-toastify';

const VehiclePage = () => {
	const { vehicleId } = useContext(AppContext);
	invariant(vehicleId);

	const { data: vehicle, isLoading, isError } = useVehicleById(vehicleId);

	const [isOpen, setIsOpen] = useState(false);
	const toggleModal = () => setIsOpen(!isOpen);

	const [imgSrc, setImgSrc] = useState('');
	const { getUrl, updateMeta } = useStorage(vehicleId);

	getUrl().then((url) => {
		console.log(url);
		if (url) {
			setImgSrc(url);
		} else {
			//setImgSrc('/images/vehicle.jpg');
		}
	});

	if (isError) {
		toast.error('Error loading vehicle');
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!vehicle || isError) {
		return <div>No data</div>;
	}

	const click = () => {
		toast.success('Success');
		toast.warning('Warning');
		toast.info('Info');
		toast.error('Error');
	};
	return (
		<>
			<img
				src={imgSrc || '/images/vehicle.jpg'}
				alt={'/images/vehicle.jpg'}
				className='w-full rounded-t-lg aspect-video bg-cinder-300'
			/>
			<button onClick={updateMeta}>Update metadata</button>
			<Details vehicle={vehicle} img={imgSrc} />
			<EditForm isOpen={isOpen} closeHandler={toggleModal} vehicle={vehicle} />
		</>
	);
};

export default VehiclePage;
