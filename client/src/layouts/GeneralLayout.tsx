import { Outlet } from 'react-router-dom';
import Bar from '~/components/AppBar/Bar';
import Logo from '~/components/Nav/Logo';
import Title from '~/components/AppBar/Title';

const GeneralLayout = ({
	title,
	Controls,
}: {
	title?: string;
	Controls?: React.ReactNode;
}) => {
	return (
		<div className={'min-h-screen flex flex-col'}>
			<Bar>
				{title ? <Title text='Garage' /> : <Logo />}
				{Controls ? Controls : null}
			</Bar>
			<div className='flex flex-col grow gap-4 p-4 sm:p-8'>
				<Outlet />
			</div>
		</div>
	);
};

export default GeneralLayout;
