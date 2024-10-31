import { useState } from 'react';
import Switch from '~/components/Button/Switch';
import Separator from '~/components/Separator';
import {
	PiEngine as EngineIcon,
	PiTire as TireIcon,
	PiWrench as WrenchIcon,
	PiCaretRightBold as RightIcon,
} from 'react-icons/pi';
import {
	FaFilter as FilterIcon,
	FaOilCan as OilIcon,
	FaTools as ToolsIcon,
} from 'react-icons/fa';

type ReminderData = {
	id: number;
	name: string;
	interval: number;
	icon?: JSX.Element;
};

const iconClasses = 'text-2xl text-violet-600';
const reminderDefs: ReminderData[] = [
	{
		id: 1,
		name: 'Oil change',
		interval: 5,
		icon: <OilIcon className={iconClasses} />,
	},
	{
		id: 2,
		name: 'Oil filter',
		interval: 5,
		icon: <FilterIcon className={iconClasses} />,
	},
	{
		id: 3,
		name: 'Check oil level',
		interval: 1,
		icon: <OilIcon className={iconClasses} />,
	},
	{
		id: 4,
		name: 'Check tire pressure',
		interval: 1,
		icon: <TireIcon className={iconClasses} />,
	},
	{
		id: 5,
		name: 'Manufacturer Maintenance',
		interval: 12,
		icon: <ToolsIcon className={iconClasses} />,
	},
];

const Reminder = ({
	data,
	editing,
	sep,
}: {
	data: ReminderData;
	editing: boolean;
	sep: boolean;
}) => {
	const [enabled, setEnabled] = useState(false);
	return (
		<div className='flex flex-col px-0'>
			<div className='flex items-center px-4 py-4 gap-4 font-medium rounded-lg'>
				<div className='grid grid-cols-auto grid-rows-2 gap-x-3'>
					<span className='col-span-1 row-span-1'>
						{data.icon ? data.icon : <WrenchIcon className={iconClasses} />}
					</span>
					<span className='col-start-2 font-medium'>{data.name}</span>
					<span className='col-start-2 col-end-2 text-sm dark:text-cinder-300'>
						every {data.interval} months
					</span>
				</div>
				<div className='ml-auto p-3'>
					{editing ? (
						<Switch checked={enabled} onChange={setEnabled} />
					) : (
						<button className='flex items-center dark:text-cinder-300 border border-transparent'>
							<RightIcon className='text-2xl' />
						</button>
					)}
				</div>
			</div>
			{sep ? <hr className='border-none h-px bg-cinder-950' /> : null}
		</div>
	);
};

const Reminders = () => {
	const [editing, setEditing] = useState(false);

	return (
		<div className=''>
			<div className='flex justify-between'>
				<h2 className='p-2 font-semibold dark:text-cinder-200'>
					Scheduled Maintenance
				</h2>
				<button
					onClick={() => setEditing(!editing)}
					className='py-2 px-4 rounded-lg bg-cinder-950 text-cinder-200 font-medium'
				>
					{!editing ? 'Edit' : 'Done'}
				</button>
			</div>
			<div className='flex flex-col dark:bg-cinder-975 rounded-lg'>
				<div className='flex flex-col'>
					{reminderDefs.map((r, i) => (
						<Reminder
							key={r.id}
							data={r}
							sep={i < reminderDefs.length - 1}
							editing={editing}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Reminders;
