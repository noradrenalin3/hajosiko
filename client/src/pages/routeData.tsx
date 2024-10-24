import type { RouteObject } from 'react-router-dom';
import Home from '~/pages/Home';
import Cars from '~/pages/Cars';
import Overview from '~/pages/Car/Overview';
import Maintenance from '~/pages/Maintenance';
import RecordDetails from '~/pages/Maintenance/RecordDetails';
import Reminders from '~/pages/Reminders';
import Settings from '~/pages/Settings';
import SignUp from '~/pages/SignUp';
import SignIn from '~/pages/SignIn';
import NoMatch from '~/pages/Home';

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
		element: <Overview />,
	},
	{
		path: 'settings',
		element: <Settings />,
	},
	{
		path: 'service',
		element: <Maintenance />,
	},
	{
		path: 'service/:recordId',
		element: <RecordDetails />,
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
