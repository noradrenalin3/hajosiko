import { useContext, useState } from 'react';
import invariant from '~/utils/invariant';
import { AppContext } from '~/context/AppContext';
import { YearChart } from './YearChart';
import { MonthChart } from './MonthChart';
import clsx from 'clsx';
const Expenses = () => {
	const { vehicleId } = useContext(AppContext);
	invariant(vehicleId);
	const [chart, setChart] = useState<'month' | 'year'>('year');
	return (
		<div className='flex flex-col gap-2'>
			<div className='flex justify-between items-center'>
				<h2 className='text-xl font-bold px-2'>Expenses</h2>
				<div className='flex bg-cinder-200 dark:bg-cinder-950 rounded-lg text-xs font-semibold h-fit p-0.5 w-36'>
					<button
						onClick={() => setChart('month')}
						className={clsx('rounded-lg p-2 h-fit w-1/2', {
							'text-cinder-100 dark:text-cinder-50 bg-violet-500':
								chart === 'month',
						})}
					>
						Month
					</button>
					<button
						onClick={() => setChart('year')}
						className={clsx('rounded-lg p-2 h-fit w-1/2', {
							'text-cinder-100 dark:text-cinder-50 bg-violet-500':
								chart === 'year',
						})}
					>
						Year
					</button>
				</div>
			</div>
			{chart === 'year' ? (
				<YearChart vehicleId={vehicleId} />
			) : (
				<MonthChart vehicleId={vehicleId} />
			)}
		</div>
	);
};
export default Expenses;
