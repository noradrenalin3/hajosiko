import { useMonthSummary } from '~/hooks/useQuery/useRecordsSummary';
import { DaysRecords } from '@shared/types';
import { useState } from 'react';
import MonthPicker from '~/components/MonthPicker';

type YearMonth = {
	year: number;
	month: number;
};
const initial = {
	year: new Date().getFullYear(),
	month: new Date().getMonth() + 1,
};

export const MonthChart = ({ vehicleId }: { vehicleId: number }) => {
	const [selected, setSelected] = useState<YearMonth>(initial);
	const { data, isLoading } = useMonthSummary(
		vehicleId,
		selected.year,
		selected.month,
	);

	const formatMonth = (monStr: string) => {
		const arr = monStr.split('-');
		const result = arr.reverse().join('/');
		return result;
	};
	const findMax = (arr: DaysRecords[]) => {
		return Math.max(...arr.map((m) => m.expenses));
	};
	const calcTotal = (arr?: number[]) => {
		if (!arr) return '--';
		return arr.reduce((a, b) => a + b);
	};
	const calcAverage = (arr?: number[]) => {
		if (!arr) return '--';
		const avg = arr.reduce((a, b) => a + b) / arr.length;
		return Math.round(avg * 100) / 100;
	};
	const getBarLength = (expenses: number, max: number) => {
		if (expenses === 0) {
			return '0.25rem';
		} else if (expenses === max) {
			return '100%';
		} else {
			return `calc(${expenses} / ${max} * 100%)`;
		}
	};

	return (
		<div className='flex flex-col items-center w-full border border-cinder-200 dark:border-cinder-950 bg-cinder-100 dark:bg-cinder-975 rounded-lg overflow-hidden'>
			<MonthPicker selected={selected} setSelected={setSelected} />
			<hr className='mb-16 h-px rounded-full w-full border-none bg-cinder-200 dark:bg-cinder-950' />
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: `repeat(${data?.length}, minmax(0, 1fr))`,
					gridTemplateRows: '1fr',
				}}
				className={`h-36 w-full gap-x-1 p-4 sm:p-6 transition-all`}
			>
				{!data || isLoading ? (
					<div />
				) : (
					data.map((day, i) => (
						<div
							key={`chart-column-${i + 1}`}
							className='flex flex-col flex-1 shrink-0 flex-grow items-center justify-end group h-full gap-y-1'
						>
							<div className='flex flex-col basis-full shrink-0 items-center justify-end h-full w-full'>
								<div
									style={
										{
											height: getBarLength(day.expenses, findMax(data)),
										} as React.CSSProperties
									}
									className={`relative flex justify-center w-full rounded-sm ${day.expenses === 0 ? 'bg-cinder-300 dark:bg-cinder-500' : 'bg-violet-400'}`}
								>
									<span
										className={`absolute top-0 -mt-6 text-xs font-bold ${day.expenses !== 0 && day.expenses === findMax(data) ? 'block' : 'hidden'} group-hover:block`}
									>
										{day.expenses}€
									</span>
								</div>
							</div>
							<span
								className={`min-h-3 max-h-3 text-xs font-bold text-center text-cinder-500 dark:text-cinder-300 w-full`}
							>
								{i % 2 === 0 ? parseInt(day.date.slice(8, 10)) : ''}
							</span>
						</div>
					))
				)}
			</div>
			<hr className='h-px rounded-full w-full border-none bg-cinder-200 dark:bg-cinder-950 mt-4' />
			<div className='flex flex-col w-full gap-4 mt-0 p-4 sm:p-6'>
				<div className='flex justify-between text-sm font-medium'>
					Per day
					<span className=''>
						{' '}
						{!data ? '0' : calcAverage(data.map((day) => day.expenses))}€{' '}
					</span>
				</div>
				<div className='flex justify-between text-sm font-medium'>
					Total
					<span className=''>
						{!data ? '0' : calcTotal(data.map((day) => day.expenses))}€
					</span>
				</div>
			</div>
		</div>
	);
};
