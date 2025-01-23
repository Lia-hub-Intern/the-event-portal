<<<<<<< HEAD
/**
 * Developer Full Stack: Darwin Rengifo
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
=======
>>>>>>> Requestform/Heba
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
<<<<<<< HEAD
=======
import SocialMediaLinks from "./SocialMediaLinks";
>>>>>>> Requestform/Heba
import { listSpeakers } from "../functions/Functions";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
  MenuItem,
<<<<<<< HEAD
} from "@mui/material";
import { useEffect, useState } from "react";
=======
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // För att använda Link-komponenten för navigation
>>>>>>> Requestform/Heba
import HeaderSida from "./HeaderSida";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Image =
  "https://img.freepik.com/fotos-premium/mujer-esta-pie-frente-gran-multitud-dando-discurso_283836-5657.jpg?w=826";

<<<<<<< HEAD
export default function Speakres({ title }) {
=======
export default function Speakers({ title }) {
>>>>>>> Requestform/Heba
  const [categories, setCategories] = useState([]);
  const [speakers, setSpeakers] = useState(listSpeakers);

  useEffect(() => {
    const listCategories = [
      ...new Set(
        listSpeakers
          .map((res) => res.category.split(",")) // Split the categories into an array
          .flat() // Flattens the resulting array
          .map((category) => category.trim()) // Removes unnecessary whitespace
      ),
    ].map((category) => ({ title: category })); // Creates an object with the title property for each category

    setCategories([...listCategories]);
  }, []);

  const filterSpeakers = (event, newValue) => {
    newValue = newValue.map((value) => value.title.trim().toLowerCase());

    const filter = listSpeakers.filter((speaker) => {
      const categorySpeaker = speaker.category
        .split(",")
        .map((category) => category.trim().toLowerCase());
      const match = categorySpeaker.some((category) =>
        newValue.includes(category.toLowerCase())
      );
      return match;
    });
    if (newValue.length > 0) {
      setSpeakers([...filter]);
    } else {
      setSpeakers([...listSpeakers]);
    }
  };

  return (
    <>
      <HeaderSida headerTitle={"Meet Our Speakers"} headerImage={Image} />
<<<<<<< HEAD
      <Grid
        container
        //spacing={10}
        //rowSpacing={1}
=======
      
      {/* Knapp för att navigera till requestform placerad högst upp */}
      <Box sx={{ textAlign: "center", marginBottom: "2rem" }}>
  <Link to="/requestform">
    <Button variant="contained" color="primary">
      Send a Request
    </Button>
  </Link>
</Box>


      <Grid
        container
>>>>>>> Requestform/Heba
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          justifyContent: "center",
          justifyItems: "center",
          display: { xs: "block", sm: "flex" },
        }}
      >
        <Grid
<<<<<<< HEAD
          container //style={{ minHeight: "80vh" }}
=======
          container
>>>>>>> Requestform/Heba
          sx={{
            item: { xs: 12, sm: 6, md: 4 },
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
<<<<<<< HEAD
              width: { xs: "20rem", sm: "auto" },
=======
              width: { xs: "18rem", sm: "auto" }, // Adjusted width for mobile
>>>>>>> Requestform/Heba
              marginBottom: "1rem ",
            }}
          >
            <Typography
<<<<<<< HEAD
              variant="h4"
=======
              variant="h5" // Adjusted font size for mobile
>>>>>>> Requestform/Heba
              sx={{ marginBottom: "1rem", textAlign: "center" }}
            >
              {title} {/** Title sida */}
            </Typography>

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={categories}
              disableCloseOnSelect
<<<<<<< HEAD
              //value={selectedCategories}
              getOptionLabel={(option) => option.title}
              onChange={filterSpeakers} // Call the filterSpeakers function when the selection changes
              renderOption={(props, option, { selected }) => {
                /** Renders the checkbox and the title of each option */
=======
              getOptionLabel={(option) => option.title}
              onChange={filterSpeakers} // Call the filterSpeakers function when the selection changes
              renderOption={(props, option, { selected }) => {
>>>>>>> Requestform/Heba
                const { key, ...optionProps } = props;

                return (
                  <MenuItem key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </MenuItem>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select your favorite speakers"
                  placeholder="Favorites"
                />
              )}
            />
          </Box>
        </Grid>

        <Grid
          container
<<<<<<< HEAD
          spacing={10}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          //style={{ minHeight: "80vh" }}
=======
          spacing={3} // Reduced spacing for mobile screens
          rowSpacing={3} // Adjusted for mobile screens
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
>>>>>>> Requestform/Heba
          sx={{
            item: { xs: 12, sm: 6, md: 4 },
            justifyContent: "center",
            justifyItems: "center",
<<<<<<< HEAD
            //width: "200vh",
            //height: "160vh",
            //style: { minHeight: "160vh" },
          }}
        >
          {speakers.map((item) => (
            /** CARD: es la cartilla que encierra todo el contenido del card */
            <Card
              key={item.title}
              //component={NavLink} //component del react router
              /** Envia item.title como parametro a DetailProduct */
              //to={`/DetailProduct/${item.title}`}
=======
          }}
        >
          {speakers.map((item) => (
            <Card
              key={item.title}
>>>>>>> Requestform/Heba
              sx={{
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
<<<<<<< HEAD
                width: { xs: "38vh", sm: "50vh" },
                height: { xs: "72vh", sm: "110vh" },
=======
                width: { xs: "80vw", sm: "50vh" }, // Responsive width
                height: { xs: "auto", sm: "110vh" }, // Responsive height
>>>>>>> Requestform/Heba
                marginLeft: { sm: "1rem" },
                marginTop: "2rem",
                textDecoration: "none",
              }}
            >
<<<<<<< HEAD
              {/** Encloses the area of ​​all content */}
              <CardActionArea>
                {/** Encierra la imagen */}
=======
              <CardActionArea>
>>>>>>> Requestform/Heba
                <CardMedia
                  component="img"
                  image={item.image}
                  alt="Card Image"
                  sx={{
<<<<<<< HEAD
                    height: { xs: "48vh", sm: "60vh" },
                    objectFit: "cover",
                  }}
                />

                {/** Encloses all text content */}
                <CardContent
                  sx={{
                    height: "9rem",
=======
                    height: { xs: "30vh", sm: "60vh" }, // Responsive image height
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    height: "auto", // Adjusted for responsiveness
>>>>>>> Requestform/Heba
                    justifyContent: "left",
                    justifyItems: "left",
                  }}
                >
                  <Typography
<<<<<<< HEAD
                    variant="h5"
                    sx={{
                      paddingBottom: "1rem",
=======
                    variant="h6" // Smaller font for mobile screens
                    sx={{
                      paddingBottom: "0.5rem",
>>>>>>> Requestform/Heba
                      textTransform: "capitalize",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
<<<<<<< HEAD
                    variant="p1"
=======
                    variant="subtitle1"
>>>>>>> Requestform/Heba
                    component="p"
                    sx={{ paddingBottom: "0.5rem" }}
                  >
                    {item.title}
                  </Typography>
<<<<<<< HEAD
                  <Typography variant="body1">{item.description}</Typography>
                </CardContent>
              </CardActionArea>
=======
                  <Typography variant="body2">{item.description}</Typography>
                </CardContent>
              </CardActionArea>

              <SocialMediaLinks
                facebook={item.facebook}
                twitter={item.twitter}
                instagram={item.instagram}
                linkedin={item.linkedin}
              />
>>>>>>> Requestform/Heba
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
