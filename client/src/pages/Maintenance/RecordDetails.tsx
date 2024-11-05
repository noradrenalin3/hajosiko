import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	useRecordById,
	useDeleteRecord,
	useUpdateRecord,
} from '~/hooks/useQuery';
import invariant from '~/utils/invariant';

const RecordDetails = () => {
	const { recordId } = useParams();
	invariant(recordId);
	const { data: record, isLoading, isError } = useRecordById(Number(recordId));
	const { mutate: deleteRecord } = useDeleteRecord();
	const { mutate: updateRecord } = useUpdateRecord(Number(recordId));

	const [desc, setDesc] = useState('initial');

	if (isLoading) {
		return <div></div>;
	}
	if (isError) {
		return <div>Error</div>;
	}
	if (!record) {
		return <div>No data</div>;
	}

	const submit = () => {
		const data = {
			description: desc,
			date: record.date,
			cost: record.cost,
			kilometers: record.kilometers,
			notes: record.notes,
		};
		updateRecord(data);
	};
	return (
		<div>
			<button
				onClick={() => deleteRecord(Number(recordId))}
				className='p-2 bg-rose-500'
			>
				delete
			</button>
			<button onClick={() => setDesc(record.description)}>Load </button>

			<input
				className='text-cinder-900'
				value={desc}
				onChange={(e) => setDesc(e.target.value)}
			/>
			<button onClick={() => submit()} className='p-2 bg-violet-500'>
				update
			</button>
			<div className='flex flex-col'>
				<span>Description: {record.description}</span>
				<span>Notes:</span>
			</div>
		</div>
	);
};
export default RecordDetails;
