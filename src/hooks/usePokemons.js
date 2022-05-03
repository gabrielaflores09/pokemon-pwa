import React, { createContext, useState } from 'react';

const PokemonsContext = createContext();
const PokemonsProvider = ({ children }) => {
	const [myPokemons, addMyPokemons] = useState([]);
	return (
		<PokemonsContext.Provider value={{ myPokemons, addMyPokemons }}>
			{children}
		</PokemonsContext.Provider>
	);
};

export { PokemonsContext };

export default PokemonsProvider;
