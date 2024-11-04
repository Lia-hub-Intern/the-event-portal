// src/components/SpeakerDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { listSpeakers } from '../functions/Functions';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Container,
} from '@mui/material';

const SpeakerDetail = () => {
  const { id } = useParams();
  const speaker = listSpeakers.find((speaker) => speaker.id === id);

  if (!speaker) {
    return (
      <Container sx={{ textAlign: 'center', marginTop: '2rem' }}>
        <Typography variant="h4">Speaker not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Card sx={{ padding: '2rem' }}>
        <Grid container spacing={4}>
          {/* Speaker Image */}
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardMedia
                component="img"
                image={speaker.image}
                alt={speaker.name}
                sx={{
                  width: 300,
                  height: 300,
                  borderRadius: 'o',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Grid>

          {/* Speaker Information */}
          <Grid item xs={12} sm={8}>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {speaker.name}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {speaker.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {speaker.description}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>

        {/* Speaker Videos */}
        {speaker.videos && speaker.videos.length > 0 && (
          <Box sx={{ marginTop: '2rem' }}>
            <Typography variant="h5" gutterBottom>
              Videos
            </Typography>
            <Grid container spacing={4}>
              {speaker.videos.map((video, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
                    <iframe
                      src={video.url}
                      title={video.title}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        border: 0,
                      }}
                      allowFullScreen
                    ></iframe>
                  </Box>
                  <Typography variant="subtitle1" sx={{ marginTop: '0.5rem' }}>
                    {video.title}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Card>
    </Container>
  );
};

export default SpeakerDetail;

