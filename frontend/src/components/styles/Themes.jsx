/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-09-15
 *     Program : Themes.jsx
 *   Path Name : stagefider/frontend/src/components/styles
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - Component for general system styles
 *
 */
import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3949ab", // #1E3A8A,
    },
    secondary: {
      main: "#009688", // Change the secondary color to #03045e // #0077b6 // #00b4d8 // #90e0ef // #caf0f8, #009688
    },
    background: {
      default: "#FFFFFF", // Set the default background color to #FFFFFF
    },
    success: {
      main: "#F1F8E9", // #DCEDC8, #F5F5DC
    },
    text: {
      primary: "#000000", // Color para text.primary
      secondary: "#757575", // Color personalizado para text.secondary
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // Change 'Roboto' to the font you want
    p1: { fontSize: 14, textTransform: "capitalize", fontWeight: 500 }, // Font size for paragraph text
    p2: { marginTop: "1rem", fontSize: 12, fontWeight: 300 }, // Font size for paragraph text
    p3: { textTransform: "capitalize", fontWeight: 500 }, // Font size for paragraph text
    p4: { fontSize: 18, textTransform: "capitalize", fontWeight: 500 },
    p5: { fontSize: 14, textTransform: "capitalize", fontWeight: 400 }, // Font size for paragraph text
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {
      fontSize: 20, // Font size for h5 headings
      fontWeight: 500, // Font weight for h5 headings
    },
    h6: {
      fontSize: 18, // Font size for h6 headings
      fontWeight: 400, // Font weight for h6 headings
    },
    h6A: {
      fontWeight: 500, // Font weight for h6 headings
      textTransform: "capitalize",
    },
    body1: {
      fontSize: 12,
      fontWeight: 300,
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#DCEDC8", // Rounded corners for buttons
        },
      },
    },
    MuiButton: {
      width: "7rem",
      height: "2rem",
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        color: "success", // Set the default button color to secondary
      },
      styleOverrides: {
        root: {
          borderRadius: "10px", // Rounded corners for buttons
        },
      },
    },
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
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          width: "20rem",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif", // Change 'Roboto' to the font you want
    p1: { fontSize: 14, textTransform: "capitalize", fontWeight: 500 }, // Font size for paragraph text
    p2: { marginTop: "1rem", fontSize: 12, fontWeight: 300 }, // Font size for paragraph text
    p3: { textTransform: "capitalize", fontWeight: 500 }, // Font size for paragraph text
    p4: { fontSize: 18, textTransform: "capitalize", fontWeight: 500 },
    p5: { fontSize: 14, textTransform: "capitalize", fontWeight: 400 }, // Font size for paragraph text
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {
      fontSize: 20, // Font size for h5 headings
      fontWeight: 500, // Font weight for h5 headings
    },
    h6: {
      fontSize: 18, // Font size for h6 headings
      fontWeight: 400, // Font weight for h6 headings
    },
    h6A: {
      fontWeight: 500, // Font weight for h6 headings
      textTransform: "capitalize",
    },
    body1: {
      fontSize: 12,
      fontWeight: 300,
      lineHeight: 1.5,
    },
    body2: {
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#DCEDC8", // Rounded corners for buttons
        },
      },
    },
    MuiButton: {
      width: "7rem",
      height: "2rem",
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        color: "success", // Set the default button color to secondary
      },
      styleOverrides: {
        root: {
          borderRadius: "10px", // Rounded corners for buttons
        },
      },
    },
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
    MuiAutocomplete: {
      styleOverrides: {
        inputRoot: {
          width: "20rem",
        },
      },
    },
  },
});