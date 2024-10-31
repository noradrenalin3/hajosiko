import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NavbarLink = ({
	to,
	icon,
	text,
}: {
	to: string;
	text: string;
	icon?: ReactNode;
}) => {
	const classes =
		'flex w-1/4 flex-col text-2xl items-center p-4 font-medium rounded-lg hover:text-cinder-700';
	return (
		<NavLink
			to={{ pathname: to }}
			className={({ isActive }: { isActive: boolean }) =>
				[
					//? 'text-cinder-975 dark:text-cinder-50'
					//: 'text-cinder-500 dark:text-cinder-400',
					classes,
					isActive
						? 'text-violet-600 dark:text-cinder-50'
						: 'text-cinder-400 dark:text-cinder-400',
				].join(' ')
			}
		>
			{icon}
			<span className='text-xs hidden'>{text}</span>
		</NavLink>
	);
	//<span className='text-xs hidden'>{text}</span>
};
export default NavbarLink;
