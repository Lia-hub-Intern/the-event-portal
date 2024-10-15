/**
 
Events.jsx*/
import { top100Films, logos, events } from '../functions/Functions';
import {
	Box,
	Card,
	CardMedia,
	CardContent,
	CardActionArea,
	Grid2,
  Typography,
} from '@mui/material';

export default function Events() {
	return (
		<>
			<Grid2 container
				spacing={20}
				rowSpacing={1}
				columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				sx={{
					marginLeft: 20,
					justifyContent: 'center',
					justifyItems: 'center',
					width: '200vh',
					height: '160vh',
					display: { xs: 'block', sm: 'flex' },
				}}
			>
         {events.map(event => (
        <Grid2 item key={event.id} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={event.image}
              alt={event.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {event.title} // Visa titeln
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {event.description} // Lägg till en beskrivning om den finns
                </Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
		</>
	);
}