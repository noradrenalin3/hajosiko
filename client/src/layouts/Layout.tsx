import MainNav from '~/components/Nav';
import { Outlet } from 'react-router-dom';
import Bar from '~/components/AppBar/Bar';
import VehicleSelect from '~/components/VehicleSelect';
import useAuth from '~/hooks/useAuth';

const Layout = ({ Controls }: { Controls?: React.ReactNode }) => {
	const { isAuthenticated } = useAuth();

	return (
		<div className={'min-h-screen flex flex-col'}>
			<Bar>
				<VehicleSelect />
				{Controls ? Controls : null}
			</Bar>
			<div className='flex flex-col grow gap-4 p-4 sm:p-8 pt-0'>
				<Outlet />
			</div>
			{isAuthenticated ? <MainNav /> : null}
		</div>
	);
};

export default Layout;
