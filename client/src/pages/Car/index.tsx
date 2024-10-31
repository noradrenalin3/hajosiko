import Details from './Details';
import EditForm from './EditForm';
import { useCarById } from '~/hooks/useQuery';
import { useContext, useState } from 'react';
import { AppContext } from '~/context/AppContext';
import useStorage from '~/hooks/useStorage';
import invariant from '~/utils/invariant';
import { toast } from 'react-toastify';

const CarPage = () => {
	const { carId } = useContext(AppContext);
	invariant(carId);

	const { data: car, isLoading, isError } = useCarById(carId);

	const [isOpen, setIsOpen] = useState(false);
	const toggleModal = () => setIsOpen(!isOpen);

	const [imgSrc, setImgSrc] = useState('');

	const { getUrl } = useStorage(carId);
	getUrl().then((url) => {
		if (url) {
			setImgSrc(url);
		} else {
			setImgSrc('/images/car.jpg');
		}
	});

	if (isError) {
		toast.error('Error loading car');
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (!car || isError) {
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
			<Details car={car} img={imgSrc} />
			<EditForm isOpen={isOpen} closeHandler={toggleModal} car={car} />
		</>
	);
};

export default CarPage;
