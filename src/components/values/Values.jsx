import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const values = [
  { value: 'Learn', text: 'Expand your knowledge and skills.' },
  { value: 'Volunteer', text: 'Offer your time and expertise.' },
  { value: 'Share', text: 'Spread information and resources.' },
  { value: 'Donate', text: 'Contribute financially or materially.' }
];

const Values = () => {
  return (
    <Box
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '20px',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#9a9c9e',
          color: 'rgb(16, 1, 1)',
          display: 'inline-block',
          padding: '0 20px',
          borderRadius: '8px 8px 0 0',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Typography variant="h3">Our Values</Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: '#e0e0e0',
          borderRadius: '8px',
          padding: '5px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '5px',
          position: 'relative',
          zIndex: 1,
          marginTop: '-25px',
          '@media (max-width: 1200px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
          '@media (max-width: 768px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
          },
          '@media (max-width: 480px)': {
            gridTemplateColumns: '1fr',
            padding: '5px',
          },
        }}
      >
        {values.map((item, index) => (
          <Box
            key={index}
            sx={{
              backgroundColor: '#f4f4f4',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Typography variant="h5">{item.value}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.text}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Values;