import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '~/context/AuthContext';
import {
	PiCaretRightBold as RightIcon,
	PiUser as PersonIcon,
	PiSignOut as LogOutIcon,
	PiMoon as MoonIcon,
	PiGlobeHemisphereWestFill as GlobeIcon,
} from 'react-icons/pi';

import { Switch } from '@headlessui/react';
import { ThemeContext } from '~/context/ThemeContext';

const ThemeSwitch = () => {
	const { dark, toggle } = useContext(ThemeContext);
	return (
		<Switch
			checked={dark}
			onChange={toggle}
			className='group inline-flex h-6 w-11 items-center rounded-full bg-cinder-400 transition data-[checked]:bg-violet-500 dark:data-[checked]:bg-violet-600'
		>
			<span className='size-4 translate-x-1 rounded-full bg-cinder-50 transition group-data-[checked]:translate-x-6' />
		</Switch>
	);
};

const Row = ({ children }: { children: React.ReactNode }) => (
	<div className='hover:bg-cinder-100 dark:hover:bg-cinder-950 rounded-lg flex p-2 gap-4 items-center justify-between font-medium'>
		{children}
	</div>
);
const Settings = () => {
	const { currentUser, signOut } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSignOut = () => {
		signOut();
		navigate('/');
	};

	return (
		<>
			{currentUser ? (
				<>
					<Row>
						<span className=''>{currentUser.email}</span>
					</Row>
					<Row>
						<span className='flex items-center gap-4'>
							<PersonIcon className='text-2xl dark:text-violet-400' />
							Account
						</span>
						<RightIcon className='text-xl dark:text-cinder-300' />
					</Row>
				</>
			) : null}
			<div className='border-t border-cinder-950' />
			<div className='flex p-0 gap-4 items-center justify-between font-medium'>
				<span className='flex items-center gap-4 p-2'>
					<GlobeIcon className='text-2xl dark:text-violet-400' />
					Language
				</span>
				<span className='ml-auto px-2'>
					<select className='cursor-pointer bg-cinder-950 rounded-lg p-2'>
						<option value=''>English</option>
					</select>
				</span>
			</div>
			<Row>
				<MoonIcon className='text-2xl dark:text-violet-400' />
				Dark theme
				<span className='ml-auto'>
					<ThemeSwitch />
				</span>
			</Row>
			{currentUser ? (
				<Row>
					<button onClick={handleSignOut} className='flex grow gap-4'>
						<LogOutIcon className='text-2xl text-cinder-500 dark:text-cinder-500' />
						Sign out
					</button>
				</Row>
			) : null}
		</>
	);
};
export default Settings;
