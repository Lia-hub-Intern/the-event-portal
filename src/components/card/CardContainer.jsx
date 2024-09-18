import React from 'react';
import CustomCard from './Card';
import { Box, Grid } from '@mui/material';

const cards = [
  { title: 'Stay Open-Minded', text: 'Keep an open mind and be receptive to new ideas.' },
  { title: 'Stay Optimistic', text: 'Maintain a positive outlook and encourage others.' },
  { title: 'Work for Love', text: 'Engage in activities driven by passion and love.' },
  { title: 'Lend a Hand', text: 'Offer help and support to those in need.' },
  { title: 'Work Together', text: 'Collaborate with others to achieve common goals.' },
  { title: 'Give Back', text: 'Contribute to the community and support charitable causes.' },
];

const CardContainer = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4} justifyContent="center">
        {cards.map((card, index) => (
          <Grid item key={index}>
            <CustomCard title={card.title} text={card.text} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardContainer;