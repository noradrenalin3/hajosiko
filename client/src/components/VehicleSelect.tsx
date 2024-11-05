import { Vehicle } from '~/types/vehicle.types';
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
import { useVehicles } from '~/hooks/useQuery';
import { Link } from 'react-router-dom';

const VehicleButton = ({
	isActive,
	setVehicle,
	vehicle,
}: {
	isActive: boolean;
	setVehicle: (id: number) => void;
	vehicle: Vehicle;
}) => {
	return (
		<MenuItem>
			<button
				onClick={() => setVehicle(vehicle.id)}
				className={clsx(
					'flex items-center justify-between text-cinder-100 py-1 px-2 rounded-md hover:bg-cinder-300 dark:hover:bg-cinder-900 font-medium',
					isActive ? 'dark:bg-cinder-950' : '',
				)}
			>
				{`${vehicle.make} ${vehicle.model}`}
				{isActive ? <CheckIcon className='text-cinder-500 text-xl' /> : null}
			</button>
		</MenuItem>
	);
};

const VehicleSelect = () => {
	const { vehicleId, setVehicleId } = useContext(AppContext);
	const { data: vehicles, isLoading, isError } = useVehicles();

	if (isLoading) {
		return <div>--</div>;
	}
	if (isError) {
		return <div>Error</div>;
	}
	if (!vehicles) {
		return <div>No data</div>;
	}

	const selectAll = () => setVehicleId(undefined);

	const vehicle = vehicles.find((c) => c.id === vehicleId);

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
						{!vehicle || !vehicleId
							? 'All Vehicles'
							: vehicle.make + ' ' + vehicle.model}
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
					{vehicles.map((vehicle) => (
						<VehicleButton
							key={vehicle.id}
							isActive={vehicleId === vehicle.id}
							vehicle={vehicle}
							setVehicle={setVehicleId}
						/>
					))}
					<hr className='w-full border-none h-0.5 bg-cinder-900 rounded-full' />
					<MenuItem>
						<Link
							to='/garage'
							className='flex items-center gap-4 px-2 py-1 dark:hover:bg-cinder-900 rounded-md'
						>
							<GarageIcon className='text-xl' />
							<span className='font-medium'>Manage vehicles</span>
						</Link>
					</MenuItem>
					<MenuItem>
						<button className='flex items-center gap-4 px-2 py-1 dark:hover:bg-cinder-900 rounded-md'>
							<PlusIcon className='text-xl' />
							<span className='font-medium'>Add vehicle</span>
						</button>
					</MenuItem>
				</MenuItems>
			</Menu>
		</div>
	);
};

export default VehicleSelect;
