import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { baseURL } from '../utils/constants';

// Styling
import { styled } from '@mui/material/styles';
import {
	Card,
	Stack,
	Typography,
	Box,
	FormControl,
	FormLabel,
	TextField,
	Button,
} from '@mui/material';

const StyledCard = styled(Card)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: 'auto',
	[theme.breakpoints.up('sm')]: {
		maxWidth: '450px',
	},
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
	height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
	minHeight: '100%',
}));

const LoginForm = () => {
	const initialLoginData = {
		username: '',
		password: '',
	};

	const [loginData, setLoginData] = useState(initialLoginData);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleInputChange = (e) => {
		setLoginData({
			...loginData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(null);

		axios
			.post(`${baseURL}/login/`, loginData)
			.then((res) => {
				const token = res.data.token;

				if (token) {
					localStorage.setItem('token', token);
					navigate('/dashboard');
				} else {
					console.log('No token: ', res.data); // TEMP DEBUG
				}
			})
			.catch((err) => {
				if (err.response) {
					const data = err.response.data;
					const message =
						data.non_field_errors?.[0] ||
						data.detail ||
						'Login failed.';

					setError(message);
				} else {
					setError('Something went wrong. Please try again.');
				}

				console.error('Login error:', err);
			});
	};

	return (
		<>
			<SignInContainer direction="column" justifyContent="space-between">
				<StyledCard variant="outlined">
					<Typography
						component="h1"
						variant="h4"
						sx={{
							width: '100%',
							fontSize: 'clamp(2rem, 10vw, 2.15rem)',
						}}
					>
						Sign in
					</Typography>
					{error && (
						<Box>
							<Typography color="error" sx={{ mb: 1 }}>
								{error}
							</Typography>
						</Box>
					)}
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{
							display: 'flex',
							flexDirection: 'column',
							width: '100%',
							gap: 2,
						}}
					>
						<FormControl>
							<FormLabel htmlFor="username">Username</FormLabel>
							<TextField
								id="username"
								type="username"
								name="username"
								onChange={handleInputChange}
								placeholder="JohnDoe56"
								autoComplete="username"
								autoFocus
								required
								fullWidth
								variant="outlined"
							/>
						</FormControl>
						<FormControl>
							<FormLabel htmlFor="password">Password</FormLabel>
							<TextField
								id="password"
								name="password"
								type="password"
								onChange={handleInputChange}
								placeholder="••••••"
								autoComplete="current-password"
								autoFocus
								required
								fullWidth
								variant="outlined"
							/>
						</FormControl>
						<Button type="submit" fullWidth variant="contained">
							Sign in
						</Button>
					</Box>
				</StyledCard>
			</SignInContainer>
		</>
	);
};

export default LoginForm;
