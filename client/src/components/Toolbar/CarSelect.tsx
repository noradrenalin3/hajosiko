import { Car } from '~/types/car.types';
import {
	PiCaretDownBold as ChevronDownIcon,
	PiPlusBold as PlusIcon,
	PiCheckBold as CheckIcon,
} from 'react-icons/pi';
import clsx from 'clsx';
import {
	Menu,
	MenuItems,
	MenuItem,
	MenuButton,
} from '@headlessui/react';
import { useContext } from 'react';
import { PiGarageFill as GarageIcon } from 'react-icons/pi';
import { AppContext } from '~/context/AppContext';

const CarButton = ({
	activeId,
	changeCar,
	car,
}: {
	activeId: number | undefined;
	changeCar: (id: number) => void;
	car: Car;
}) => {
	const setCar = () => {
		changeCar(car.id);
		localStorage.setItem('carId', JSON.stringify(car.id));
	};
	const isActive = activeId === car.id;
	return (
		<MenuItem>
			<button
				onClick={setCar}
				className={clsx(
					'flex items-center justify-between text-cinder-100 py-1 px-2 rounded-md hover:bg-cinder-300 dark:hover:bg-cinder-900 font-medium',
					isActive ? 'dark:bg-cinder-950' : '',
				)}
			>
				{`${car.make} ${car.model}`}
				{isActive ? <CheckIcon className='text-xl' /> : null}
			</button>
		</MenuItem>
	);
};

const CarSelect = ({ cars }: { label: string; cars: Car[] }) => {
	const { carId, setCarId } = useContext(AppContext);

	const changeCar = (newId: number) => {
		setCarId(newId);
	};

	const car = cars.find((c) => c.id === carId);

	return (
		<div className='mx-auto w-full px-4'>
			<Menu>
				<MenuButton
					className={`
						w-full justify-center
						flex items-center py-2 gap-4 rounded-lg
						hover:bg-cinder-300 dark:hover:bg-cinder-950 data-[active]:bg-cinder-300
						dark:data-[active]:bg-cinder-900
						text-cinder-50 font-bold
					`}
				>
					<span className='w-full relative flex items-center justify-center'>
						{!car ? 'All' : car.model}
						<ChevronDownIcon
							className='absolute right-2.5 pointer-events-none text-xl text-cinder-300'
							aria-hidden='true'
						/>
					</span>
				</MenuButton>
				<MenuItems
					anchor='bottom'
					className={`
						mt-2
					flex flex-col p-1 gap-1 rounded-lg shadow-main
					bg-cinder-50 text-cinder-900 dark:bg-cinder-950 dark:text-cinder-50
				`}
				>
					<MenuItem>
						<button
							className='flex items-center gap-4 px-2 py-1 dark:hover:bg-cinder-900 rounded-md'
						>
							<span className='font-medium'>Select all</span>
						</button>
					</MenuItem>
					<hr className='w-full border-none h-0.5 bg-cinder-900 rounded-full' />
					{cars.map((car) => (
						<CarButton
							key={car.id}
							activeId={carId}
							car={car}
							changeCar={changeCar}
						/>
					))}
					<hr className='w-full border-none h-0.5 bg-cinder-900 rounded-full' />
					<MenuItem>
						<button className='flex items-center gap-4 px-2 py-1 dark:hover:bg-cinder-900 rounded-md'>
							<GarageIcon className='text-xl' />
							<span className='font-medium'>Manage cars</span>
						</button>
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
