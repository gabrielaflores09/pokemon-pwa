import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
// import azul from '../../assets/azul.jpg';
import './PokeCard.css';

const PokeCard = props => {
	const { name, image, attack, defense, specialAttack, onAdd } = props;
	return (
		<article className="card">
			<div className="card-header">
				{onAdd && (
					<Tooltip title="Agregar a mi mochila">
						<IconButton
							aria-label="AddIcon"
							style={{ float: 'right', color: 'white', border: '1px solid', margin: 10 }}
							onClick={onAdd}
						>
							<AddIcon />
						</IconButton>
					</Tooltip>
				)}
			</div>
			<div className="card-body">
				<img src={image} alt={`${name}`} className="card-body-img" />
				<span className="card-body-title">{name}</span>
			</div>
			<div className="card-footer">
				<div className="card-footer-social">
					<h3>{attack}</h3>
					<p>Ataque</p>
				</div>
				<div className="card-footer-social">
					<h3>{specialAttack}</h3>
					<p>Ataque Especial</p>
				</div>
				<div className="card-footer-social">
					<h3>{defense}</h3>
					<p>Defensa</p>
				</div>
			</div>
		</article>
	);
};

export default PokeCard;
