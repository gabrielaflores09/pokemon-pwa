import React, { useState } from 'react';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom';

import Login from '../containers/Login/Login';
import Pokemones from '../containers/Pokemones/Pokemones';
import Backpack from '../containers/Backpack/Backpack';
import Battle from '../containers/Battle/Battle';
import Profile from '../containers/Profile/Profile';

import Navbar from '../components/Navbar/Navbar';
import PrivateRoute from '../components/PrivateRoute/PrivateRoute';

const RoutesApp = () => {
	const [user] = useState(localStorage.getItem('user') || null);

	return (
		<BrowserRouter>
			{!user ? (
				<Switch>
					<Route exact path="/login" component={Login} />
					<Route
						from="*"
						render={({ location }) => {
							return (
								<Redirect
									to={{
										pathname: '/login',
										state: { from: location }
									}}
								/>
							);
						}}
					/>
				</Switch>
			) : (
				<div>
					<Navbar />
					<Switch>
						<PrivateRoute exact path="/pokemons" component={Pokemones} />
						<PrivateRoute exact path="/mochila" component={Backpack} />
						<PrivateRoute exact path="/batallas" component={Battle} />
						<PrivateRoute exact path="/profile" component={Profile} />
						<Redirect exact path="/" to="/pokemons" />
						<Redirect exact path="/login" to="/pokemons" />
					</Switch>
				</div>
			)}
		</BrowserRouter>
	);
};

export default RoutesApp;
