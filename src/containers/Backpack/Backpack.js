import React, { useContext } from 'react';
import { Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { PokemonsContext } from '../../hooks/usePokemons';
import Ball from '../../components/Ball/Ball';

import './Backpack.css';

const Backpack = () => {
	const pokemonsContext = useContext(PokemonsContext);
	const { myPokemons, addMyPokemons } = pokemonsContext;
	const statTypes = {
		hp: 'HP',
		attack: 'Ataque',
		defense: 'Defensa',
		'special-attack': 'Ataque Especial',
		'special-defense': 'Defensa Especial',
		speed: 'Velocidad'
	};

	const deletePokemon = name => {
		addMyPokemons(pokemons => pokemons.filter(pokemon => pokemon.name !== name));
	};

	return (
		<div className="backpack">
			{myPokemons.length ? (
				<>
					<div className="backpack-list">
						{myPokemons.map(pokemon => (
							<div className="backpack-pokemon" key={pokemon.name}>
								<div className="pokemon-card-header">
									<Typography variant="h6" noWrap component="div" align="center">
										<strong>{pokemon.name.toUpperCase()}</strong>
									</Typography>
									<img
										src={pokemon.sprites.other.home.front_default || pokemon.sprites.front_default}
										alt={pokemon.name}
									/>
								</div>
								<div className="backpack-pokemon-detail">
									{pokemon.stats.map(stat => (
										<span>
											<strong>{statTypes[stat.stat.name]}: </strong>
											{stat.base_stat || '-'}
										</span>
									))}
									<span>
										<strong>Peso: </strong> {pokemon.weight} Kg
									</span>
									<Button
										onClick={() => deletePokemon(pokemon.name)}
										color="error"
										variant="outlined"
										style={{ marginTop: '15px' }}
									>
										Eliminar Pokémon
										<DeleteIcon style={{ margin: '0px 5px' }} />
									</Button>
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<Ball title="No tienes pokemons en tu mochila" />
			)}
		</div>
	);
};

export default Backpack;
