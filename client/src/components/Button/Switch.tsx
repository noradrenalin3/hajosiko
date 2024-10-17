import { Switch } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';

const CustomSwitch = ({
	checked,
	onChange,
}: {
	checked: boolean;
	onChange: Dispatch<SetStateAction<boolean>>;
}) => {
	return (
		<Switch
			checked={checked}
			onChange={onChange}
			className='group inline-flex h-6 w-11 items-center rounded-full bg-cinder-400 transition data-[checked]:bg-blue-500'
		>
			<span className='size-4 translate-x-1 rounded-full bg-cinder-50 transition group-data-[checked]:translate-x-6' />
		</Switch>
	);
};
export default CustomSwitch;
