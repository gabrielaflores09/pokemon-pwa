import React, { useState } from 'react';
import {
	AppBar,
	Toolbar,
	Container,
	Typography,
	Box,
	IconButton,
	Menu,
	MenuItem,
	Button,
	Tooltip,
	Avatar,
	Popover
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useHistory } from 'react-router-dom';

import './Navbar.css';
import logo from '../../assets/logo.svg.png';
import logo1 from '../../assets/logo1.png';

const Navbar = () => {
	const [user] = useState(JSON.parse(localStorage.getItem('user')) || null);
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorEl, setAnchorEl] = useState(null);
	const pages = [
		{
			name: 'Pokemones',
			path: '/pokemons'
		},
		{
			name: 'Mi Mochila',
			path: '/mochila'
		},
		{
			name: 'Batallas',
			path: '/batallas'
		}
	];

	const history = useHistory();

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;
	// Nav
	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = (path = null) => {
		setAnchorElNav(null);
		if (path) {
			history.push(path);
		}
	};

	// Popover
	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		localStorage.removeItem('user');
		history.go(0);
	};

	const path = history.location.pathname;
	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
						onClick={() => history.push('/pokemons')}
					>
						<img src={logo} alt="logo-pokemon" className="pokemon-logo" />
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left'
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' }
							}}
						>
							{pages.map(page => (
								<MenuItem
									key={page.name}
									onClick={() => handleCloseNavMenu(page.path)}
									style={page.path === path ? { color: '#1976d2' } : {}}
								>
									<Typography textAlign="center">{page.name}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, cursor: 'pointer' }}
						onClick={() => history.push('/pokemons')}
					>
						<img src={logo} width={100} alt="logo-pokemon" className="" />
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(page => (
							<Button
								key={page.name}
								onClick={() => handleCloseNavMenu(page.path)}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page.name}
							</Button>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Jemina Cardozo">
							<IconButton onClick={handleClick} sx={{ p: 0 }}>
								<Avatar alt="J" src={user ? user.avatar : logo1} />
							</IconButton>
						</Tooltip>
						<Popover
							id={id}
							open={open}
							anchorEl={anchorEl}
							onClose={handleClose}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left'
							}}
						>
							<div className="popover-user">
								<Typography variant="caption" component="div">
									Usuario
								</Typography>
								<Typography variant="subtitle1" noWrap component="div">
									Jemina Cardozo
								</Typography>
								<br />
								<Button
									onClick={() => {
										handleClose();
										history.push('/profile');
									}}
									size="small"
									style={{ width: '100%' }}
								>
									Mi Perfil
								</Button>
								<Button onClick={() => logout()} size="small" style={{ width: '100%' }}>
									Cerrar sesión
								</Button>
							</div>
						</Popover>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default Navbar;
