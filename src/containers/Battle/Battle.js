import React, { useContext, useState } from 'react';
import { Button, Grid, Modal, Typography, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { PokemonsContext } from '../../hooks/usePokemons';

import PokeCard from '../../components/PokeCard/PokeCard';
import Ball from '../../components/Ball/Ball';
import Loading from '../../components/Loading/Loading';

import { getPokemon } from '../../adapters/pokemonAdapter';

import logoBall from '../../assets/logo-ball.png';

import './Battle.css';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 300,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 3,
	borderRadius: 5,
	textAlign: 'center'
};

const Battle = () => {
	const pokemonsContext = useContext(PokemonsContext);
	const { myPokemons } = pokemonsContext;
	const [loading, setLoading] = useState(false);
	const [fight, setFight] = useState(false);
	const [pokemonSelect, setPokemonSelect] = useState(null);
	const [pokemonRival, setPokemonRival] = useState(null);
	const [winner, setWinner] = useState(null);
	const [rival, setRival] = useState('Rival');

	const [showWinner, setShowWinner] = useState(false);

	const names = ['Clarissa', 'Drako', 'Jeffrey', 'Brisa', 'Thiago'];

	const searchRivalPokemon = () => {
		const rivalIndex = Math.floor(Math.random() * names.length);
		const rivalName = names[rivalIndex];
		setRival(rivalName);
		const idPokemon = Math.round(Math.random() * 150);
		setLoading(true);
		getPokemon(idPokemon)
			.then(resPokemon => {
				setPokemonRival(resPokemon);
				setLoading(false);
			})
			.catch(err => {
				setLoading(false);
				console.log('Error en vista Battle Pokemon', err);
			});
	};

	const pokemonsFight = () => {
		const rivals = [pokemonSelect, pokemonRival];
		const winnerIndex = Math.floor(Math.random() * rivals.length);
		const winnerParamms = rivals[winnerIndex];
		setFight(true);
		setTimeout(() => {
			setShowWinner(true);
			setWinner(winnerParamms);
			setFight(false);
		}, 3000);
	};

	const handleClose = () => {
		setShowWinner(false);
		setWinner(null);
	};
	return (
		<>
			{(loading || fight) && (
				<Loading
					back
					title={
						loading
							? 'Buscando Pokémon'
							: `${pokemonSelect.name.toUpperCase()} vs ${pokemonRival.name.toUpperCase()}`
					}
				/>
			)}
			<div className="battle">
				{myPokemons.length > 2 ? (
					<Grid container>
						<Grid item xs={12} sm={4} md={4}>
							<div style={{ textAlign: 'center' }}>
								<span className="pokemon-label">Tus Pokémons</span>
								<div className="pokemons-battle">
									{myPokemons.map((pokemon, i) => (
										<div key={i} className="poke-battle" onClick={() => setPokemonSelect(pokemon)}>
											<img
												src={
													pokemon.sprites.other.home.front_default || pokemon.sprites.front_default
												}
												alt={`${pokemon.name}-${i}`}
												style={{
													width: 100,
													margin: '0px auto'
												}}
											/>
											{pokemon.name}
										</div>
									))}
								</div>
							</div>
						</Grid>
						<Grid item xs={12} sm={8} md={8}>
							<div style={{ display: 'flex', flex: 'wrap', justifyContent: 'center' }}>
								<Button
									variant="outlined"
									onClick={() => {}}
									style={{ margin: '10px' }}
									startIcon={<SearchIcon fontSize="inherit" />}
									onClickCapture={() => searchRivalPokemon()}
								>
									Buscar Rival
								</Button>
								<Button
									variant="outlined"
									onClick={() => {}}
									style={{ margin: '10px' }}
									onClickCapture={() => pokemonsFight()}
									color="secondary"
									disabled={!pokemonSelect || !pokemonRival}
								>
									Pelear
								</Button>
							</div>
							<div className="pokemons-battle">
								<div className="poke">
									<span className="pokemon-label">Tu Pokémon</span>
									{pokemonSelect ? (
										<PokeCard
											key={pokemonSelect.name}
											name={pokemonSelect.name}
											image={
												pokemonSelect.sprites.other.home.front_default ||
												pokemonSelect.sprites.front_default
											}
											attack={pokemonSelect.stats[1].base_stat}
											defense={pokemonSelect.stats[2].base_stat}
											specialAttack={pokemonSelect.stats[3].base_stat}
										/>
									) : (
										<div className="pokemonCard">
											<img src={logoBall} alt="logoBall" />
											<span>Selecciona Pokémon</span>
										</div>
									)}
								</div>

								<div className="poke">
									<span className="pokemon-label">{rival}</span>
									{pokemonRival ? (
										<PokeCard
											key={pokemonRival.name}
											name={pokemonRival.name}
											image={
												pokemonRival.sprites.other.home.front_default ||
												pokemonRival.sprites.front_default
											}
											attack={pokemonRival.stats[1].base_stat}
											defense={pokemonRival.stats[2].base_stat}
											specialAttack={pokemonRival.stats[3].base_stat}
										/>
									) : (
										<div className="pokemonCard">
											<img src={logoBall} alt="logoBall" />
											<span>Busca rival para tu pokémon</span>
										</div>
									)}
								</div>
							</div>
						</Grid>
					</Grid>
				) : (
					<Ball title="Se requieren al menos tres pokémons para entrar en batallas" />
				)}
			</div>
			<Modal open={showWinner} onClose={handleClose}>
				<Box sx={style}>
					<Typography id="modal-modal-title" variant="h5" align="center">
						<strong>GANADOR</strong>
					</Typography>
					<br />
					<Typography id="modal-modal-title" variant="h6" align="center">
						<strong>{winner && winner.name.toUpperCase()}</strong>
					</Typography>
					{winner && (
						<img
							src={winner.sprites.other.home.front_default || winner.sprites.front_default}
							alt="img-winner"
							style={{ width: 200 }}
						/>
					)}
				</Box>
			</Modal>
		</>
	);
};

export default Battle;
