import { ServiceRecord, NewServiceRecord } from '~/types/record.types';
import {
	PiCalendarFill as Calendar,
	PiClockFill as Clock,
	PiCaretRightBold as RightIcon,
	PiReadCvLogo as LogIcon,
	PiArticle as ArticleIcon,
} from 'react-icons/pi';
import formatDate from '~/utils/formatDate';
import formatKm from '~/utils/formatKm';
import { Link } from 'react-router-dom';
import { useCars } from '~/hooks/useQuery';

const LogEvent = ({ sep, data }: { sep: boolean; data: ServiceRecord }) => {
	return (
		<div className='flex flex-col'>
			<Link
				to={`${data.id}`}
				className='p-4 bg-cinder-100 dark:bg-cinder-975 dark:border-cinder-950'
			>
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
			</Link>
			{sep ? <hr className='border-none h-px bg-cinder-950' /> : null}
		</div>
	);
};

const List = ({
	title,
	records,
}: {
	title?: string;
	records: ServiceRecord[];
}) => {
	return (
		<>
			<div className='flex flex-col gap-2'>
				{title ? (
					<h3 className='font-semibold flex items-center gap-1 py-0.5 dark:text-cinder-300'>
						{title}
					</h3>
				) : null}

				<div className='flex flex-col gap-0 rounded-lg overflow-hidden'>
					{records.map((record, i) => {
						return (
							<LogEvent
								sep={i < records.length - 1}
								key={record.id}
								data={record}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
};

type GroupedRecords = {
	[key: number]: ServiceRecord[];
};
const Records = ({
	showAll,
	records,
}: {
	showAll: boolean;
	records: ServiceRecord[];
}) => {
	const { data: cars, isFetching, isError } = useCars();
	const grouped: GroupedRecords = records.reduce((soFar, curr) => {
		if (!soFar[curr.car_id]) {
			soFar[curr.car_id] = [];
		}
		soFar[curr.car_id].push(curr);
		return soFar;
	}, {} as GroupedRecords);
	const getCarName = (id: number) => {
		if (cars) {
			const car = cars.find((car) => car.id === id);
			if (!car) return '--';
			return `${car.make} ${car.model}`;
		}
	};
	return (
		<>
			{showAll ? (
				<div className='flex flex-col gap-8'>
					{Object.keys(grouped).map((carId) => {
						const id = Number(carId);
						return (
							<List key={id} title={getCarName(id)} records={grouped[id]} />
						);
					})}
				</div>
			) : (
				<List records={records} />
			)}
		</>
	);
};

export default Records;
