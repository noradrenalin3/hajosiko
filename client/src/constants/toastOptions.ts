import { Slide, ToastOptions } from 'react-toastify';

const toastOptions: ToastOptions = {
	position: 'top-right',
	autoClose: 5000,
	hideProgressBar: true,
	closeOnClick: true,
	pauseOnHover: true,
	pauseOnFocusLoss: false,
	theme: 'dark',
	className: 'rounded-lg font-medium',
	transition: Slide,
};
export default toastOptions;
