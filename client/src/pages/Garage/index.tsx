import { useContext } from 'react';
import formatKm from '~/utils/formatKm';

import { Vehicle } from '@shared/types';
import { Link } from 'react-router-dom';
import { useVehicles } from '~/hooks/useQuery';
import Spinner from '~/components/Spinner';
import { AppContext } from '~/context/AppContext';
import {
	PiMotorcycleLight as MotorcycleIcon,
	PiCarProfileLight as CarIcon,
} from 'react-icons/pi';
import { PiCaretRightBold as RightIcon } from 'react-icons/pi';

const VehicleCard = ({
	vehicle,
	selectVehicle,
}: {
	vehicle: Vehicle;
	selectVehicle: (id: number) => void;
}) => {
	const { id, make, model, year, kilometers } = vehicle;
	return (
		<Link
			onClick={() => selectVehicle(id)}
			to={'/vehicle'}
			className='flex items-center py-3 px-6 gap-4 bg-cinder-975 border-cinder-950'
		>
			{Math.random() < 0.5 ? (
				<CarIcon className='text-4xl sm:text-5xl text-violet-600' />
			) : (
				<MotorcycleIcon className='text-4xl sm:text-5xl text-violet-600' />
			)}
			<div className='flex flex-col'>
				<h3 className='text-lg font-medium'>
					{make} {model}
				</h3>
				<span className='font-medium text-cinder-500 dark:text-cinder-300'>
					{year}
				</span>
				<span className='font-medium text-cinder-500 dark:text-cinder-300'>
					{formatKm(kilometers)} km
				</span>
			</div>
			<RightIcon className='ml-auto text-2xl text-cinder-500' />
		</Link>
	);
};

const Garage = () => {
	const { setVehicleId } = useContext(AppContext);

	const selectVehicle = (newId: number) => {
		setVehicleId(newId);
	};
	const { data: vehicles, isLoading, error } = useVehicles();

	if (error) {
		return <div>{error?.message || 'error'}</div>;
	}
	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-4 bg-cinder-950 gap-px rounded-lg overflow-hidden'>
				{vehicles ? (
					vehicles.map((vehicle) => (
						<VehicleCard
							key={vehicle.id}
							vehicle={vehicle}
							selectVehicle={selectVehicle}
						/>
					))
				) : (
					<div>No vehicles. Add vehicle...</div>
				)}
			</div>
		</>
	);
};

export default Garage;
