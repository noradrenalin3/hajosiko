import { useContext, useState } from 'react';
import { useServiceRecords } from '~/hooks/useQuery';
import { AuthContext } from '~/context/AuthContext';
import { AppContext } from '~/context/AppContext';
import Records from './Records';
import Spinner from '~/components/Spinner';
import { PiCaretRightBold as RightIcon } from 'react-icons/pi';

const Status = () => {
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex items-center gap-2 py-2 text-cinder-800 dark:text-cinder-100'>
				<h2 className='text-xl font-bold flex items-center gap-1 py-0.5'>
					Maintenance status
				</h2>
			</div>
			<div className='flex items-center justify-between p-3 px-4 text-cinder-300 font-medium bg-cinder-100 dark:bg-cinder-975 rounded-lg'>
				<p>All maintenance is up to date</p>
				<RightIcon className='text-2xl text-cinder-500' />
			</div>
		</div>
	);
};

const Maintenance = () => {
	const { currentUser } = useContext(AuthContext);
	const { vehicleId } = useContext(AppContext);

	const {
		data: service_records,
		isFetching: recordsFetching,
		isError: recordsIsError,
		status: recordsStatus,
	} = useServiceRecords(vehicleId);

	if (recordsStatus === 'error') {
		return <div>Error</div>;
	}

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex flex-col gap-4'>
				<Status />
				<div className='flex items-center gap-2 py-2 text-cinder-800 dark:text-cinder-100'></div>
				<h2 className='text-lg font-medium flex items-center gap-1'>
					Maintenance Records
				</h2>
				{recordsFetching ? <Spinner /> : null}
				{!service_records ? (
					<div>No records</div>
				) : (
					<Records
						showAll={vehicleId === undefined}
						records={service_records}
					/>
				)}
			</div>
		</div>
	);
};

export default Maintenance;
