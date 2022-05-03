import api from './api';

export const listPokemones = (limit, offset) => {
	return api.get(`/pokemon?limit=${limit}&offset=${offset}`);
};

export const getPokemon = value => {
	return api.get(`/pokemon/${value}`);
};
