import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '~/context/AuthContext';
import {
	IoTime as ClockIcon,
	IoCar as CarIcon,
	IoHome as HomeIcon,
	IoBuild as WrenchIcon,
	IoPersonCircle as PersonIcon,
	IoLogOutOutline as LogOutIcon,
	IoMenu as MenuIcon,
	IoSettingsSharp as SettingsIcon,
	IoChevronBack as BackIcon,
} from 'react-icons/io5';

import { MobileLogo as Logo } from '~/components/Nav/Logo';
import Menu from '~/components/Nav/Menu';

import NavLink from '~/components/Nav/NavLink';
import BackButton from '~/components/Nav/BackButton';

/*export const ToolbarButton = ({children, onClick}:{children: JSX.Element, onClick: () => void}) => (
	<button className='p-3 text-2xl' onClick={onClick}>
		{children}
	</button>
);*/
export const Title = ({ text }: { text: string }) => (
	<h1 className='text-cinder-975 dark:text-cinder-100 text-center text-xl font-semibold'>
		{text}
	</h1>
);

const Toolbar = ({
	title,
	children,
}: {
	title?: string;
	children?: ReactNode;
}) => {
	//text-cinder-50 bg-cinder-1000
	return (
		<div
			className={`
			sticky top-0
			gap-2 justify-center
			grid grid-cols-3 items-center
			text-cinder-975 dark:text-cinder-50 dark:bg-cinder-1000
		`}>
		{children}
		</div>
	);
};
/*const Toolbar = ({
	title,
	children,
}: {
	title: string;
	children?: ReactNode;
}) => {
	//text-cinder-50 bg-cinder-1000
	return (
		<div
			className={`
			sticky top-0
			gap-2 justify-center
			grid grid-cols-3 items-center
			text-cinder-700 dark:text-cinder-50 dark:bg-cinder-1000
		`}
		>
			{title === 'Home' ? (
				<Logo />
			) : (
				<>
					{title !== 'Cars' ? <BackButton /> : <div />}
					<h1 className='text-cinder-900 dark:text-cinder-100 text-center text-xl font-semibold'>
						{title}
					</h1>
				</>
			)}
			<div className='ml-auto'>
				{title === 'Cars' ? (
					<AddButton />
				) : (
					<>
						{children ? children : null}
						<Menu />
					</>
				)}
			</div>
		</div>
	);
};*/

export default Toolbar;
