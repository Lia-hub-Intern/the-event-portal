/**
 
Events.jsx*/
import { events } from '../functions/Functions';
import {
	Card,
	CardMedia,
	CardContent,
	CardActionArea,
	Grid2,
  Typography,
  Box,
} from '@mui/material';

export default function Events() {
	return (
		<>
			<Grid2 container
				spacing={5}
				rowSpacing={2}
				columnSpacing={{ xs: 1, sm: 2, md: 3 }}
				sx={{
					justifyContent: 'center',
					display: { xs: 'block', sm: 'flex' },
				}}
			>
          {events.map(event => (
          <Grid2 item key={event.id} xs={12} sm={6} md={4}>
            <Box sx={{ position: 'relative'}}>
              <Card 
                sx={{ 
                  transition: '0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)', 
                  },
                  width: '100%', 
                  maxWidth: '300px',
                  height: '200px',
                  marginBottom: '-1px', 
                  textDecoration: 'none',
                  borderBottom: 'none',
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={event.image}
                    alt={event.title}
                    sx={{ objectFit: 'cover' }}
                  />
                </CardActionArea>
              </Card>

                <Box
                  onClick={() => handleTitleClick(event.id)}
                  sx={{
                    position: 'absolute',
                    top: '180px', 
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'darkgray', 
                    padding: '5px 10px', 
                    cursor: 'pointer',
                    // borderRadius: '4px',
                    boxShadow: 2,
                    zIndex: 1,
                    textAlign: 'center',
                  }}
                >
                  <Typography variant="h6" component="span">
                    {event.title}
                  </Typography>
                </Box>
              {/* <Typography 
                gutterBottom 
                variant="h5" 
                component="div"
                onClick={() => handleTitleClick(event.id)} 
                sx={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                cursor: 'pointer',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#e0e0e0',
                  color: 'primary.main',
                },
              }}
              > */}
              {/* {event.title} */}
              <Card 
                sx={{ 
                  backgroundColor: '#f0f0f0', 
                  width: '100%', 
                  maxWidth: '300px',
                  height: '200px',
                  marginTop: '-1px',
                  borderTop: 'none', 
                }}
              >
                <CardContent sx={{ paddingTop: '30px' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {event.description} // Lägg till en beskrivning om den finns
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid2>
        ))}
      </Grid2>
		</>
	);
}