import { HTMLInputTypeAttribute, useContext, useRef, useState } from 'react';
import Form, { FormButtons } from '~/components/Form';
import { Car, CarUpdate, NewCar } from '@shared/types';
import { PiTrash as TrashIcon } from 'react-icons/pi';
import { useDeleteCar, useUpdateCar } from '~/hooks/useQuery';
import useStorage from '~/hooks/useStorage';
import ImageUpload from '~/components/ImageUpload';
import Overlay from '~/components/Overlay';

type FormDefs = {
	type: HTMLInputTypeAttribute;
	name: string;
	placeholder: string;
	required: boolean;
	defaultValue?: string;
	min?: string;
	max?: string;
	step?: string;
};

const EditForm = ({
	car,
	isOpen,
	closeHandler,
}: {
	car: Car;
	isOpen: boolean;
	closeHandler: () => void;
}) => {
	const imageRef = useRef<Blob | null>(null);
	const {
		mutate: updateCar,
		isPending,
		isSuccess,
		isError,
	} = useUpdateCar(car.id, closeHandler);
	const {
		mutate: deleteCar,
		isPending: deletePending,
		isSuccess: deleteSuccess,
		isError: deleteError,
	} = useDeleteCar(car.id);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const updated: CarUpdate = {
			make: form.make.value,
			model: form.model.value,
			year: Number(form.year.value),
			kilometers: Number(form.kilometers.value),
		};

		if (imageRef.current) {
			uploadImage(imageRef.current);
		}
		updateCar(updated);
	};
	const fields: FormDefs[] = [
		{
			type: 'text',
			name: 'make',
			placeholder: 'Make',
			required: true,
			defaultValue: car.make,
		},
		{
			type: 'text',
			name: 'model',
			placeholder: 'Model',
			required: true,
			defaultValue: car.model,
		},
		{
			type: 'number',
			name: 'year',
			placeholder: 'Year',
			defaultValue: car.year.toString(),
			required: true,
			min: '1900',
			max: '2099',
			step: '1',
		},
		{
			type: 'number',
			name: 'kilometers',
			placeholder: 'Kilometers',
			required: true,
			defaultValue: car.kilometers.toString(),
		},
	];
	const deleteFn = () => {
		deleteCar();
		if (deleteSuccess) {
			closeHandler();
		}
	};
	const { uploadImage } = useStorage(car.id);

	return (
		<Overlay isOpen={isOpen} close={closeHandler}>
			<Form onSubmit={handleSubmit} fields={fields} title='Edit car'>
				<label className='font-semibold'>Upload image</label>
				<ImageUpload imageRef={imageRef} />
				<FormButtons cancelHandler={closeHandler} submitLabel='Save'>
					<button
						type='button'
						onClick={deleteFn}
						className='mr-auto text-red-500 hover:text-red-400 font-medium p-2 rounded-md flex items-center gap-2'
					>
						<TrashIcon className='text-xl' />
						Delete
					</button>
				</FormButtons>
			</Form>
		</Overlay>
	);
};
export default EditForm;
