import { Switch as HeadlessSwitch } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';

const Switch = ({
	checked,
	onChange,
}: {
	checked: boolean;
	onChange: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<HeadlessSwitch
			checked={checked}
			onChange={onChange}
			className='group inline-flex h-6 w-11 items-center rounded-full bg-cinder-400 transition data-[checked]:bg-violet-600'
		>
			<span className='size-4 translate-x-1 rounded-full bg-cinder-50 transition group-data-[checked]:translate-x-6' />
		</HeadlessSwitch>
	);
};
export default Switch;
