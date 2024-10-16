import { ServiceRecordData } from '~/types/record.types';
import formatDate from '~/utils/formatDate';
import formatKm from '~/utils/formatKm';
import { IoChevronForward as ChevronRight } from 'react-icons/io5';

const ServiceRecord = ({ data }: { data: ServiceRecordData }) => {
	return (
		<div className='p-2'>
			<div className='flex justify-between'>
				<h3 className='text-lg font-semibold text-manatee-900'>
					{data.description}
				</h3>
				<span className='text-md text-manatee-600'>
					{formatDate(data.date)}
				</span>
			</div>
			<div className='flex justify-between'>
				<span className='font-medium text-manatee-600'>
					{formatKm(data.kilometers)} km
				</span>
				<span className='font-medium'>{data.cost} €</span>
			</div>
		</div>
	);
	//<Separator />
};

export default ServiceRecord;
