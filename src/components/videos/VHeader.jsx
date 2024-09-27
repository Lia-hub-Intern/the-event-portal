import ReactPlayer from "react-player";
import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  playerWrapper: {
    display: "flex",
    justifyContent: "center", // Centra horizontalmente
    alignItems: "center", // Centra verticalmente
    height: "45rem", // Hace que el contenedor ocupe toda la altura de la ventana
  },
  reactPlayer: {
    position: "relative",
  },
  buttonOverlay: {
    position: "absolute",
    //top: "50%",
    left: "50%",
    height: "7rem", // Adjust the height as needed
    width: "18rem", // Adjust the width as needed
    transform: "translate(-50%, -350%)", // To center the button absolutely
    zIndex: 10, // Make sure the button is above the video
  },
});

export default function VHeader() {
  const classes = useStyles();
  // Get the current year
  const currentYear = new Date().getFullYear();
  // Get the next year
  const nextYear = currentYear + 1;

  const handleButtonClick = () => {
    alert("Botón clickeado");
  };
  return (
    <Box
      sx={{ display: { xs: "none", sm: "block" } }}
      className={classes.playerWrapper}
    >
      <Grid sx={{ position: "relative" }}>
        <ReactPlayer
          className={classes.reactPlayer}
          url="/videos/Header.mp4"
          width="80rem"
          height="45rem"
          playing
          muted
          loop
        />
        <Button
          variant="contained"
          color="success"
          className={classes.buttonOverlay}
          onClick={handleButtonClick}
          sx={{
            backgroundColor: "transparent",
            border: "2px solid #FFF",
            color: "#FFF",
            //"&:hover": {
            //backgroundColor: "rgba(0, 0, 0, 0.1)", // Color al pasar el cursor
            //},
          }}
        >
          <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
            Register for our upcoming innovation events {currentYear + " "}-
            {" " + nextYear}
          </Typography>
        </Button>
      </Grid>
    </Box>
  );
}
