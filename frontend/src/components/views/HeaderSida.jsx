/**
 * HeaderSida
 */

import { Box, Grid } from '@mui/material';

export default function HeaderSida() {
	return (
		<>
			<Grid container spacing={2}>
				<Grid item={true} xs={12} sm={6} md={6} lg={5}>
					<Box
						sx={{
							width: 300,
							height: 300,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							border: '1px solid gray',
							overflow: 'hidden',
						}}
					>
						<img
							src="https://via.placeholder.com/300"
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
