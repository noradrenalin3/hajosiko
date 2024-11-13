import {
	useYearSummary,
} from '~/hooks/useQuery/useRecordsSummary';
import { MonthsRecords } from '@shared/types';
import useMobile from '~/hooks/useMobile';
import {
	PiCaretLeftFill as CaretLeft,
	PiCaretRightFill as CaretRight,
} from 'react-icons/pi';
import { useState } from 'react';

const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
const monthNums = [
	'01',
	'02',
	'03',
	'04',
	'05',
	'06',
	'07',
	'08',
	'09',
	'10',
	'11',
	'12',
];
const Col = ({
	month,
	isCurrent,
	labelLen,
}: {
	month: string;
	isCurrent: boolean;
	labelLen: number;
}) => (
	<div className='flex flex-col flex-1 shrink-0 flex-grow items-center justify-end group h-full bg-cinder-975 gap-y-2'>
		<div className='flex flex-col shrink-0 items-center justify-end h-full w-full'>
			<div
				style={{ height: '0.25rem' } as React.CSSProperties}
				className={`relative flex justify-center w-full rounded-sm bg-cinder-500`}
			/>
		</div>
		<span
			className={`text-xs font-bold ${isCurrent ? 'text-cinder-50' : 'text-cinder-300'}`}
		>
			{monthNames[Number(month) - 1].slice(0, labelLen)}
		</span>
	</div>
);
export const YearChart = ({ vehicleId }: { vehicleId: number }) => {
	const currentYear = new Date().getFullYear();
	const [year, setYear] = useState<number>(currentYear);
	const { data, isLoading } = useYearSummary(vehicleId, year);

	const { isMobile } = useMobile();
	const formatMonth = (monStr: string) => {
		const arr = monStr.split('-');
		const result = arr.reverse().join('/');
		return result;
	};
	const getMonthName = (monStr: string) => {
		const max = isMobile ? 1 : 3;
		const result = monthNames[Number(monStr.split('-')[1]) - 1].slice(0, max);
		return result;
	};
	const findMax = (arr: MonthsRecords[]) => {
		return Math.max(...arr.map((m) => m.expenses));
	};
	const calcTotal = (arr: MonthsRecords[]) => {
		return arr.map((r) => r.expenses).reduce((a, b) => a + b);
	};
	const calcAverage = (arr: MonthsRecords[]) => {
		const avg = arr.map((r) => r.expenses).reduce((a, b) => a + b) / arr.length;
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
	const PlaceHolder = () => {
		return monthNums.map((month, i) => (
			<Col
				key={'placeholder-' + i}
				labelLen={isMobile ? 1 : 3}
				month={month}
				isCurrent={month === '12' && year === currentYear}
			/>
		));
	};
	const lastYear = () => setYear(year - 1);
	const nextYear = () => setYear(year + 1);
	return (
		<div className='flex flex-col items-center w-full border border-cinder-200 dark:border-cinder-950 bg-cinder-100 dark:bg-cinder-975 rounded-lg overflow-hidden'>
			<div className='flex items-center justify-between w-full'>
				<button
					className='p-3 text-cinder-800 dark:text-cinder-300'
					onClick={lastYear}
				>
					<CaretLeft className='text-lg' />
				</button>
				<span className='font-semibold text-cinder-1000 dark:text-cinder-50'>
					{`${year}`}
				</span>
				<button
					className='p-3 text-cinder-800 dark:text-cinder-300'
					onClick={nextYear}
				>
					<CaretRight className='text-lg' />
				</button>
			</div>
			<hr className='h-px rounded-full w-full border-none bg-cinder-200 dark:bg-cinder-950' />
			<div className='h-36 flex items-end flex-grow w-full mt-16 gap-x-1 sm:gap-x-3 p-4 sm:p-6'>
				{!data || isLoading ? (
					<PlaceHolder />
				) : (
					data.map((month, i) => (
						<div
							key={`chart-column-${i + 1}`}
							className='flex flex-col flex-1 shrink-0 flex-grow items-center justify-end group h-full gap-y-2'
						>
							<div className='flex flex-col shrink-0 items-center justify-end h-full w-full'>
								<div
									style={
										{
											height: getBarLength(month.expenses, findMax(data)),
										} as React.CSSProperties
									}
									className={`relative flex justify-center w-full rounded-sm ${month.expenses === 0 ? 'bg-cinder-300 dark:bg-cinder-500' : 'bg-violet-400'}`}
								>
									<span
										className={`absolute top-0 ${month.expenses === 0 ? 'hidden' : ''} -mt-6 text-xs font-bold group-hover:block`}
									>
										{month.expenses}€
									</span>
								</div>
							</div>
							<span
								className={`text-xs font-bold ${i === 11 && year === currentYear ? 'text-cinder-900 dark:text-cinder-50' : 'text-cinder-500 dark:text-cinder-300'}`}
							>
								{getMonthName(month.month)}
							</span>
						</div>
					))
				)}
			</div>
			<hr className='h-px rounded-full w-full border-none bg-cinder-200 dark:bg-cinder-950 mt-4' />
			<div className='flex flex-col w-full gap-4 mt-0 p-4 sm:p-6'>
				<div className='flex justify-between text-sm font-medium'>
					Per month
					<span className=''> {!data ? '0' : calcAverage(data)}€ </span>
				</div>
				<div className='flex justify-between text-sm font-medium'>
					Total
					<span className=''>{!data ? '0' : calcTotal(data)}€</span>
				</div>
			</div>
		</div>
	);
};
