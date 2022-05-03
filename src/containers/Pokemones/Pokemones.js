import React, { useState, useEffect, useContext } from 'react';
import { TextField, Button, Pagination, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { showWarning, showError, showSuccess } from '../../utils/notification';

import { PokemonsContext } from '../../hooks/usePokemons';

import PokeCard from '../../components/PokeCard/PokeCard';
import Loading from '../../components/Loading/Loading';

import { listPokemones, getPokemon } from '../../adapters/pokemonAdapter';
import './Pokemones.css';

const Pokemones = () => {
	const [pokemonName, setPokemonName] = useState(null);
	const [pokemonesData, setPokemonesData] = useState({
		limit: 15,
		offset: 0,
		count: 1,
		pages: 1,
		pokemones: []
	});
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const pokemonsContext = useContext(PokemonsContext);

	const { myPokemons, addMyPokemons } = pokemonsContext;

	const addPokemon = params => {
		if (myPokemons.length === 10) {
			showError('No se puede cargar más de 10 pokemons a la mochila');
			return;
		}
		const existPokemon = myPokemons.some(pokemon => pokemon.name === params.name);
		if (existPokemon) {
			showWarning(`${params.name.toUpperCase()} ya se encuentra en su mochila`);
		} else {
			addMyPokemons([...myPokemons, params]);
			showSuccess(`Se agregó a ${params.name.toUpperCase()} a tu mochila`);
		}
	};

	const getListPokemons = (offsetParam = 0) => {
		const { limit } = pokemonesData;
		setLoading(true);
		listPokemones(limit, offsetParam)
			.then(res => {
				const pokemones = res.pokemones;
				const count = res.count;
				const pages = res.pages;
				const limit = res.limit;
				const offset = res.offset;
				const newListPokemones = [];
				pokemones.forEach((pokemon, i) =>
					getPokemon(pokemon.name)
						.then(resPokemon => {
							newListPokemones.push({ name: pokemon.name, ...resPokemon });
							setPokemonesData({
								limit,
								offset,
								count,
								pages,
								pokemones: newListPokemones
							});
						})
						.catch(err => {
							setLoading(false);
							console.log('Error en vista getPokemon', err);
						})
				);
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			})
			.catch(err => {
				setLoading(false);
				console.log('Error en vista', err);
			});
	};

	const getPaginationList = page => {
		const value = page - 1;
		const valueOffset = value * pokemonesData.limit;
		getListPokemons(valueOffset);
	};

	const shearchPokemon = () => {
		if (!pokemonName.pokemon) {
			getListPokemons();
		} else {
			getPokemon(pokemonName.pokemon)
				.then(resPokemon => {
					setPokemonesData({
						limit: 15,
						offset: 0,
						pages: resPokemon.pages,
						count: resPokemon.count,
						pokemones: [resPokemon]
					});
				})
				.catch(err => {
					console.log('Error en vista getPokemon', err);
					showError(err.toString());
				});
		}
	};

	useEffect(() => {
		getListPokemons();
	}, []);

	const handleChange = e => {
		const name = e.target.name;
		const value = e.target.value;

		const newData = {
			...pokemonName,
			[name]: value
		};
		setPokemonName(newData);
	};
	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div className="pokemones">
					<div className="pokemones-container">
						<TextField
							id="outlined-basic"
							label="Nombre Pokémon"
							variant="outlined"
							name="pokemon"
							style={{ width: 300, margin: 5 }}
							onChange={e => handleChange(e)}
						/>

						<Button
							variant="outlined"
							onClick={() => {}}
							style={{ margin: '7px 15px' }}
							startIcon={<SearchIcon fontSize="inherit" />}
							onClickCapture={() => shearchPokemon()}
						>
							Buscar
						</Button>
					</div>
					<div className="pokemones-container">
						<span>
							Cantidad de pokemons en tu mochila: <strong>{myPokemons.length}</strong>
						</span>
					</div>
					<div className="pokemones-list">
						{pokemonesData.pokemones.length
							? pokemonesData.pokemones.map(pokemon => (
									<PokeCard
										key={pokemon.name}
										name={pokemon.name}
										image={
											pokemon.sprites.other.home.front_default || pokemon.sprites.front_default
										}
										attack={pokemon.stats[1].base_stat}
										defense={pokemon.stats[2].base_stat}
										specialAttack={pokemon.stats[3].base_stat}
										onAdd={() => addPokemon(pokemon)}
									/>
							  ))
							: null}
					</div>
					<div className="pokemones-container">
						<Stack spacing={2}>
							<Pagination
								count={pokemonesData.pages}
								page={page}
								color="primary"
								size="large"
								onChange={(e, p) => {
									getPaginationList(p);
									setPage(p);
								}}
							/>
						</Stack>
					</div>
				</div>
			)}
		</>
	);
};

export default Pokemones;
