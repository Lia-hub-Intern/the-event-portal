import { Box, Grid, Typography } from '@mui/material';

/**
 
HeaderSida*/

const useStyles = makeStyles({
	playerWrapper: {
		display: 'flex',
		justifyContent: 'center', // Centra horizontalmente
		alignItems: 'center', // Centra verticalmente
		height: '45rem', // Hace que el contenedor ocupe toda la altura de la ventana
	},
	reactPlayer: {
		position: 'relative',
	},
	buttonOverlay: {
		position: 'absolute',
		//top: "50%",
		left: '50%',
		height: '7rem', // Adjust the height as needed
		width: '18rem', // Adjust the width as needed
		transform: 'translate(-50%, -350%)', // To center the button absolutely
		zIndex: 10, // Make sure the button is above the video
	},
});

export default function HeaderSida() {
	//<Grid item={true} xs={12} sm={6} md={6} lg={5}>

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
				<Grid
					container //style={{ minHeight: "80vh" }}
				>
					<Typography
						variant="h3"
						// component="h1"
						variant="contained"
						color="success"
						className={classes.textOverlay}
						sx={{
							backgroundColor: 'transparent',
							border: '2px solid #FFF',
							color: '#FFF',
						}}
					></Typography>

					<Box
						sx={{
							width: '75rem',
							height: '20rem',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							border: '1px solid gray',
							overflow: 'hidden',
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
					</Box>
				</Grid>
			</Grid>
		</>
	);
}
