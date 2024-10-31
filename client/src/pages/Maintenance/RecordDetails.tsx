import { useParams } from 'react-router-dom';
import useRecordById from '~/hooks/useQuery/useRecordById';
import invariant from '~/utils/invariant';

const RecordDetails = () => {
	const { recordId } = useParams();
	invariant(recordId);
	const { data: record, isLoading, isError } = useRecordById(Number(recordId));
	if (isLoading) {
		return <div></div>;
	}
	if (isError) {
		return <div>Error</div>;
	}
	if (!record) {
		return <div>No data</div>;
	}
	return (
		<div>
			<span>Notes</span>
			<span>{record.description}</span>
		</div>
	);
};
export default RecordDetails;
