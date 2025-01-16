/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-09-15
 *     Program : VConference.jsx
 *   Path Name : stagefider/frontend/src/components/videos
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - Displays a video on the Conference page
 *
 */
import ReactPlayer from "react-player";
import { Box, Grid } from "@mui/material";

export default function VConference() {
  return (
    <Box
      sx={{
        display: { xs: "block", sm: "flex" },
        justifyContent: "center", // Centrera horisontellt
        alignItems: "flex-start", // Centrerar vertikalt
      }}
    >
      <Grid
        sx={{
          width: { xs: "23rem", sm: "35rem" },
          height: { xs: "13rem", sm: "20rem" },
          //position: "absolute",
          borderStyle: "solid", // Lägger till en ram
        }}
      >
        <ReactPlayer
          url="/videos/VConference.mp4"
          width="100%"
          height="100%"
          playing
          muted
          loop
        />
      </Grid>
    </Box>
  );
}
