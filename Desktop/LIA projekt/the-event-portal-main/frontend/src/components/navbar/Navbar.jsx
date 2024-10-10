/**
 * Developer Full Stack: Darwin Rengifo
 * css by Nurhussein Ahmed 
 *
 * Create Date: 2024-08-24
 *     Program : Naavbar.jsx
 *   Path Name : stagefider/frontend/src/components/navbar
 *       Tools : NodeJS, React, Material UI
 *
 * Description:
 * - Skapar Navbar-komponenten och visar menyn och undermenyn.
 * - Variabler
 *             h6 : rubrik h6
 *        Navlink : - Denna komponent förhindrar att hela sidan laddas om när
 *                    man går till en menyval.
 *                  - Den exporteras sedan till NavListDrawer som PROPS
 *        onClose : komponent som arbetar med setOpen
 *        setOpen : - true/false
 *                  - visar eller stänger navListDrawer
 *                  - Den exporteras sedan till NavListDrawer som PROPS.
 *             To : "To" ersätter "href" när man arbetar med Navlink-komponenten
 *       flexGrow : Flex-grow CSS-egenskapen sätter flex-växtfaktorn för en flex
 *                  objekts huvudstorlek.
 *
 */

import { useEffect, useState } from 'react';
import {
	AppBar,
	Box,
	Button,
	IconButton,
	Toolbar,
	Typography,
	SvgIcon,
	Tooltip,
	Drawer,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import DiamondIcon from '@mui/icons-material/Diamond';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import NavListDrawer from './NavListDrawer';
import VHeader from '../videos/VHeader';

export default function Navbar({ navBarLinks }) {
	const [open, setOpen] = useState(false);
	const [videoVisible, setVideoVisible] = useState(true); // Status för att styra videons synlighet

	const handleClick = (title) => {
		if (title === 'Home') {
			setVideoVisible(true);
		} else {
			setVideoVisible(false); // Döljer videon när man klickar på menyval
		}
	};

	useEffect(() => {}, [videoVisible]); // Lägg till videoVisible som en beroende för useEffect

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						color="inherit"
						size="large"
						onClick={() => setOpen(true)}
						/** Visar bara "MenuIcon" när det är responsivt */
						sx={{ display: { xs: 'flex', sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>
					<SvgIcon color="inherit" sx={{ display: { xs: 'none', sm: 'flex' } }}>
						<DiamondIcon />
					</SvgIcon>
					<Typography variant="h6" sx={{ flexGrow: 1, paddingLeft: 1 }}>
						StageFinder
					</Typography>
					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navBarLinks.map((item) => (
							<Button
								color="inherit"
								key={item.title}
								component={NavLink} // Komponent för react-router
								to={item.path} // Komponent för react-router
								aria-controls="basic-menu"
								aria-haspopup="true"
								onClick={() => handleClick(item.title)}
								sx={{ margin: '0 10px' }} // Tillägg av marginal för att öka avståndet mellan knapparna
							>
								<Typography variant="h6" sx={{ textTransform: 'capitalize', transition: 'color 0.3s, text-shadow 0.3s', '&:hover': { color: '#FFD700', textShadow: '0 0 10px rgba(255, 215, 0, 0.8)' } }}>
									{item.title}
								</Typography>
							</Button>
						))}
					</Box>
					<Tooltip title="Login" arrow>
						<IconButton
							color="inherit"
							sx={{ display: { xs: 'flex', sm: 'flex' }, paddingRight: 1 }}
							component={NavLink} // Komponent för react-router
							to={'/Login'}
							onClick={() => handleClick('Login')} // Döljer videon när man klickar på Login
						>
							<PersonIcon />
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>
			<Drawer
				open={open}
				anchor="left"
				onClose={() => setOpen(false)}
				sx={{ display: { xs: 'flex', sm: 'none' } }}
			>
				<NavListDrawer
					navBarLinks={navBarLinks}
					NavLink={NavLink}
					setOpen={setOpen}
				/>
			</Drawer>
			{videoVisible && <VHeader />}
		</>
	);
}
