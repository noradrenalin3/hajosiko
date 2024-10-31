import { Car } from '~/types/car.types';
import formatKm from '~/utils/formatKm';
import {
	PiGauge as GaugeIcon,
	PiClipboardText as ClipboardIcon,
	PiMoney as MoneyIcon,
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
			isFavorite ? 'text-blue-500' : 'text-cinder-300',
		)}
	>
		{isFavorite ? <StarFillIcon /> : <StarIcon />}
	</button>
);

const Details = ({ car, img }: { car: Car; img: string }) => {
	const [isFavorite, setIsFavorite] = useState<boolean>(() => {
		const localData = localStorage.getItem('favoriteCar');
		if (localData) {
			return Number(JSON.parse(localData)) === car.id ? true : false;
		} else {
			return false;
		}
	});
	const setFavorite = () => {
		if (isFavorite) {
			setIsFavorite(false);
			localStorage.removeItem('favoriteCar');
		} else {
			setIsFavorite(true);
			localStorage.setItem('favoriteCar', JSON.stringify(car.id));
		}
	};

	return (
		<div className='rounded-lg flex flex-col'>
			<img
				src={img}
				className='w-full rounded-t-lg aspect-video bg-cinder-300'
			/>
			<div className='flex flex-col bg-cinder-50 dark:bg-cinder-975 rounded-b-lg p-4 gap-4'>
				<div className='flex flex-col gap-0.5'>
					<Row>
						<h1 className='text-xl font-bold text-cinder-950 dark:text-cinder-50'>
							{car.make} {car.model}
						</h1>
						<FavouriteButton onClick={setFavorite} isFavorite={isFavorite} />
					</Row>
					<span className='font-medium text-cinder-300 mb-0'>{car.year}</span>
				</div>

				<div className='flex flex-col rounded-lg gap-4'>
					<span className='font-medium text-cinder-300 flex justify-between'>
						<span className='flex items-center gap-2'>
							<GaugeIcon className='text-xl' />
							Kilometers
						</span>
						<span className='dark:text-cinder-100'>
							{formatKm(car.kilometers)} km
						</span>
					</span>
					<Row>
						<span className='flex items-center gap-2 dark:text-cinder-300'>
							<ClipboardIcon className='text-xl' />
							Service records
						</span>
						<span className='dark:text-cinder-100'>{car.record_count}</span>
					</Row>
					<Row>
						<span className='flex items-center gap-2 dark:text-cinder-300'>
							<MoneyIcon className='text-xl' />
							Total expenses
						</span>
						<span className='dark:text-cinder-100'>
							{`${car.service_costs} €`}
						</span>
					</Row>
				</div>
			</div>
		</div>
	);
};

export default Details;
