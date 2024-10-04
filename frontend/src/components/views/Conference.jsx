import { Box, Grid, Typography } from "@mui/material";
import HeaderSida from "./HeaderSida";

/**
 
Conference.jsx*/
export default function Conference() {
  //<Box sx={{ width: "100%", height: "100%", backgroundColor: "primary.main" }}></Box>

  return (
    <>
      <HeaderSida />
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
        <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
          <Box
            sx={{
              width: "75rem",
              height: "20rem",
              display: "flex",
              position: "relative", // Esto permite posicionar el texto absolutamente dentro del Box
              justifyContent: "center",
              alignItems: "top",
            }}
          >
            <Typography component="h6" variant="h6A">
              Awaken your true power and ignite your unstoppable self
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}