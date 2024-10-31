import {
	PiCarFill as CarIcon,
	PiGearFill as SettingsIcon,
	PiWrenchFill as WrenchIcon,
	PiBellFill as BellIcon,
} from 'react-icons/pi';

import NavbarLink from '~/components/Nav/NavLink';

export const MainNav = () => {
	return (
		<div
			className={`
			sticky bottom-0 w-full flex px-4 gap-2
			bg-cinder-100 dark:bg-cinder-1000 text-cinder-100
			border-t border-cinder-200 dark:border-cinder-950
		`}
		>
			<nav className='flex gap-4 grow justify-evenly'>
				<NavbarLink to='/car' text='Car' icon={<CarIcon />} />
				<NavbarLink
					to='/maintenance'
					text='Maintenance'
					icon={<WrenchIcon />}
				/>
				<NavbarLink to='/reminders' text='Reminders' icon={<BellIcon />} />
				<NavbarLink to='/settings' text='Settings' icon={<SettingsIcon />} />
			</nav>
		</div>
	);
};
