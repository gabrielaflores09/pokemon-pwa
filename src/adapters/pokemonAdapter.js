import {
	listPokemones as listPokemonesService,
	getPokemon as getPokemonService
} from '../services/pokemonesService';

export const listPokemones = (limit, offset) => {
	return new Promise((resolve, reject) => {
		listPokemonesService(limit, offset)
			.then(resList => {
				const listPokemones = resList.data.results;
				let offsetValue = 0;
				if (resList.data.next) {
					// ['offset=30', 'limit=20']
					const splitParams = resList.data.next.split('?')[1].split('&');
					offsetValue = splitParams[0].split('=')[1];
					// const limitValue = splitParams[0].split('=')[1];
				}

				let pokemonesList = {
					count: resList.data.count,
					pages: 75,
					limit,
					offset: offsetValue,
					pokemones: listPokemones
				};
				resolve(pokemonesList);
			})
			.catch(err => reject(err));
	});
};

export const getPokemon = value => {
	return new Promise((resolve, reject) => {
		getPokemonService(value)
			.then(resPokemon => resolve({ ...resPokemon.data, count: 1, pages: 1 }))
			.catch(err => reject(err));
	});
};
