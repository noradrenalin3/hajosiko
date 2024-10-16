import { User } from 'firebase/auth';
import { useContext, ReactNode, useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '~/context/AuthContext';
import {
	PiCaretRightBold as RightIcon,
	PiListBold as MenuIcon,
	PiCircleFill as CircleIcon,
	PiUser as PersonIcon,
	PiSignOut as LogOutIcon,
	PiMoon as MoonIcon,
} from 'react-icons/pi';

import { Switch } from '@headlessui/react';
import { ThemeContext } from '~/context/ThemeContext';
import MainLayout from '~/layouts/MainLayout';
import Logo from '~/components/Nav/Logo';

const ThemeSwitch = () => {
	const { dark, toggle } = useContext(ThemeContext);
	return (
		<Switch
			checked={dark}
			onChange={toggle}
			className='group inline-flex h-6 w-11 items-center rounded-full bg-cinder-400 transition data-[checked]:bg-blue-500'
		>
			<span className='size-4 translate-x-1 rounded-full bg-cinder-50 transition group-data-[checked]:translate-x-6' />
		</Switch>
	);
};

const Row = ({ children }: { children: React.ReactNode }) => (
	<div className='hover:bg-cinder-100 hover:dark:bg-cinder-900 rounded-lg flex p-2 gap-4 items-center font-medium'>
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
		<MainLayout>
			<div className=''>
				<Logo />
			</div>
			<div className='border-t border-cinder-950' />
			{currentUser ? (
				<>
					<Row>
						<span>{currentUser.email}</span>
					</Row>
					<Row>
						<PersonIcon className='text-xl' />
						Account
						<RightIcon className='text-xl ml-auto dark:text-cinder-300' />
					</Row>
				</>
			) : null}
			<div className='border-t border-cinder-950' />
			<Row>
				<MoonIcon className='text-2xl' />
				Dark theme
				<span className='ml-auto'>
					<ThemeSwitch />
				</span>
			</Row>
			{currentUser ? (
				<Row>
					<button onClick={handleSignOut} className='flex grow gap-4'>
						<LogOutIcon className='text-2xl text-cinder-500 dark:text-cinder-300' />
						Sign out
					</button>
				</Row>
			) : null}
		</MainLayout>
	);
};
export default Settings;
