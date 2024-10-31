import { RouterProvider } from 'react-router-dom';
import router from '~/pages/router';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import toastOptions from '~/constants/toastOptions';

const App = () => {
	return (
		<>
			<RouterProvider router={router} />
			<ToastContainer {...toastOptions} />
		</>
	);
};

export default App;
