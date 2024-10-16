import { useRoutes } from 'react-router-dom';
import routeData from '~/pages/routeData';

const Router = () => {
	const router = useRoutes(routeData);
	return router;
};

export default Router;
