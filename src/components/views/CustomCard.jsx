import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faSmile, faHeart, faHandsHelping, faUsers, faGift } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const iconMap = {
  "Stay Open-Minded": faLightbulb,
  "Stay Optimistic": faSmile,
  "Work for Love": faHeart,
  "Lend a Hand": faHandsHelping,
  "Work Together": faUsers,
  "Give Back": faGift,
};

export default function CustomCard({ title, text, link }){
  const icon = iconMap[title] || faLightbulb;

  return (
    <>
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Card sx={{
        maxWidth: 300,
        margin: '10px',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}>
        <CardMedia
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
          }}
        >
          <FontAwesomeIcon icon={icon} size="2x" />
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
      </Card>
    </Link>
    </>
  );
};

