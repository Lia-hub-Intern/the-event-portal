/*
CssBaseline: Material UI provides an optional CssBaseline component. It fixes some inconsistencies across browsers and devices while providing defaults that better fit the Material UI than alternative global stylesheets like normalize.css.
CssBaseline includes a set of CSS rules that set values ​​for properties like font, margins, padding, and more. These rules are applied to the entire application and ensure that all components have a consistent appearance.
**/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { HashRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./components/styles/Themes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <CssBaseline /> {/** Reset all base styles and use Roboto font**/}
        <App />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);
