/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-10-20
 *     Program : Partners.jsx
 *   Path Name : stagefinder/frontend/src/components/views
 *       Tools : NodeJS, React, Material UI
 *
 * Description:
 * - Displays a list of partners who contribute to the
 *   participation and organization of events.
 *
 */
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  Grid,
} from "@mui/material";
import HeaderSida from "./HeaderSida";
import { NavLink } from "react-router-dom";
import React from 'react';

const Image =
  "https://img.freepik.com/fotos-premium/cierre-apreton-manos-socios-comerciales-oficina_49280-310.jpg?w=826";

const listPartners = [
  {
    link: "https://www.globalization-partners.com/",
    image: "https://www.globalization-partners.com/static/images/g-p-logo.svg",
  },
  {
    link: "https://eic.ec.europa.eu/index_en",
    image:
      "https://eic.ec.europa.eu/sites/default/files/site-logo-overrides/logo-eic.svg",
  },
  {
    link: "https://techdestination.com/",
    image:
      "https://app.techdestination.com/public/assets/assets/images/img-2.png?v=2.1.60",
  },
  {
    link: "https://www.ul.ie/",
    image: "https://www.ul.ie/themes/custom/ul/logo.svg",
  },
  {
    link: "https://ngbs.co.uk/",
    image: "https://ngbs.co.uk/images/logo/logo-main.png",
  },
  {
    link: "https://www.meetinireland.com/",
    image:
      "https://www.meetinireland.com/App_Themes/MII/img/layout/logo-mii.png",
  },
];

export default function Partners({ title }) {
  return (
    <>
      <HeaderSida headerTitle={"Our partners"} headerImage={Image} />
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            {title}
          </Typography>
        </Box>

        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          {listPartners.map((item) => (
            <Grid
              item
              key={item.image}
              xs={12}
              sm={6}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Card
                component={NavLink}
                to={item.link}
                onClick={(e) => {
                  e.preventDefault();
                  window.open(item.link, "_blank");
                }}
                sx={{
                  boxShadow: "none",
                  textDecoration: "none",
                  width: "100%",
                  maxWidth: 300,
                  height: 150,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "1rem",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt="Partner Logo"
                    sx={{
                      maxHeight: 100,
                      objectFit: "contain",
                      padding: "1rem",
                    }}
                  />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
