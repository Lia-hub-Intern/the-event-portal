import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip"; // Importera Tooltip
import Tooltip from "@mui/material/Tooltip"; // Importera Tooltip
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import SocialMediaLinks from "./SocialMediaLinks";
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
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // För att använda Link-komponenten för navigation
import HeaderSida from "./HeaderSida";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Image = "https://img.freepik.com/fotos-premium/mujer-esta-pie-frente-gran-multitud-dando-discurso_283836-5657.jpg?w=826";
const Image = "https://img.freepik.com/fotos-premium/mujer-esta-pie-frente-gran-multitud-dando-discurso_283836-5657.jpg?w=826";

export default function Speakers({ title }) {
  const [categories, setCategories] = useState([]);
  const [speakers, setSpeakers] = useState(listSpeakers);

  useEffect(() => {
    const listCategories = [
      ...new Set(
        listSpeakers
          .map((res) => res.category.split(","))
          .flat()
          .map((category) => category.trim())
      ),
    ].map((category) => ({ title: category }));

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
    setSpeakers(newValue.length > 0 ? [...filter] : [...listSpeakers]);
  };

  return (
    <>
      <HeaderSida headerTitle={"Meet Our Speakers"} headerImage={Image} />

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
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          justifyContent: "center",
          justifyItems: "center",
          display: { xs: "block", sm: "flex" },
        }}
      >
        <Grid
          container
          sx={{
            item: { xs: 12, sm: 6, md: 4 },
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "18rem", sm: "auto" }, // Adjusted width for mobile
              marginBottom: "1rem ",
            }}
          >
            <Typography
              variant="h5" // Adjusted font size for mobile
              sx={{ marginBottom: "1rem", textAlign: "center" }}
            >
              {title} {/** Title sida */}
            </Typography>

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={categories}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              onChange={filterSpeakers} // Call the filterSpeakers function when the selection changes
              renderOption={(props, option, { selected }) => {
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
          spacing={3} // Reduced spacing for mobile screens
          rowSpacing={3} // Adjusted for mobile screens
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            item: { xs: 12, sm: 6, md: 4 },
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          {speakers.map((item) => (
            <Card
              key={item.title}
              sx={{
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                width: { xs: "80vw", sm: "50vh" }, // Responsive width
                height: { xs: "auto", sm: "110vh" }, // Responsive height
                marginLeft: { sm: "1rem" },
                marginTop: "2rem",
                textDecoration: "none",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={item.image}
                  alt="Card Image"
                  sx={{
                    height: { xs: "30vh", sm: "60vh" }, // Responsive image height
                    objectFit: "cover",
                  }}
                />
                <CardContent
                  sx={{
                    height: "auto", // Adjusted for responsiveness
                    justifyContent: "left",
                    justifyItems: "left",
                  }}
                >
                  <Typography
                    variant="h6" // Smaller font for mobile screens
                    sx={{
                      paddingBottom: "0.5rem",
                      textTransform: "capitalize",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    sx={{ paddingBottom: "0.5rem" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </CardContent>
              </CardActionArea>

              <SocialMediaLinks
                facebook={item.facebook}
                twitter={item.twitter}
                instagram={item.instagram}
                linkedin={item.linkedin}
              />
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
  );
}