import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Login from '../../containers/Login/Login';

const PrivateRoute = props => {
	const [user] = useState(localStorage.getItem('user') || null);
	if (user) {
		return <Route {...props} />;
	} else {
		return <Route exact path="/login" component={Login} />;
	}
};

export default PrivateRoute;
