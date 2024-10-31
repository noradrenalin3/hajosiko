import { createBrowserRouter } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import { privateRoutes, publicRoutes } from '~/constants/routes';

const useRouters = () => {
	const { isAuthenticated } = useAuth();

	return createBrowserRouter(
		isAuthenticated ? [...privateRoutes, ...publicRoutes] : [...publicRoutes],
	);
};

export default useRouters;
