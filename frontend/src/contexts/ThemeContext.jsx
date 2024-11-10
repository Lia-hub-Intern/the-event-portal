/**
 * Developer Full Stack: Abenezer Anglo
 *
 * Create Date: 2024-11-10
 *     Program : ThemeContext.jsx
 *   Path Name : stagefider/frontend/src/contexts
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - Provides a context for toggling between light and dark themes.
 *
 */
import React, { createContext, useState, useMemo, useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../components/styles/Themes";

const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const ThemeToggleProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const theme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ThemeToggleContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};