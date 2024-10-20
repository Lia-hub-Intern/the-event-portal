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
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
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
} from "@mui/material";
import { useEffect, useState } from "react";
import HeaderSida from "./HeaderSida";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Image =
  "https://img.freepik.com/fotos-premium/mujer-esta-pie-frente-gran-multitud-dando-discurso_283836-5657.jpg?w=826";

export default function Speakres({ title }) {
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
      <HeaderSida headerTitle={"Partners Phrases"} headerImage={Image} />
      <Grid
        container
        //spacing={10}
        //rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          justifyContent: "center",
          justifyItems: "center",
          display: { xs: "block", sm: "flex" },
        }}
      >
        <Grid
          container //style={{ minHeight: "80vh" }}
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

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={categories}
              disableCloseOnSelect
              //value={selectedCategories}
              getOptionLabel={(option) => option.title}
              onChange={filterSpeakers} // Call the filterSpeakers function when the selection changes
              renderOption={(props, option, { selected }) => {
                /** Renders the checkbox and the title of each option */
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
          spacing={10}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          //style={{ minHeight: "80vh" }}
          sx={{
            item: { xs: 12, sm: 6, md: 4 },
            justifyContent: "center",
            justifyItems: "center",
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
              sx={{
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                width: { xs: "38vh", sm: "50vh" },
                height: { xs: "72vh", sm: "110vh" },
                marginLeft: { sm: "1rem" },
                marginTop: "2rem",
                textDecoration: "none",
              }}
            >
              {/** Encloses the area of ​​all content */}
              <CardActionArea>
                {/** Encierra la imagen */}
                <CardMedia
                  component="img"
                  image={item.image}
                  alt="Card Image"
                  sx={{
                    height: { xs: "48vh", sm: "60vh" },
                    objectFit: "cover",
                  }}
                />

                {/** Encloses all text content */}
                <CardContent
                  sx={{
                    height: "9rem",
                    justifyContent: "left",
                    justifyItems: "left",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      paddingBottom: "1rem",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="p1"
                    component="p"
                    sx={{ paddingBottom: "0.5rem" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body1">{item.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
