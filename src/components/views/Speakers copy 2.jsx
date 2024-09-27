/**
 * 1. Import the `useState` hook from React.
 */
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { top100Films, logos } from "../functions/Functions";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
} from "@mui/material";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function Speakres() {
  return (
    <>
      {/*<Box>
        <Grid container>
          <Typography variant="h3">
            Events
            <Typography />
          </Typography>

          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={top100Films}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              );
            }}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Checkboxes"
                placeholder="Favorites"
              />
            )}
          />
        </Grid>
        <Grid>
          {logos.map((item) => (
            <Card
              key={item.logo}
              sx={{
                marginLeft: { xs: 2, sm: 12 },
                marginTop: 2,
                boxShadow: "none",
                textDecoration: "none",
                display: { xs: "block", sm: "flex" },
                height: { xs: "36rem", sm: "20rem" },
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardMedia
                  component="img"
                  image={item.logo}
                  alt="Card Image"
                  sx={{
                    paddingTop: 1,
                    width: { xs: "15rem", sm: "18rem" },
                    marginLeft: { xs: "3rem", sm: "0rem" },
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: { xs: "block", sm: "flex" },
                  //display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{
                    justifyContent: "right",
                    justifyItems: "right",
                  }}
                >
                  <Typography
                    component="span"
                    sx={{
                      fontSize: 40,
                      fontWeight: 400,
                      lineHeight: "2rem",
                    }}
                  >
                    {item.tite}
                  </Typography>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Grid>
      </Box>*/}

      <Grid
        container
        spacing={10}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          justifyContent: "center",
          justifyItems: "center",
          //width: "200vh",
          //height: "10vh",
          display: { xs: "block", sm: "flex" },
        }}
      >
        <Box sx={{ marginBottom: "1rem " }}>
          <Typography variant="h3">
            Events
            <Typography />
          </Typography>

          <Autocomplete
            multiple
            id="checkboxes-tags-demo"
            options={top100Films}
            disableCloseOnSelect
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li key={key} {...optionProps}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.title}
                </li>
              );
            }}
            //style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Checkboxes"
                placeholder="Favorites"
              />
            )}
          />
        </Box>
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
          {logos.map((item) => (
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
                width: "35vh",
                height: "70vh",
                marginLeft: 2,
                marginTop: 2,
                textDecoration: "none",
              }}
            >
              {/** Enciera el area de todo el contenido */}
              <CardActionArea>
                {/** Encierra la imagen */}
                <CardMedia
                  component="img"
                  image={item.image}
                  alt="Card Image"
                  sx={{ height: "40vh" }}
                />

                {/** Encierra todo el contenido de texto */}
                <CardContent
                  sx={{
                    height: "9rem",
                    justifyContent: "left",
                    justifyItems: "left",
                  }}
                >
                  <Typography
                    component="h2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    component="p"
                    sx={{ fontSize: 12, fontWeight: 300 }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
