// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#2F56A6', // NYCC Blue
		},
		secondary: {
			main: '#23417D', // Dark Blue
		},
		text: {
			primary: '#222222', // Black
			secondary: '#666666', // Dark Gray
		},
		background: {
			default: '#F9F9F9', // Off-white
			paper: '#FFFFFF', // White
			appbar: '#FFFFFF', // White
		},
		grey: {
			100: '#E6E6E6', // Light Gray
			300: '#CACACA', // Medium Gray
			600: '#666666', // Dark Gray
		},
		maroon: {
			main: '#800000',
		},
		bloodOrange: {
			main: '#B63F26',
		},
		bronze: {
			main: '#846126',
		},
		forest: {
			main: '#007534',
		},
		blue: {
			main: '#1D5FD6',
		},
		indigo: {
			main: '#3B2483',
		},
		violet: {
			main: '#8744BC',
		},
		brown: {
			main: '#674200',
		},
	},
	typography: {
		fontFamily: 'Open Sans, sans-serif',
		h1: {
			// fontFamily: 'Georgia, serif',
			fontSize: '2.8125rem', // 45px
			lineHeight: 1.2,
		},
		h2: {
			// fontFamily: 'Georgia, serif',
			fontSize: '2.25rem', // 36px
			lineHeight: 1.2,
		},
		h3: {
			// fontFamily: 'Georgia, serif',
			fontSize: '1.75rem', // 28px
			lineHeight: 1.2,
		},
		h4: {
			// fontFamily: 'Georgia, serif',
			fontSize: '1.5rem', // 24px
			lineHeight: 1.2,
		},
		h5: {
			// fontFamily: 'Georgia, serif',
			fontSize: '1.3125rem', // 21px
			lineHeight: 1.2,
		},
		h6: {
			// fontFamily: 'Georgia, serif',
			fontSize: '1.1875rem', // 19px
			lineHeight: 1.2,
		},
		body1: {
			fontSize: '1rem', // 16px
			lineHeight: 1.6,
		},
		body2: {
			fontSize: '0.8125rem', // 13px
			lineHeight: 1.6,
		},
		caption: {
			fontSize: '0.6875rem', // 11px
			lineHeight: 1.6,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none', // Avoids uppercase transformation
					fontWeight: 600,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
					borderRadius: '0px',
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow
					borderRadius: '0px',
				},
			},
		},
	},
});

export default theme;
