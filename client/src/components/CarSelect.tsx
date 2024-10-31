import { Car } from '~/types/car.types';
import {
	PiCaretDownBold as ChevronDownIcon,
	PiPlusBold as PlusIcon,
	PiCheckBold as CheckIcon,
	PiCarFill as CarIcon,
} from 'react-icons/pi';
import clsx from 'clsx';
import { Menu, MenuItems, MenuItem, MenuButton } from '@headlessui/react';
import { useContext } from 'react';
import { PiGarageFill as GarageIcon } from 'react-icons/pi';
import { AppContext } from '~/context/AppContext';
import { useCars } from '~/hooks/useQuery';
import { Link } from 'react-router-dom';

const CarButton = ({
	isActive,
	setCar,
	car,
}: {
	isActive: boolean;
	setCar: (id: number) => void;
	car: Car;
}) => {
	return (
		<MenuItem>
			<button
				onClick={() => setCar(car.id)}
				className={clsx(
					'flex items-center justify-between text-cinder-100 py-1 px-2 rounded-md hover:bg-cinder-300 dark:hover:bg-cinder-900 font-medium',
					isActive ? 'dark:bg-cinder-950' : '',
				)}
			>
				{`${car.make} ${car.model}`}
				{isActive ? <CheckIcon className='text-cinder-500 text-xl' /> : null}
			</button>
		</MenuItem>
	);
};

const CarSelect = () => {
	const { carId, setCarId } = useContext(AppContext);
	const { data: cars, isLoading, isError } = useCars();

	if (isLoading) {
		return <div>--</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}
	if (!cars) {
		return <div>No data</div>;
	}

	const selectAll = () => setCarId(undefined);

	const car = cars.find((c) => c.id === carId);

	return (
		<div className=''>
			<Menu>
				<MenuButton
					className={`
						w-full dark:bg-cinder-950
						flex items-center py-2 px-3 gap-10 rounded-lg
						hover:bg-cinder-300 dark:hover:bg-cinder-950 data-[active]:bg-cinder-300
						dark:data-[active]:bg-cinder-900
						text-cinder-50 font-bold
					`}
				>
					<span className='w-full flex items-center font-medium'>
						{!car || !carId ? 'All Cars' : car.make + ' ' + car.model}
					</span>
					<span className='relative flex items-center'>
						<ChevronDownIcon
							className='absolute right-0 pointer-events-none text-xl text-cinder-600 dark:text-cinder-300'
							aria-hidden='true'
						/>
					</span>
				</MenuButton>
				<MenuItems
					anchor='bottom start'
					className={`
					mt-2
					flex flex-col p-1 gap-1 rounded-lg shadow-main
					bg-cinder-50 text-cinder-900 dark:bg-cinder-950 dark:text-cinder-50
				`}
				>
					{cars.map((car) => (
						<CarButton
							key={car.id}
							isActive={carId === car.id}
							car={car}
							setCar={setCarId}
						/>
					))}
					<hr className='w-full border-none h-0.5 bg-cinder-900 rounded-full' />
					<MenuItem>
						<Link
							to='/garage'
							className='flex items-center gap-4 px-2 py-1 dark:hover:bg-cinder-900 rounded-md'
						>
							<GarageIcon className='text-xl' />
							<span className='font-medium'>Manage cars</span>
						</Link>
					</MenuItem>
					<MenuItem>
						<button className='flex items-center gap-4 px-2 py-1 dark:hover:bg-cinder-900 rounded-md'>
							<PlusIcon className='text-xl' />
							<span className='font-medium'>Add car</span>
						</button>
					</MenuItem>
				</MenuItems>
			</Menu>
		</div>
	);
};

export default CarSelect;
