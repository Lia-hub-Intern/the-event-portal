/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-10-20
 *     Program : ScrollToTopButton.jsx
 *   Path Name : stagefider/frontend/src/components/views
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - button to scroll to the top of the page.
 *
 */

import React from "react";
import { Fab, useTheme } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function ScrollToTopButton() {
  const theme = useTheme(); // Get the current topic

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling effect
    });
  };

  return (
    <Fab
      onClick={scrollToTop}
      size="small" // Resize to small
      sx={{
        position: "fixed",
        bottom: "20px", // Adjust the vertical position
        right: "20px", // Adjust the horizontal position
        backgroundColor: "transparent", // Make the background transparent
        color: theme.palette.primary.main, // Icon color (you can change it) "#3f51b5"
        border: `2px solid ${theme.palette.primary.main}`, // Edge of the FAB
        width: "40px", // Change the button size
        height: "40px", // Change the button size
        transition: "background-color 0.3s, transform 0.3s", // Smooth transition
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = theme.palette.action.hover; // Background color on hover
        e.currentTarget.style.transform = "scale(1.1)"; //Hover boost effect
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "transparent"; // Restore the background
        e.currentTarget.style.transform = "scale(1)"; // Restore size
      }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
}
