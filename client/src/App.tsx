import { RouterProvider } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastOptions from '~/constants/toastOptions';
import useRouters from '~/hooks/useRouters';

const App = () => {
	const router = useRouters();
	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer {...toastOptions} />
		</>
	);
};

export default App;
