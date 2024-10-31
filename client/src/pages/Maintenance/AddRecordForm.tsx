import { FormDefs } from '~/types/form.types';
import Form, { FormButtons } from '~/components/Form';
import { NewServiceRecord } from '~/types/record.types';
import { AppContext } from '~/context/AppContext';
import { useContext, useState } from 'react';
import { useCreateServiceRecord } from '~/hooks/useQuery';
import Modal from '~/components/Modal';
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

const AddRecordForm = ({
	isOpen,
	close,
}: {
	isOpen: boolean;
	close: () => void;
}) => {
	const { carId } = useContext(AppContext);
	const {
		mutate,
		isPending,
		isSuccess,
		isError: recordError,
	} = useCreateServiceRecord();

	const post = async (newRecord: NewServiceRecord) => {
		if (!carId) {
			return console.error('This should never happen...');
		}
		mutate(newRecord);
		close();
	};

	const submit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (!carId) {
			return console.error('no carId');
		}
		const newRecord: NewServiceRecord = {
			car_id: carId,
			description: form.description.value,
			notes: form.notes.value,
			date: form.date.value,
			kilometers: Number(form.kilometers.value),
			cost: Number(form.cost.value),
		};
		post(newRecord);
	};

	if (isSuccess) {
		close();
	}

	return (
		<Modal isOpen={isOpen} close={close}>
			<Form title='New Record' onSubmit={submit} fields={fields}>
				<FormButtons cancelHandler={close} submitLabel='Add record' />
			</Form>
		</Modal>
	);
};

export default AddRecordForm;
