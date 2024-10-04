import { Box, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
	textOverlay: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)', // Center the text
		height: '7rem', // Adjust the height as needed
		width: '18rem', // Adjust the width as needed
		zIndex: 10, // Make sure the button is above the video
	},
});

export default function HeaderSida() {
	const classes = useStyles();

	return (
		<>
			<Grid
				container
				spacing={10}
				rowSpacing={1}
				columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				sx={{
					justifyContent: 'center',
					justifyItems: 'center',
					display: { xs: 'block', sm: 'flex' },
				}}
			>
				<Grid container>
					<Box
						sx={{
							width: '75rem',
							height: '20rem',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							border: '1px solid gray',
							overflow: 'hidden',
							position: 'relative', // Add this line
						}}
					>
						<img
							src="https://static7.depositphotos.com/1000998/745/i/450/depositphotos_7451136-stock-photo-on-conference.jpg"
							alt="example"
							style={{
								width: '100%',
								height: '100%',
								objectFit: 'cover', // Esto ajusta la imagen dentro del Box
							}}
						/>

						<Typography
							component="p"
							variant="p3"
							className={classes.textOverlay}
							sx={{
								backgroundColor: 'transparent',
								color: '#FFF',
							}}
						>
							Partners Phrases
						</Typography>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}
