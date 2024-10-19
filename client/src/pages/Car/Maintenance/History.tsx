import { ServiceRecord, NewServiceRecord } from '~/types/record.types';
import {
	PiCalendarFill as Calendar,
	PiClockFill as Clock,
	PiCaretRightBold as RightIcon,
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

const History = ({ records }: { records: ServiceRecord[] }) => {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-2 py-2 text-cinder-800 dark:text-cinder-100'>
				<h2 className='text-xl font-bold flex items-center gap-1 py-0.5'>
					<Calendar />
					History
				</h2>
			</div>

			<div className='flex flex-col gap-2'>
				{records.map((record) => {
					return <LogEvent key={record.id} data={record} />;
				})}
			</div>
		</div>
	);
};

export default History;
