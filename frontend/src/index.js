import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

// Components
import Layout from './components/layout/Layout';
import Login from './views/Login';
import Dashboard from './views/Dashboard';

// Styling
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import '@fontsource/open-sans';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
	<ThemeProvider theme={theme}>
		<CssBaseline />
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Login />} />
					<Route path="dashboard" element={<Dashboard />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</ThemeProvider>,
);
