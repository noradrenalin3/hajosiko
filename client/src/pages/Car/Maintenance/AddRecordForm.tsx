import { FormDefs } from '~/types/form.types';
import Form, { FormButtons } from '~/components/Form';
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
			<FormButtons cancelHandler={onCancel} submitLabel='Add record' />
		</Form>
	);
};

export default AddRecordForm;
