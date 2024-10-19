import MainLayout from '~/layouts/MainLayout';
import TabBar from '~/pages/Car/TabBar';
import Details from './Details';

import Toolbar, { Title, CarSelect } from '~/components/Toolbar';
import BackButton from '~/components/Button/BackButton';
import EditButton from '~/components/Button/EditButton';
import {
	PiClockFill as Clock,
	PiCaretRightBold as RightIcon,
} from 'react-icons/pi';
import EditForm from './EditForm';
import { useCars, useCarById, useUpdateCar } from '~/hooks/useQuery';
import { useContext, useState } from 'react';
import { AppContext } from '~/context/AppContext';

const Status = () => {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-2 py-2 text-cinder-800 dark:text-cinder-100'>
				<h2 className='text-xl font-bold flex items-center gap-1 py-0.5'>
					<Clock />
					Maintenance status
				</h2>
			</div>
			<div className='flex items-center justify-between p-3 px-4 text-cinder-300 font-medium bg-cinder-100 dark:bg-cinder-975 rounded-lg'>
				<p>All maintenance is up to date</p>
				<RightIcon className='text-2xl text-cinder-500' />
			</div>
		</div>
	);
};

const Overview = () => {
	const { carId } = useContext(AppContext);

	const { data: cars, isLoading: carsLoading, error: carsError } = useCars();
	const { data: car, isLoading, error } = useCarById(Number(carId));

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
		<MainLayout>
			<Toolbar>
				<BackButton url='/cars' />
				{cars ? <CarSelect label={car.model} cars={cars} /> : null}
				<div className='ml-auto'>
					<EditButton onClick={toggleModal} />
				</div>
			</Toolbar>

			<TabBar />
			{error ? <div>Error</div> : null}
			{isLoading ? <div>Loading...</div> : null}
			{!car ? <div>No cars. Create one here</div> : null}
			<Details car={car} />
			<EditForm isOpen={isOpen} closeHandler={toggleModal} car={car} />
			<Status />
		</MainLayout>
	);
};

export default Overview;
