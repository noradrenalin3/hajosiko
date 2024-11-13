import { Vehicle } from '@shared/types';
import formatKm from '~/utils/formatKm';
import {
	PiGauge as GaugeIcon,
	PiClipboardTextFill as ClipboardIcon,
	PiMoneyFill as MoneyIcon,
	PiStarBold as StarIcon,
	PiStarFill as StarFillIcon,
} from 'react-icons/pi';
import clsx from 'clsx';
import { useState } from 'react';

const Row = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex justify-between items-center font-medium'>
			{children}
		</div>
	);
};

const FavouriteButton = ({
	isFavorite,
	onClick,
}: {
	isFavorite: boolean;
	onClick: () => void;
}) => (
	<button
		onClick={onClick}
		className={clsx(
			'text-xl',
			isFavorite ? 'text-violet-500' : 'text-cinder-300',
		)}
	>
		{isFavorite ? <StarFillIcon /> : <StarIcon />}
	</button>
);

const Details = ({ vehicle }: { vehicle: Vehicle }) => {
	const [isFavorite, setIsFavorite] = useState<boolean>(() => {
		const localData = localStorage.getItem('favoriteVehicle');
		if (localData) {
			return Number(JSON.parse(localData)) === vehicle.id ? true : false;
		} else {
			return false;
		}
	});
	const setFavorite = () => {
		if (isFavorite) {
			setIsFavorite(false);
			localStorage.removeItem('favoriteVehicle');
		} else {
			setIsFavorite(true);
			localStorage.setItem('favoriteVehicle', JSON.stringify(vehicle.id));
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			<div className='flex flex-col border border-cinder-200 dark:border-none dark:bg-cinder-975 rounded-lg gap-4 p-4 sm:p-6'>
				<div className='flex justify-between'>
					<div className='flex flex-col gap-0.5 justify-center'>
						<h1 className='text-2xl font-bold text-cinder-950 dark:text-cinder-50'>
							{vehicle.make} {vehicle.model}
						</h1>
						<span className='font-medium text-cinder-300 mb-0'>
							{vehicle.year}
						</span>
					</div>
				</div>
				<div className='flex flex-col rounded-lg gap-4'>
					<span className='font-medium text-cinder-200 flex justify-between'>
						<span className='flex items-center gap-2'>Odometer</span>
						<span className='dark:text-cinder-100'>
							{formatKm(vehicle.kilometers)} km
						</span>
					</span>
					<Row>
						<span className='dark:text-cinder-200'>License plate</span>
						--
					</Row>
					<Row>
						<span className='dark:text-cinder-200'>Fuel type</span>
						--
					</Row>
				</div>
			</div>
			<div className='flex gap-2'>
				<div className='w-1/2 flex flex-col dark:bg-cinder-975 dark:text-cinder-50 rounded-lg p-4 sm:p-6 border border-cinder-200 dark:border-none'>
					<span className='flex items-center gap-2 text-cinder-600 dark:text-cinder-300 font-medium'>
						<ClipboardIcon className='size-5 hidden' />
						Service records
					</span>
					<span className='text-2xl font-semibold'>{vehicle.record_count}</span>
				</div>
				<div className='w-1/2 flex flex-col dark:bg-cinder-975 dark:text-cinder-50 rounded-lg p-4 sm:p-6 border border-cinder-200 dark:border-none'>
					<span className='flex items-center gap-2 text-cinder-600 dark:text-cinder-300 font-medium'>
						<MoneyIcon className='size-5 hidden' />
						Total expenses
					</span>
					<span className='text-2xl font-semibold'>
						{`${vehicle.service_costs} €`}
					</span>
				</div>
			</div>
		</div>
	);
};

export default Details;
