import React from 'react';

import pokeball from '../../assets/pokeball.png';

import './Loading.css';

const Loading = props => {
	const { back, title } = props;
	return (
		<div className={`${back ? 'back' : 'page'}`}>
			<div className="page-content">
				<img src={pokeball} className="icon-img" alt="icon" />

				<span>{title || 'Cargando...'}</span>
			</div>
		</div>
	);
};

export default Loading;
