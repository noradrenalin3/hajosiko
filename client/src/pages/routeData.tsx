import { RouteObject } from 'react-router-dom';
import Home from '~/pages/Home';
import Cars from '~/pages/Cars';
import Car from '~/pages/Car';
import Maintenance from '~/pages/Maintenance';
import Reminders from '~/pages/Reminders';
import Settings from '~/pages/Settings';
import SignUp from '~/pages/SignUp';
import SignIn from '~/pages/SignIn';

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: 'cars',
		element: <Cars />,
	},
	{
		path: 'cars/:carId',
		element: <Car />,
	},
	{
		path: 'cars/:carId/maintenance',
		element: <Maintenance />,
	},
	{
		path: 'cars/:carId/reminders',
		element: <Reminders />,
	},
	{
		path: 'settings',
		element: <Settings />,
	},
	{
		path: 'reminders',
		element: <Reminders />,
	},
	{
		path: 'signup',
		element: <SignUp />,
	},
	{
		path: 'signin',
		element: <SignIn />,
	},
];

export default routes;
