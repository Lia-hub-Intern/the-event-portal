/**
 * Developer Full Stack: Darwin Rengifo / Alexandra
 *
 * Create Date: 2024-09-10
 *     Program : Speakers.jsx
 *   Path Name : stagefider/frontend/src/components/views
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - Displays a list of speakers with filtering options.
 *
 */
import Checkbox from "@mui/material/Checkbox";
import React from 'react';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Button } from '@mui/material';

import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import HeaderSida from "./HeaderSida";
import { useNavigate } from "react-router-dom";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Image =
  "https://img.freepik.com/fotos-premium/colegas-negocios-hablando-descanso-evento-educativo-centro-convenciones_146105-87527.jpg?w=996";


const listEvents = [
  {
    id: 1, // Unique ID for this event
    title: "ECOMMERCE EXPO",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkgfxZ8OI5bt1jKfORAngaxH3rYDhLHS5cmQ",
    description:
      "The eCommerce Expo is the UK’s leading event for B2B and B2C companies involved in online sales. Held at ExCeL London on September 24-25, 2025, the expo will feature over 200 eCommerce solution providers and 200+ hours of live, accredited content from industry leaders. Attendees can network with 10,000+ senior professionals, discover new technologies, and gain valuable insights into customer experience, logistics, and operations. The event runs alongside the Technology for Marketing Expo, bringing together a diverse range of digital professionals.",
  },
  {
    id: 2,
    title: "CES",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDqnTd9QxbAmj-znKGfwlggG4iKxtc1Epp7Q&s",
    description:
      "CES (Consumer Electronics Show) is one of the largest and most influential tech events in the world, organized by the Consumer Technology Association (CTA). It takes place annually in Las Vegas and showcases cutting-edge innovations across industries such as AI, automotive, robotics, health tech, and smart homes. It draws global attention with keynotes from top industry leaders and serves as a platform for both startups and tech giants to launch new products and solutions.",
  },
  {
    id: 3,
    title: "Finovate Europe",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxDxHjTIh6QgzxapzjKyXW1S0HqZa2EWENw&s",
    description:
      "FinovateEurope is a premier financial technology conference held annually, showcasing the latest innovations in fintech. It features live product demos, insightful presentations, and networking opportunities with industry leaders. The event focuses on emerging trends in banking, payments, lending, blockchain, AI, and more. With its emphasis on cutting-edge technology and forward-thinking solutions, FinovateEurope attracts professionals from across the financial services ecosystem, including startups, investors, and established institutions.",
  },
  {
    id: 4,
    title: "MWC Barcelona",
    image:
      "https://www.mwcbarcelona.com/cdn-cgi/image/f=auto,w=512,h=auto/android-chrome-512x512.png",
    description:
      "MWC Barcelona (Mobile World Congress) is the world’s largest mobile technology event, focusing on the latest innovations in mobile and wireless communication. Hosted annually, it attracts global industry leaders, including tech companies, device manufacturers, network providers, and software developers. The event covers emerging technologies like 5G, artificial intelligence, IoT, and more. MWC Barcelona offers a platform for networking, product showcases, and thought leadership through keynote speeches and panel discussions.",
  },
  {
    id: 5,
    title: "SXSW",
    image:
      "https://www.zenogroup.com/sites/g/files/aatuss621/files/styles/full_hero/public/2024-04/SXSW_Logo_dark-1488498407-compressed.jpg?h=ab15f194&itok=mjFgqb1Zhttps://www.sxsw.com/wp-content/uploads/2018/06/19_SXSW_Evergreen-SEO.png",
    description:
      "SXSW (South by Southwest) is an annual conference held in Austin, Texas, that brings together professionals across a range of industries including technology, film, music, and culture. It offers a mix of keynote speakers, workshops, panels, and networking opportunities. The event is known for highlighting emerging trends in technology, media, and entertainment, and draws global innovators to share insights on the future of these fields.",
  },
  {
    id: 6,
    title: "ODSC",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfi5aFHRs9rmCHQ2fwHzutuj4-XIXf3cDSA&s",
    description:
      "The ODSC (Open Data Science Conference) Boston is a major event focused on data science, artificial intelligence, machine learning, and related fields. It offers a variety of workshops, training sessions, and talks led by industry experts. The event is designed for data professionals at all levels, providing opportunities to explore cutting-edge technologies, discover new tools, and network with fellow practitioners.",
  },
  {
    id: 7,
    title: "RSA Conference",
    image:
      "https://kongre.net/sites/default/files/2021-02/RSA%20Conference%20logos.%20png_0.png",
    description:
      "The RSA Conference USA is a leading cybersecurity event, bringing together industry experts, thought leaders, and professionals to discuss the latest trends and challenges in the field. Attendees can participate in sessions, workshops, and presentations covering topics like cyber threats, data protection, encryption, and governance. The conference provides valuable insights into new technologies, security innovations, and best practices to combat cyber risks. It also offers networking opportunities with peers and experts.",
  },
  {
    id: 8,
    title: "City arts",
    image:
      "https://cdn.sfcityarts.org/wordpress/wp-content/uploads/2018/06/Chairs.Logo_.Square.jpg",
    description:
      "City Arts is a nonprofit organization dedicated to promoting and supporting the arts in the community. They provide various programs, events, and resources to artists and art enthusiasts, fostering creativity and collaboration. Their mission includes enhancing public engagement with the arts through workshops, exhibitions, and educational initiatives. City Arts aims to enrich the cultural landscape and improve the quality of life through artistic expression and community involvement.",
  },
  // More events...
];
export default function Events({ title }) {
  const [titleEvents, setTitleEvents] = useState([]);
  const [events, setEvents] = useState(listEvents);
  const navigate = useNavigate();

  useEffect(() => {
    const filterEvents = [
      ...new Set(listEvents.map((event) => event.title.trim())),
    ].map((category) => ({ title: category }));

    setTitleEvents(filterEvents);
  }, []);

  const filterEvents = (newValue) => {
    const selectedCategories = newValue.map((value) =>
      value.title.trim().toLowerCase()
    );

    const filteredList = listEvents.filter((eventFilter) => {
      const eventCategories = eventFilter.title
        .split(",")
        .map((category) => category.trim().toLowerCase());

      return eventCategories.some((category) =>
        selectedCategories.includes(category)
      );
    });

    setEvents(newValue.length > 0 ? filteredList : listEvents);
  };

  const handleRegisterClick = (item) => {
    navigate("/EventRegistration", { state: { event: item } });
  };

  return (
    <div>
      <HeaderSida headerTitle={"Upcoming events"} headerImage={Image} />

      {/* Participate Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Participate in the next events
        </Typography>
        {/* Add your "Participate" filter or content here */}
      </Box>

      {/* Filter Section */}
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Filter by Categories
        </Typography>
        <Autocomplete
          multiple
          options={titleEvents}
          getOptionLabel={(option) => option.title}
          onChange={(event, newValue) => filterEvents(newValue)}
          renderInput={(params) => <TextField {...params} label="Categories" />}
          sx={{ width: "300px", margin: "0 auto" }}
        />
      </Box>

      {/* Event List Section */}
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Grid container spacing={3} direction="column" alignItems="center">
          {events.map((event) => (
            <Grid item xs={12} key={event.title}>
              <Card
                sx={{
                  width: "100%",
                  maxWidth: "600px", // Öka bredden här
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250" // Anpassa höjden om det behövs
                  image={event.image}
                  alt={event.title}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {event.description}
                  </Typography>
                  <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        padding: "0.5rem 1.5rem",
                        borderRadius: "8px",
                      }}
                      onClick={() => handleRegisterClick(event)}
                    >
                      Register for event
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
