// src/components/Layout.js
import React from 'react';
import { Outlet } from 'react-router';

// Components
import Navbar from './Navbar';

// Styling
import { Container } from '@mui/material';

const Layout = () => {
	return (
		<>
			<Navbar />
			<Container maxWidth="lg">
				<Outlet />
			</Container>
		</>
	);
};

export default Layout;
