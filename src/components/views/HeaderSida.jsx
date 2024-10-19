/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-08-24
 *     Program : HeaderSida.jsx
 *   Path Name : stagefider/frontend/src/components/views
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - The component takes two elements, such as the title and the image, in order to be displayed in the page headers.
 *
 */
import { Box, Grid, Typography } from "@mui/material";

export default function HeaderSida({ headerTitle, headerImage }) {
  return (
    <>
      <Grid
        container
        spacing={5}
        columnSpacing={{ xs: 2, sm: 2, md: 0 }}
        sx={{
          justifyContent: "center",
          justifyItems: "center",
          display: { xs: "block", sm: "flex" },
          marginBottom: "2rem", // Add some margin at the bottom of the Grid
        }}
      >
        <Grid>
          <Box
            sx={{
              width: { xs: "25.7rem", sm: "80rem" },
              height: { xs: "10rem", sm: "20rem" },
              display: "flex",
              position: "relative", // This allows you to position the text absolutely within the Box
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid gray",
              overflow: "hidden",
            }}
          >
            <img
              src={headerImage}
              alt="example"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Typography
              variant="p3"
              component="p"
              sx={{
                backgroundColor: "transparent",
                color: "#FFF",
                position: "absolute",
                transform: "translate(-40%, -40%)", // Center the text inside the Box
                top: "50%",
                left: "50%",
                zIndex: 10,
                fontSize: { xs: 22, sm: 40 },
              }}
            >
              {headerTitle}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
