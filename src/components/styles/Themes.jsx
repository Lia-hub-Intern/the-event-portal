import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  /* Your existing theme configuration */
  palette: {
    mode: "light",
    primary: {
      main: "#1E3A8A",
    },
    secondary: {
      main: "#F3F4F6", // Change the secondary color to #03045e // #0077b6 // #00b4d8 // #90e0ef // #caf0f8
    },
    background: {
      default: "#FFFFFF", // Set the default background color to #FFFFFF
    },
  },
  /** Add custom typography styles here */
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // Change 'Roboto' to the font you want

    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {
      fontSize: 24, // Font size for h5 headings
      fontWeight: 400, // Font weight for h5 headings
    },
    h6: {
      fontSize: 18, // Font size for h6 headings
      fontWeight: 400, // Font weight for h6 headings
    },
    body1: {
      //fontFamily: "'Open Sans', sans-serif", // Font for body text
    },
  },
  /** Add custom component styles here */
  components: {
    // Customize Material-UI buttons here
    MuiButton: {
      width: "7rem",
      height: "2rem",
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        color: "secondary", // Set the default button color to secondary
      },
      styleOverrides: {
        root: {
          borderRadius: "10px", // Rounded corners for buttons
        },
      },
    },
    // Customize Material-UI Paper components here
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Custom box shadow for Paper components with elevation 1
        },
        root: {
          //borderRadius: 3, // Rounded corners for Paper components
        },
      },
    },
  },
});