import MainNav from '~/components/Nav';
import { Outlet } from 'react-router-dom';
import Bar from '~/components/AppBar/Bar';
import Logo from '~/components/Nav/Logo';
import Title from '~/components/AppBar/Title';
import useAuth from '~/hooks/useAuth';

const GeneralLayout = ({
	title,
	Controls,
}: {
	title?: string;
	Controls?: React.ReactNode;
}) => {
	const { currentUser } = useAuth();

	return (
		<div className={'min-h-screen flex flex-col'}>
			<Bar>
				{title ? <Title text='Garage' /> : <Logo />}
				{Controls ? Controls : null}
			</Bar>
			<hr className='h-px border-none bg-cinder-950' />
			<div className='flex flex-col grow gap-4 p-4 sm:p-8'>
				<Outlet />
			</div>
			{currentUser ? <MainNav /> : null}
		</div>
	);
};

export default GeneralLayout;
