//import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React from 'react';
import HandshakeIcon from "@mui/icons-material/Handshake";
import GroupsIcon from "@mui/icons-material/Groups";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { NavLink } from "react-router-dom";

const iconMap = {
  "Stay Open-Minded": EmojiObjectsIcon,
  "Stay Optimistic": EmojiEmotionsIcon,
  "Work for Love": FavoriteIcon,
  "Lend a Hand": HandshakeIcon,
  "Work Together": GroupsIcon,
  "Give Back": CardGiftcardIcon,
};

export default function CustomCard({ title, text, link }) {
  const IconComponent = iconMap[title] || EmojiObjectsIcon;

  return (
    <>
      {/*<Link to={link} style={{ textDecoration: "none" }}>*/}
      <Card
        component={NavLink} //component  react router
        to={"/"}
        sx={{
          textDecoration: "none",
          maxWidth: 300,
          margin: "10px",
          transition: "transform 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardMedia
          component="div"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <IconComponent />
        </CardMedia>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
      </Card>
      {/*</Link>*/}
    </>
  );
}
