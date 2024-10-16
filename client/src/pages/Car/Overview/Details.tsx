import { Car } from '~/types/car.types';
import { IoPencil as PencilIcon } from 'react-icons/io5';
import formatKm from '~/utils/formatKm';

const Section = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='flex flex-col gap-2 sm:grid-cols-2 sm:gap-4'>
			{children}
		</div>
	);
};

const Details = ({ car }: { car: Car }) => {
	const serviceCount = 0;
	return (
		<Section>
			<div className='flex flex-col bg-cinder-50 dark:bg-cinder-975 rounded-lg p-4'>
				<span className='flex justify-between items-center'>
					<h1 className='text-xl font-medium text-cinder-950 dark:text-cinder-50'>
						{car.make} {car.model}
					</h1>
					<button className='text-xl text-cinder-200 hover:bg-cinder-900 p-1 rounded-lg'>
						<PencilIcon className='' />
					</button>
				</span>
				<span className='font-medium text-cinder-300'>{car.year}</span>
				<span className='font-medium text-cinder-300'>
					{formatKm(car.kilometers)} km
				</span>
			</div>
			<div className='flex items-center p-2 gap-2 sm:gap-4 bg-cinder-975 rounded-lg'>
				<div className='grow flex flex-col items-center p-4 font-medium text-cinder-300 rounded-lg'>
					Service records
					<span className='text-2xl text-cinder-100'>{serviceCount}</span>
				</div>
				<div className='min-h-16 max-h-16 min-w-0.5 bg-cinder-900 rounded-full'></div>
				<div className='grow flex flex-col items-center p-4 font-medium text-cinder-300 rounded-lg'>
					Service costs
					<span className='text-2xl text-cinder-100'>0 €</span>
				</div>
			</div>
		</Section>
	);
};

export default Details;
