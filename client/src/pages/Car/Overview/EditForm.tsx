import { HTMLInputTypeAttribute, useContext } from 'react';
import Modal from '~/components/Modal';
import Form, { FormButtons } from '~/components/Form';
import { Car, CarUpdate, NewCar } from '~/types/car.types';
import { PiTrash as TrashIcon } from 'react-icons/pi';
import { useUpdateCar } from '~/hooks/useQuery';
import { AppContext } from '~/context/AppContext';

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
	const { mutate, isPending, isSuccess, isError } = useUpdateCar(car.id);
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const updated: CarUpdate = {
			make: form.make.value,
			model: form.model.value,
			year: Number(form.year.value),
			kilometers: Number(form.kilometers.value),
		};

		mutate(updated);
		closeHandler();
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
	return (
		<Modal isOpen={isOpen} close={closeHandler}>
			<Form onSubmit={handleSubmit} fields={fields} title='Edit car'>
				<FormButtons cancelHandler={closeHandler} submitLabel='Save' />
				<div className='flex gap-2'>
					<button
						onClick={closeHandler}
						className='mx-auto bg-cinder-1000 text-red-500 font-medium p-2 px-4 rounded-md flex items-center gap-2'
					>
						<TrashIcon className='text-xl' />
						Delete Car
					</button>
				</div>
			</Form>
		</Modal>
	);
};
export default EditForm;
