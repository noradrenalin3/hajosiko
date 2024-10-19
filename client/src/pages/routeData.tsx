import { RouteObject } from 'react-router-dom';
import Home from '~/pages/Home';
import Cars from '~/pages/Cars';
import Overview from '~/pages/Car/Overview';
import Maintenance from '~/pages/Car/Maintenance';
import Reminders from '~/pages/Car/Reminders';
import Settings from '~/pages/Settings';
import SignUp from '~/pages/SignUp';
import SignIn from '~/pages/SignIn';
import NoMatch from '~/pages/Home';

const carRoutes: RouteObject[] = [
	{
		path: 'cars/:carId',
		children: [
			{
				index: true,
				path: '',
				element: <Overview />,
			},
			{
				path: 'maintenance',
				element: <Maintenance />,
			},
			{
				path: 'reminders',
				element: <Reminders />,
			},
		],
	},
];

const routes: RouteObject[] = [
	{
		path: '/',
		element: <Home />,
	},
	{
		path: 'cars',
		element: <Cars />,
	},
	...carRoutes,
	{
		path: 'settings',
		element: <Settings />,
	},
	{
		path: 'service',
		element: <Maintenance />,
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
	{
		path: '*',
		element: <NoMatch />,
	},
];

export default routes;
