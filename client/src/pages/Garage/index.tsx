import { useContext } from 'react';
import formatKm from '~/utils/formatKm';

import { Car } from '~/types/car.types';
import { Link } from 'react-router-dom';
import { useCars } from '~/hooks/useQuery';
import Spinner from '~/components/Spinner';
import { AppContext } from '~/context/AppContext';

const CarCard = ({
	car,
	selectCar,
}: {
	car: Car;
	selectCar: (id: number) => void;
}) => {
	const { id, make, model, year, kilometers } = car;
	return (
		<Link
			onClick={() => selectCar(id)}
			to={'/car'}
			className='flex flex-col rounded-lg bg-cinder-50 dark:bg-cinder-975'
		>
			<div className='flex flex-col p-4'>
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
			<div className=''></div>
		</Link>
	);
};

const Garage = () => {
	const { setCarId } = useContext(AppContext);

	const selectCar = (newId: number) => {
		setCarId(newId);
	};
	const { data: cars, isLoading, error } = useCars();

	if (error) {
		return <div>{error?.message || 'error'}</div>;
	}
	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
				{cars ? (
					cars.map((car) => (
						<CarCard key={car.id} car={car} selectCar={selectCar} />
					))
				) : (
					<div>No cars. Add car...</div>
				)}
			</div>
		</>
	);
};

export default Garage;
