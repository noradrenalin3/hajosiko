import Home from '~/pages/Home';
import Garage from '~/pages/Garage';
import Car from '~/pages/Car';
import Maintenance from '~/pages/Maintenance';
import RecordDetails from '~/pages/Maintenance/RecordDetails';
import Reminders from '~/pages/Reminders';
import Settings from '~/pages/Settings';
import SignUp from '~/pages/SignUp';
import SignIn from '~/pages/SignIn';
import Layout from '~/layouts/Layout';
import CarControls from '~/components/AppBar/CarControls';
import RecordsControls from '~/components/AppBar/RecordsControls';
import RecordControls from '~/components/AppBar/RecordControls';
import GeneralLayout from '~/layouts/GeneralLayout';
import { Navigate, RouteObject } from 'react-router-dom';
import GarageControls from '~/components/AppBar/GarageControls';

export const privateRoutes: RouteObject[] = [
	{
		path: 'garage',
		element: <GeneralLayout title='Garage' Controls={<GarageControls />} />,
		children: [
			{
				index: true,
				element: <Garage />,
			},
		],
	},
	{
		path: 'car',
		element: <Layout Controls={<CarControls />} />,
		children: [
			{
				index: true,
				element: <Car />,
			},
		],
	},
	{
		path: 'maintenance',
		element: <Layout Controls={<RecordsControls />} />,
		children: [
			{
				index: true,
				element: <Maintenance />,
			},
		],
	},
	{
		path: 'maintenance/:recordId',
		element: <Layout Controls={<RecordControls />} />,
		children: [
			{
				index: true,
				element: <RecordDetails />,
			},
		],
	},
	{
		path: 'reminders',
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Reminders />,
			},
		],
	},
];

export const publicRoutes: RouteObject[] = [
	{
		path: '/',
		element: <GeneralLayout />,
		children: [
			{
				index: true,
				element: <Home />,
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
				path: 'settings',
				element: <Settings />,
			},
		],
	},
	{
		path: '*',
		element: <Navigate replace to={'/'} />,
	},
];
