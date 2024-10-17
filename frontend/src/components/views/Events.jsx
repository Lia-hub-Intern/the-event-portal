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
                  width: '100%', 
                  maxWidth: '350px',
                  height: '300px',
                  marginBottom: '-1px', 
                  textDecoration: 'none',
                  borderBottom: 'none',
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300px"
                    image={event.image}
                    alt={event.title}
                    sx={{ 
                      objectFit: 'cover',
                    }}
                  />
                </CardActionArea>
              </Card>

                <Box
                  onClick={() => handleTitleClick(event.id)}
                  sx={{
                    position: 'absolute',
                    top: '270px', 
                    left: '50%',
                    width: '75%',
                    height: '50px',
                    transform: 'translateX(-50%)',
                    backgroundColor: 'darkgray', 
                    padding: '5px 60px', 
                    cursor: 'pointer',
                    boxShadow: 2,
                    zIndex: 1,
                    display: 'flex',
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <Typography variant="h6" component="span">
                    {event.title}
                  </Typography>
                </Box>
         
              <Card 
                sx={{ 
                  backgroundColor: '#f0f0f0', 
                  width: '100%', 
                  maxWidth: '350px',
                  height: '300px',
                  marginTop: '-1px',
                  borderTop: 'none', 
                }}
              >
                <CardContent sx={{ paddingTop: '30px' }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {event.description} 
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