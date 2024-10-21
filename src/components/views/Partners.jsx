/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-10-20
 *     Program : Pertners.jsx
 *   Path Name : stagefider/frontend/src/components/views
 *       Tools : NodeJS, React, Mterial UI
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
      <HeaderSida headerTitle={"Partners Phrases"} headerImage={Image} />
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          justifyContent: "center",
          justifyItems: "center",
          display: { xs: "block", sm: "flex" },
        }}
      >
        <Grid
          item
          sx={{
            item: { xs: 12, sm: 6, md: 4 },
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "20rem", sm: "auto" },
              marginBottom: "1rem ",
            }}
          >
            <Typography
              variant="h4"
              sx={{ marginBottom: "1rem", textAlign: "center" }}
            >
              {title} {/** Title sida */}
            </Typography>
          </Box>
        </Grid>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            item: { xs: 12, sm: 6, md: 4 },
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          {listPartners.map((item) => (
            /** CARD: is the booklet that contains all the contents of the card */
            <Card
              key={item.image}
              component={NavLink} //react router component
              to={item.link}
              onClick={(e) => {
                e.preventDefault(); // Prevent NavLink default behavior
                window.open(item.link, "_blank"); // Open link in new tab
              }}
              sx={{
                boxShadow: "none",
                textDecoration: "none",
                width: { xs: "30vh", sm: "40vh" },
                height: { xs: "10vh", sm: "20vh" },
                marginLeft: { sm: "1rem" },
                marginTop: "2rem",
                textDecoration: "none",
              }}
            >
              {/** Encloses the area of ​​all content */}
              <CardActionArea>
                {/** Enclose the image */}
                <CardMedia
                  component="img"
                  image={item.image}
                  alt="Card Image"
                  sx={{
                    height: { xs: "10vh", sm: "20vh" },
                    objectFit: "contain",
                  }}
                />
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
