import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

const instance = axios.create({
	baseURL: API_URL
});

instance.interceptors.request.use(
	function (config) {
		return config;
	},
	function (err) {
		return Promise.reject(err);
	}
);

instance.interceptors.response.use(
	res => Promise.resolve(res),
	error => Promise.reject(error)
);

export default instance;
