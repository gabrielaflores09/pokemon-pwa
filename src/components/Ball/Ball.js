import React from 'react';

import logoBall from '../../assets/logo-ball.png';
import './Ball.css';

const Ball = props => {
	const { title } = props;
	return (
		<div className="ball">
			<img src={logoBall} alt="logoBall" />
			<span className="title">{title}</span>
		</div>
	);
};

export default Ball;
