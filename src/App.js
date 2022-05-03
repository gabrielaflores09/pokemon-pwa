import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import RoutesApp from './routes/Routes';
import PokemonsProvider from './hooks/usePokemons';

function App() {
	return (
		<PokemonsProvider>
			<ToastContainer theme="colored" />
			<RoutesApp />
		</PokemonsProvider>
	);
}

export default App;
