import Form, { FormButtons } from '~/components/Form';
import { NewVehicle } from '@shared/types';
import { useCreateVehicle } from '~/hooks/useQuery';
import Overlay from '~/components/Overlay';
import { FormDefs } from '~/types/form.types';

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

const AddVehicleForm = ({
	isOpen,
	closeHandler,
}: {
	isOpen: boolean;
	closeHandler: () => void;
}) => {
	const {
		mutate: createVehicle,
		isPending,
		isSuccess,
		isError,
	} = useCreateVehicle(closeHandler);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const newVehicle: NewVehicle = {
			make: form.make.value,
			model: form.model.value,
			year: Number(form.year.value),
			kilometers: Number(form.kilometers.value),
		};
		createVehicle(newVehicle);
	};

	return (
		<Overlay isOpen={isOpen} close={closeHandler}>
			<Form onSubmit={handleSubmit} fields={fields} title='Create vehicle'>
				<FormButtons
					cancelHandler={closeHandler}
					submitLabel='Add'
				></FormButtons>
			</Form>
		</Overlay>
	);
};

export default AddVehicleForm;
