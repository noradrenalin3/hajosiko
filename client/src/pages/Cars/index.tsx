import { useContext, useState } from 'react';
import MainLayout from '~/layouts/MainLayout';
import CarForm from '~/pages/Cars/CarForm';

import Toolbar, { Title } from '~/components/Toolbar';
import AddButton from '~/components/Button/AddButton';
import {
	IoPencil as Pencil,
	IoCarSport,
	IoChevronBack as ChevronBack,
	IoAdd as PlusIcon,
} from 'react-icons/io5';
import { AuthContext } from '~/context/AuthContext';
import formatKm from '~/utils/formatKm';

import { useMutation, useQuery } from '@tanstack/react-query';
import { getCars, postCar } from '~/api/api';
import { Car, NewCar } from '~/types/car.types';
import { Link } from 'react-router-dom';
import 'react-dom';
import { useCars } from '~/hooks/useCars';
import { useCreateCar } from '~/hooks/useCreateCar';

const CarCard = ({ id, make, model, year, kilometers }: Car) => {
	return (
		<Link
			to={`${id}`}
			className='flex flex-col rounded-lg bg-cinder-50 dark:bg-cinder-950'
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

const Cars = () => {
	const { data: cars, isLoading, error } = useCars();
	const { mutate, isPending, isSuccess, isError } = useCreateCar();

	const [isOpen, setIsOpen] = useState(false);
	const closeHandler = () => setIsOpen(false);
	const toggleModal = () => setIsOpen(!isOpen);

	if (error || isError) {
		return <div>{error?.message || 'error'}</div>;
	}
	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<MainLayout>
			<Toolbar>
				<div />
				<Title text='Cars' />
				<AddButton onClick={() => setIsOpen(true)} />
			</Toolbar>
			<div className='flex'>
				<CarForm
					isOpen={isOpen}
					closeHandler={closeHandler}
					postForm={mutate}
				/>
			</div>
			<div className='grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4'>
				{cars ? (
					cars.map((car) => (
						<CarCard
							key={car.id}
							id={car.id}
							make={car.make}
							model={car.model}
							year={car.year}
							kilometers={car.kilometers}
						/>
					))
				) : (
					<div>No cars. Add car...</div>
				)}
			</div>
		</MainLayout>
	);
};

export default Cars;
