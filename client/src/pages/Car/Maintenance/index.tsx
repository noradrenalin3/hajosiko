import { useContext, useState } from 'react';
import MainLayout from '~/layouts/MainLayout';
import Modal from '~/components/Modal';
import AddRecordForm from './AddRecordForm';
import {
	useServiceRecords,
	useCreateServiceRecord,
	useCars,
} from '~/hooks/useQuery';
import AddButton from '~/components/Button/AddButton';
import BackButton from '~/components/Button/BackButton';
import { ServiceRecord, NewServiceRecord } from '~/types/record.types';
import Toolbar, { Title, CarSelect } from '~/components/Toolbar';
import { AuthContext } from '~/context/AuthContext';
import { AppContext } from '~/context/AppContext';
import History from './History';

const Maintenance = () => {
	const { currentUser } = useContext(AuthContext);
	const { carId } = useContext(AppContext);

	const {
		data: cars,
		isLoading: carsLoading,
		isError: carsIsError,
	} = useCars();
	const {
		data: service_records,
		isLoading: recordsLoading,
		isError: recordsIsError,
	} = useServiceRecords(carId);
	const {
		mutate,
		isPending,
		isSuccess,
		isError: recordError,
	} = useCreateServiceRecord();

	const [isOpen, setIsOpen] = useState(false);
	const closeModal = () => setIsOpen(false);

	if (carsLoading) {
		return <div>Loading...</div>;
	}
	if (carsIsError) {
		return <div>Error</div>;
	}
	if (carsIsError) {
		return <div>Error</div>;
	}
	if (!cars) {
		return <div>No data</div>;
	}

	const c = cars.find((car) => car.id === carId);
	const carName = c ? c.model : 'No cars';

	const postRecord = async (newRecord: NewServiceRecord) => {
		if (!currentUser) {
			return console.error('No user');
		}
		if (!carId) {
			return console.error('This should never happen...');
		}
		mutate(newRecord);
		closeModal();
	};

	return (
		<MainLayout>
			<Toolbar>
				<BackButton url='/cars' />
				<CarSelect cars={cars} label={carName} />
				<AddButton onClick={() => setIsOpen(true)} />
			</Toolbar>
			<div className='flex flex-col gap-4'>
				<Modal isOpen={isOpen} close={() => setIsOpen(false)}>
					<AddRecordForm post={postRecord} onCancel={closeModal} />
				</Modal>

				{recordsLoading ? (
					<div>Loading...</div>
				) : null}
				{!service_records ? (
					<div>No data</div>
				) : (
					<History records={service_records} />
				)}
			</div>
		</MainLayout>
	);
};

export default Maintenance;
