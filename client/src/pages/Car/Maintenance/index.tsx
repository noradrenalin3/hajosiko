import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '~/layouts/MainLayout';
import Modal from '~/components/Modal';
import AddRecordForm from './AddRecordForm';
import TabBar from '~/pages/Car/TabBar';
import { useCar } from '~/hooks/useCars';
import AddButton from '~/components/Button/AddButton';
import BackButton from '~/components/Button/BackButton';
import { ServiceRecord, NewServiceRecord } from '~/types/record.types';
import Toolbar, { Title } from '~/components/Toolbar';
import { AuthContext } from '~/context/AuthContext';
import { useServiceRecords } from '~/hooks/useServiceRecords';
import { useCreateServiceRecord } from '~/hooks/useCreateServiceRecord';
import {
	PiCalendarFill as Calendar,
	PiClockFill as Clock,
	PiCaretRightBold as RightIcon,
	PiSortAscending as Ascending,
	PiSortDescending as Descending,
} from 'react-icons/pi';
import formatDate from '~/utils/formatDate';
import formatKm from '~/utils/formatKm';


const LogEvent = ({ data }: { data: ServiceRecord }) => {
	return (
		<div className='p-4 rounded-lg bg-cinder-100 dark:bg-cinder-975'>
			<div className='flex justify-between'>
				<h3 className='text-lg font-medium text-cinder-900 dark:text-cinder-100'>
					{data.description}
				</h3>
				<span className='text-md text-cinder-600 dark:text-cinder-300'>
					{formatDate(data.date)}
				</span>
			</div>
			<div className='flex justify-between'>
				<span className='font-medium text-cinder-600 dark:text-cinder-300'>
					{formatKm(data.kilometers)} km
				</span>
				<span className='font-medium'>{data.cost} €</span>
			</div>
		</div>
	);
};

const Status = () => {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-2 py-2 text-cinder-800 dark:text-cinder-100'>
				<h2 className='text-xl font-bold flex items-center gap-1 py-0.5'>
					<Clock />
					{/*Maintenance status*/}
					Upcoming
				</h2>
			</div>
			<div className='flex items-center justify-between p-3 px-4 text-cinder-300 font-medium bg-cinder-100 dark:bg-cinder-950 rounded-lg'>
				<p>All maintenance is up to date</p>
				<RightIcon className='text-2xl text-cinder-500' />
			</div>
		</div>
	);
};
const History = ({
	records,
	sort,
	sortDir,
}: {
	records: ServiceRecord[];
	sort: () => void;
	sortDir: 'asc' | 'desc';
}) => {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-2 py-2 text-cinder-800 dark:text-cinder-100'>
				<h2 className='text-xl font-bold flex items-center gap-1 py-0.5'>
					<Calendar />
					History
				</h2>
				<button
					onClick={sort}
					className='ml-auto flex px-2 py-1 gap-2 items-center rounded-md hover:bg-manatee-200'
				>
					{sortDir === 'asc' ? (
						<>
							<span className='text-manatee-800 font-medium text-base'>
								Newest
							</span>
							<Ascending className='text-xl' />
						</>
					) : (
						<>
							<span className='text-manatee-800 font-medium text-base'>
								Oldest
							</span>
							<Descending className='text-xl' />
						</>
					)}
				</button>
				<button className='px-2 py-1 rounded-md bg-blue-500 text-base text-manatee-50 font-medium'>
					Edit
				</button>
			</div>

			<div className='flex flex-col gap-2'>
				{records.map((record) => {
					return <LogEvent key={record.id} data={record} />;
				})}
			</div>
		</div>
	);
};

const Maintenance = () => {
	const { data: car, isLoading: carIsLoading, error } = useCar();
	const { data: service_records, isLoading, isError } = useServiceRecords();
	const { mutate, isPending, isSuccess , isError: recordError } =
		useCreateServiceRecord();

	const { carId } = useParams();

	const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

	const sortLogs = () => {
		if (!service_records) return console.log('sortLogs(): no service_records');
		const old = [...service_records];
		const sorted = old.sort((a, b) => {
			if (sortDir === 'asc') {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			} else {
				return new Date(a.date).getTime() + new Date(b.date).getTime();
			}
		});
		return sorted;
	};

	const toggleDir = () => {
		if (sortDir === 'asc') {
			setSortDir('desc');
			sortLogs();
		} else {
			setSortDir('asc');
			sortLogs();
		}
	};

	const [isOpen, setIsOpen] = useState(false);
	const { currentUser } = useContext(AuthContext);

	const closeModal = () => setIsOpen(false);

	if (error) {
		return <div>{error?.message || 'error'}</div>;
	}

	if (isLoading || carIsLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}
	if (!service_records || !car) {
		return <div>No data</div>;
	}

	const fetchService = async () => {
		if (!currentUser) {
			return console.error('No user');
		}
	};

	const postRecord = async () => {
		if (!currentUser) {
			return console.error('No user');
		}
		if (!carId) {
			return console.error('This should never happen...');
		}
		const newRecord: NewServiceRecord = {
			car_id: Number(carId),
			description: 'desc',
			notes: 'notes',
			date: '2024-10-10',
			kilometers: 12345,
			cost: 1,
		};
		mutate(newRecord);
		closeModal();
	};

	return (
		<MainLayout>
			<Toolbar>
				<BackButton url='/cars' />
				<Title text={car.model} />
				<AddButton onClick={() => setIsOpen(true)} />
			</Toolbar>

			<TabBar />
			<div className='flex flex-col gap-4'>
				<Modal isOpen={isOpen} close={() => setIsOpen(false)}>
					<AddRecordForm post={postRecord} onCancel={closeModal} />
				</Modal>
				<Status />
				<History records={service_records} sort={toggleDir} sortDir={sortDir} />
				<button onClick={fetchService}>fetch</button>
				<button onClick={postRecord}>post</button>
			</div>
		</MainLayout>
	);
};

export default Maintenance;
