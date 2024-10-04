import { Box, Grid, Typography } from '@mui/material';

/**
 
HeaderSida*/

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
					<Box
						sx={{
							width: '75rem',
							height: '20rem',
							display: 'flex',
							position: 'relative', // Esto permite posicionar el texto absolutamente dentro del Box
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
						<Typography
							variant="p3"
							component="p"
							sx={{
								backgroundColor: 'transparent',
								color: '#FFF',
								position: 'absolute',
								transform: 'translate(-40%, -40%)', // Centra el texto dentro del Box
								top: '50%',
								left: '50%',
								zIndex: 10,
								fontSize: { xs: 22, sm: 40 },
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
