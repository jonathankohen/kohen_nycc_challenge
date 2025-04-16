import React from 'react';

// Styling
import { AppBar, Box, Toolbar } from '@mui/material';

// Assets
import nyccBlueLogo from '../../assets/nycc-wordmark-blue.png';

const Navbar = () => {
	return (
		<Box sx={{ flexGrow: 1, minWidth: '100%' }}>
			<AppBar position="static" sx={{ bgcolor: 'background.appbar' }}>
				<Toolbar>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							flexGrow: 1,
						}}
					>
						<Box
							component="img"
							alt="NYC Council Logo"
							src={nyccBlueLogo}
							sx={{
								height: '2.5rem',
								width: 'auto',
								maxHeight: { xs: '2rem', md: '3rem' },
								mr: 2,
							}}
						/>
					</Box>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
