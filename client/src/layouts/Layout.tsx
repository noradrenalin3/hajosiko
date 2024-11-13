import { Outlet } from 'react-router-dom';
import Bar from '~/components/AppBar/Bar';
import VehicleSelect from '~/components/VehicleSelect';

const Layout = ({ Controls }: { Controls?: React.ReactNode }) => {
	return (
		<div className={'min-h-screen flex flex-col'}>
			<Bar>
				<VehicleSelect />
				{Controls ? Controls : null}
			</Bar>
			<div className='flex flex-col grow gap-4 p-4 sm:p-8'>
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
