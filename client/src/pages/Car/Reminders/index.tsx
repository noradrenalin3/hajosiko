import MainLayout from '~/layouts/MainLayout';
import TabBar from '~/pages/Car/TabBar';
import BackButton from '~/components/Button/BackButton';
import AddButton from '~/components/Button/AddButton';
import Toolbar, { Title } from '~/components/Toolbar';
import { useCar } from '~/hooks/useCars';
import { useState } from 'react';
import Switch from '~/components/Button/Switch';

type ReminderData = {
	id: number;
	name: string;
	interval: number;
};
const reminderDefs: ReminderData[] = [
	{
		id: 1,
		name: 'Oil change',
		interval: 5,
	},
	{
		id: 2,
		name: 'Oil filter',
		interval: 5,
	},
	{
		id: 3,
		name: 'Check oil level',
		interval: 1,
	},
	{
		id: 4,
		name: 'Check tire pressure',
		interval: 1,
	},
];

const Reminder = ({ data }: { data: ReminderData }) => {
	const [enabled, setEnabled] = useState(false);
	return (
		<div className='flex flex-col px-0'>
			<div className='flex items-center px-4 py-4 gap-4 font-medium dark:bg-cinder-950 rounded-lg'>
				<div className='flex flex-col'>
					<h3 className='font-medium'>{data.name}</h3>
					<p className='text-sm dark:text-cinder-300'>
						every {data.interval} months
					</p>
				</div>
				<button className='ml-auto p-3'>
					<Switch checked={enabled} onChange={setEnabled} />
				</button>
			</div>
		</div>
	);
};

const Reminders = () => {
	const { data: car, isLoading: carIsLoading, isError } = useCar();

	if (carIsLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}
	if (!car) {
		return <div>No data</div>;
	}

	return (
		<MainLayout>
			<Toolbar>
				<BackButton url='/cars' />
				<Title text={car.model} />
			</Toolbar>
			<TabBar />
			<div className='flex flex-col dark:bg-cinder-975 rounded-lg'>
				<span className='flex items-center justify-between p-2'>
					<h2 className='p-2 font-semibold dark:text-cinder-50'>Reminders</h2>
					<AddButton onClick={() => console.log('FIX ME')} />
				</span>
				<div className='flex flex-col p-2 gap-2'>
					{reminderDefs.map((r) => (
						<Reminder key={r.id} data={r} />
					))}
				</div>
			</div>
		</MainLayout>
	);
};

export default Reminders;
