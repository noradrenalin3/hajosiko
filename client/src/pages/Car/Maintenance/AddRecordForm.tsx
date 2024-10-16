import { FormDefs } from '~/types/form.types';
import Form from '~/components/Form';
import { NewServiceRecord } from '~/types/record.types';

const AddRecordForm = ({
	post,
	onCancel,
}: {
	post: (data: NewServiceRecord) => void;
	onCancel: () => void;
}) => {
	const fields: FormDefs[] = [
		{
			type: 'text',
			name: 'description',
			placeholder: 'Description...',
			required: true,
		},
		{
			type: 'text',
			name: 'notes',
			placeholder: 'Notes...',
		},
		{
			type: 'date',
			name: 'date',
			required: true,
		},
		{
			type: 'number',
			name: 'kilometers',
			required: true,
		},
		{
			type: 'number',
			name: 'cost',
			required: true,
		},
	];

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const newRecord: NewServiceRecord = {
			car_id: 1,
			description: form.description.value,
			notes: form.notes.value,
			date: form.date.value,
			kilometers: Number(form.kilometers.value),
			cost: Number(form.cost.value),
		};
		post(newRecord);
	};

	return (
		<Form title='New Record' onSubmit={submit} fields={fields}>
			<button
				type='submit'
				className='grow bg-blu-500 text-cinder-100 font-medium p-2 rounded-md'
			>
				Add car
			</button>
			<button
				onClick={onCancel}
				className='grow bg-rose-500 text-cinder-100 font-medium p-2 rounded-md'
			>
				{' '}
				Cancel{' '}
			</button>
		</Form>
	);
};

export default AddRecordForm;
