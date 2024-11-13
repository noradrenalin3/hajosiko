import { ServiceRecord } from '@shared/types';
import formatDate from '~/utils/formatDate';
import formatKm from '~/utils/formatKm';
import { Link } from 'react-router-dom';
import useMobile from '~/hooks/useMobile';

const LogEvent = ({ sep, data }: { sep: boolean; data: ServiceRecord }) => {
	return (
		<div className='flex flex-col'>
			<Link to={`${data.id}`} className='p-4 dark:border-cinder-950'>
				<div className='flex justify-between'>
					<h3 className='text-lg font-medium text-cinder-900 dark:text-cinder-100'>
						{data.description}
					</h3>
					<span className='text-md text-cinder-600 dark:text-cinder-300'>
						{formatDate(data.date)}
					</span>
				</div>
				<div className='flex justify-between'>
					<span className='font-medium text-cinder-600 dark:text-cinder-300'>
						{formatKm(data.kilometers)} km
					</span>
					<span className='font-medium'>{data.cost} €</span>
				</div>
			</Link>
			{sep ? <hr className='border-none h-px bg-cinder-950' /> : null}
		</div>
	);
};

const Col = ({ text }: { text: string | number }) => (
	<td className='py-2 px-4 rounded-lg'>{text}</td>
);
const Table = ({ records }: { records: ServiceRecord[] }) => {
	return (
		<div className='rounded-lg border border-cinder-300 dark:border-cinder-950 overflow-hidden'>
			<table className='w-full table-auto rounded-lg overflow-hidden text-cinder-900 dark:text-cinder-200'>
				<thead className='bg-cinder-100 dark:bg-cinder-975 text-cinder-975 dark:text-cinder-100'>
					<tr className='text-left font-semibold'>
						<Col text='Date' />
						<Col text='Odometer' />
						<Col text='Description' />
						<Col text='Cost' />
						<Col text='Notes' />
					</tr>
				</thead>
				<tbody>
					{records.map((record) => (
						<tr
							key={record.id}
							className='border-t border-cinder-950 bg-transparent border-collapse font-medium'
						>
							<Col text={formatDate(record.date)} />
							<Col text={record.kilometers} />
							<Col text={record.description} />
							<Col text={record.cost} />
							<Col text={record.notes || '-'} />
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

const List = ({
	title,
	records,
}: {
	title?: string;
	records: ServiceRecord[];
}) => {
	return (
		<>
			<div className='flex flex-col gap-2'>
				{title ? (
					<h3 className='font-semibold flex items-center gap-1 py-0.5 dark:text-cinder-300'>
						{title}
					</h3>
				) : null}

				<div className='flex flex-col rounded-lg overflow-hidden bg-cinder-100 dark:bg-cinder-975'>
					{records.map((record, i) => {
						return (
							<LogEvent
								sep={i < records.length - 1}
								key={record.id}
								data={record}
							/>
						);
					})}
				</div>
			</div>
		</>
	);
};

const Records = ({ records }: { records: ServiceRecord[] }) => {
	const { isMobile } = useMobile();
	return (
		<>{isMobile ? <List records={records} /> : <Table records={records} />}</>
	);
};

export default Records;
