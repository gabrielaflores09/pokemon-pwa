import React, { useState } from 'react';
import { Typography, Grid, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

import logo7 from '../../assets/pikachu-naruto.png';
import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';
import logo3 from '../../assets/logo3.png';
import logo4 from '../../assets/logo4.png';
import logo5 from '../../assets/logo5.png';
import logo6 from '../../assets/logo6.png';

import './Profile.css';
const Profile = () => {
	const profileData = JSON.parse(localStorage.getItem('user'));
	const [newAvatar, setNewAvatar] = useState(null);

	const history = useHistory();

	const optionsImages = [
		{
			id: 1,
			avatar: logo1
		},
		{
			id: 2,
			avatar: logo2
		},
		{
			id: 3,
			avatar: logo3
		},
		{
			id: 4,
			avatar: logo4
		},
		{
			id: 5,
			avatar: logo5
		},
		{
			id: 6,
			avatar: logo6
		},
		{
			id: 7,
			avatar: logo7
		}
	];

	const changeProfile = value => {
		setNewAvatar(value);
	};

	const saveChanges = () => {
		localStorage.setItem('user', JSON.stringify({ ...profileData, avatar: newAvatar }));
		history.go(0);
	};
	return (
		<div className="profile">
			<Grid container>
				<Grid item xs={12} sm={4} md={4}>
					<div className="profile profile-user">
						<Typography variant="h6" noWrap component="div" className="profile-title">
							{profileData.name} {profileData.lastname}
						</Typography>
						<hr />
						<img alt="img-profile" src={newAvatar || profileData.avatar} />
					</div>
				</Grid>
				<Grid item xs={12} sm={8} md={8}>
					<div className="profile">
						<Typography variant="h6" noWrap component="div" className="profile-title">
							Elije foto de perfil
						</Typography>
						<hr />
						<div className="profile-view">
							{optionsImages.map(opt => (
								<div
									key={opt.id}
									className="image-profile "
									onClick={() => changeProfile(opt.avatar)}
								>
									<img
										src={opt.avatar}
										alt={opt.id}
										style={{
											width: 100,
											height: 100,
											margin: '0px auto',
											borderRadius: 10
										}}
									/>
								</div>
							))}
						</div>
					</div>
				</Grid>
			</Grid>
			<Button
				variant="outlined"
				onClick={() => {}}
				style={{ margin: '10px', float: 'right' }}
				onClickCapture={() => saveChanges()}
			>
				Guardar Cambios
			</Button>
		</div>
	);
};

export default Profile;
