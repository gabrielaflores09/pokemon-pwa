import { toast } from 'react-toastify';

const params = {
	position: 'top-center',
	autoClose: 2000,
	hideProgressBar: false,
	closeOnClick: false,
	pauseOnHover: true,
	draggable: true,
	progress: undefined
};

export const showSuccess = message => {
	toast.success(message, params);
};

export const showWarning = message => {
	toast.warn(message, params);
};

export const showError = message => {
	toast.error(message, params);
};
