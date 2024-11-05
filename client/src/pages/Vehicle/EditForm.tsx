import { HTMLInputTypeAttribute, useContext, useRef, useState } from 'react';
import Form, { FormButtons } from '~/components/Form';
import { Vehicle, VehicleUpdate, NewVehicle } from '@shared/types';
import { PiTrash as TrashIcon } from 'react-icons/pi';
import { useDeleteVehicle, useUpdateVehicle } from '~/hooks/useQuery';
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
	vehicle,
	isOpen,
	closeHandler,
}: {
	vehicle: Vehicle;
	isOpen: boolean;
	closeHandler: () => void;
}) => {
	const imageRef = useRef<Blob | null>(null);
	const {
		mutate: updateVehicle,
		isPending,
		isSuccess,
		isError,
	} = useUpdateVehicle(vehicle.id, closeHandler);
	const {
		mutate: deleteVehicle,
		isPending: deletePending,
		isSuccess: deleteSuccess,
		isError: deleteError,
	} = useDeleteVehicle(vehicle.id);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const updated: VehicleUpdate = {
			make: form.make.value,
			model: form.model.value,
			year: Number(form.year.value),
			kilometers: Number(form.kilometers.value),
		};

		if (imageRef.current) {
			uploadImage(imageRef.current);
		}
		updateVehicle(updated);
	};
	const fields: FormDefs[] = [
		{
			type: 'text',
			name: 'make',
			placeholder: 'Make',
			required: true,
			defaultValue: vehicle.make,
		},
		{
			type: 'text',
			name: 'model',
			placeholder: 'Model',
			required: true,
			defaultValue: vehicle.model,
		},
		{
			type: 'number',
			name: 'year',
			placeholder: 'Year',
			defaultValue: vehicle.year.toString(),
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
			defaultValue: vehicle.kilometers.toString(),
		},
	];
	const deleteFn = () => {
		deleteVehicle();
		if (deleteSuccess) {
			closeHandler();
		}
	};
	const { uploadImage } = useStorage(vehicle.id);

	return (
		<Overlay isOpen={isOpen} close={closeHandler}>
			<Form onSubmit={handleSubmit} fields={fields} title='Edit vehicle'>
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
