import { CircularProgress } from '@mui/material';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	/* Your existing theme configuration */
	palette: {
		mode: 'light',
		primary: {
			main: '#3949ab', // #1E3A8A,
		},
		secondary: {
			main: '#F3F4F6', // Change the secondary color to #03045e // #0077b6 // #00b4d8 // #90e0ef // #caf0f8
		},
		background: {
			default: '#FFFFFF', // Set the default background color to #FFFFFF
		},
		success: {
			main: '#F1F8E9', // #DCEDC8, #F5F5DC
		},
	},
	/** Add custom typography styles here */
	typography: {
		fontFamily: "'Roboto', 'Arial', sans-serif", // Change 'Roboto' to the font you want
		p1: { fontSize: 14, textTransform: 'capitalize', fontWeight: 500 }, // Font size for paragraph text
		p2: { marginTop: '1rem', fontSize: 12, fontWeight: 300 }, // Font size for paragraph text
		h1: {},
		h2: {},
		h3: {},
		h4: {},
		h5: {
			fontSize: 20, // Font size for h5 headings
			fontWeight: 500, // Font weight for h5 headings
			//fontWeight: 400, // Font weight for h5 headings
		},
		h6: {
			fontSize: 18, // Font size for h6 headings
			fontWeight: 400, // Font weight for h6 headings
		},
		h6A: {
			fontSize: 14, // Font size for h6 headings
			fontWeight: 400, // Font weight for h6 headings
			paddingBottom: '2rem',
			textTransform: 'capitalize',
		},
		body1: {
			fontSize: 12,
			fontWeight: 300,
			lineHeight: 1.5,
			//fontFamily: "'Open Sans', sans-serif", // Font for body text
		},
	},
	/** Add custom component styles here */
	components: {
		// Customize Material-UI buttons here
		MuiAvatar: {
			styleOverrides: {
				root: {
					backgroundColor: '#DCEDC8', // Rounded corners for buttons
				},
			},
		},
		MuiButton: {
			width: '7rem',
			height: '2rem',
			defaultProps: {
				disableRipple: true,
				disableElevation: true,
				color: 'success', // Set the default button color to secondary
			},
			styleOverrides: {
				root: {
					borderRadius: '10px', // Rounded corners for buttons
				},
			},
		},
		// Customize Material-UI Paper components here
		MuiPaper: {
			styleOverrides: {
				elevation1: {
					boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Custom box shadow for Paper components with elevation 1
				},
				root: {
					//borderRadius: 3, // Rounded corners for Paper components
				},
			},
		},
		MuiAutocomplete: {
			styleOverrides: {
				inputRoot: {
					width: '20rem',
				},
			},
		},
	},
});
