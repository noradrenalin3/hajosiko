import { ServiceRecord } from '~/types/record.types';

export default function sortRecords(records: ServiceRecord[]) {
	const sorted = [...records].sort((a, b) => {
		return new Date(a.date).getTime() + new Date(b.date).getTime();
	});
	return sorted;
}
