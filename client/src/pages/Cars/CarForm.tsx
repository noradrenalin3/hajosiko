import { HTMLInputTypeAttribute } from 'react';
import Modal from '~/components/Modal';
import Form from '~/components/Form';
import { Car, NewCar } from '~/types/car.types';

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

const fields: FormDefs[] = [
	{
		type: 'text',
		name: 'make',
		placeholder: 'Make',
		required: true,
	},
	{
		type: 'text',
		name: 'model',
		placeholder: 'Model',
		required: true,
	},
	{
		type: 'number',
		name: 'year',
		placeholder: 'Year',
		defaultValue: '2024',
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
	},
];

const CarForm = ({
	isOpen,
	closeHandler,
	postForm,
}: {
	isOpen: boolean;
	closeHandler: () => void;
	postForm: (car: NewCar) => void;
}) => {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const newCar: NewCar = {
			make: form.make.value,
			model: form.model.value,
			year: Number(form.year.value),
			kilometers: Number(form.kilometers.value),
		};

		console.log(newCar);
		postForm(newCar);
		closeHandler();
	};
	return (
		<Modal isOpen={isOpen} close={closeHandler}>
			<Form onSubmit={handleSubmit} fields={fields} title='Add car'>
				<div className='flex gap-2'>
					<button
						onClick={closeHandler}
						className='ml-auto bg-cinder-700 font-medium p-2 px-4 rounded-md'
					>
						Cancel
					</button>
					<button
						type='submit'
						className='bg-custom-purple-light font-medium p-2 px-4 rounded-md'
					>
						Add car
					</button>
				</div>
			</Form>
		</Modal>
	);
};
export default CarForm;
