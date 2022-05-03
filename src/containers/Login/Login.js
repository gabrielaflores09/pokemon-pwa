import React, { useState } from 'react';
import {
	TextField,
	Button,
	InputAdornment,
	IconButton
	// OutlinedInput,
	// InputLabel,
	// FormControl
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import logoPokemon from '../../assets/logo.svg.png';
import logoUser from '../../assets/pikachu-naruto.png';

import './Login.css';

const Login = () => {
	const history = useHistory();

	const userValid = {
		userNick: 'jcardozo',
		password: 'jcardozo2021'
	};

	const [error, setError] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const [user, setUser] = useState();

	const handleChange = e => {
		if (error) {
			setError(false);
		}
		const name = e.target.name;
		const value = e.target.value;
		const newData = {
			...user,
			[name]: value
		};
		setUser(newData);
	};

	const login = () => {
		if (user.user === userValid.userNick && user.password === userValid.password) {
			setError(false);
			const dataUser = {
				name: 'Jemina',
				lastname: 'Cardozo',
				avatar: logoUser
			};
			localStorage.setItem('user', JSON.stringify(dataUser));
			console.log('Valido');
			history.go(0);
		} else {
			setError(true);
		}
	};

	return (
		<div className="login">
			<div className="login-form">
				<img src={logoPokemon} alt="logo" className="login-logo" />
				<TextField
					id="outlined-basic"
					label="Usuario"
					variant="outlined"
					name="user"
					style={{ marginBottom: 20 }}
					onChange={e => handleChange(e)}
					error={error}
					helperText={`${error ? 'usuario incorrecto' : ''}`}
				/>
				<TextField
					id="outlined-basic"
					label="Contraseña"
					variant="outlined"
					name="password"
					style={{ marginBottom: 20 }}
					onChange={e => handleChange(e)}
					error={error}
					helperText={`${error ? 'contraseña incorrecta' : ''}`}
					type={showPassword ? 'text' : 'password'}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={() => setShowPassword(oldState => !oldState)}
								edge="end"
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
				/>
				{/* <FormControl variant="outlined" sx={{ m: 1, width: '26ch' }}>
					<InputLabel htmlFor="password">Contraseña</InputLabel>
					<OutlinedInput
						id="password"
						type={showPassword ? 'text' : 'password'}
						// value={values.password}
						onChange={e => handleChange(e)}
						name="password"
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowPassword(oldState => !oldState)}
									// onMouseDown={handleMouseDownPassword}
									edge="end"
								>
									{showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
						label="Password"
					/>
				</FormControl> */}

				<Button variant="contained" onClick={() => login()}>
					Ingresar
				</Button>
			</div>
		</div>
	);
};

export default Login;
