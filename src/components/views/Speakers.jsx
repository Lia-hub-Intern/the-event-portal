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
      <Grid
        container
        spacing={10}
        rowSpacing={1}
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
            <Typography variant="h4">
              Speakers list
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
                width: { xs: "38vh", sm: "40vh" },
                height: { xs: "72vh", sm: "95vh" },
                marginLeft: { sm: "1rem" },
                marginTop: "2rem",
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
                  sx={{ height: "48vh" }}
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
                  <Typography variant="p2" component="">
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
