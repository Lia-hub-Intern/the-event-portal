/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-08-24
 *     Program : Navbar.jsx
 *   Path Name : stagefider/frontend/src/components/navbar
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - create component Navbar and displays the menu and submenu.
 * - Variabler
 *             h6 : header h6
 *        Navlink : - This component prevents the entire page from reloading again when
 *                    accessing a menu option.
 *                  - It is then exported to navListDrawe as PROPS
 *        onClose : component that works with setOpen
 *        setOpen : - true/false
 *                  - display or close the navListDrawer
 *                  - It is then exported to navListDrawe as PROPS.
 *             To : The "To" replaces the "href" when working with the Navlink component
 *       flexGrow : The flex-grow CSS property sets the flex grow factor of a flex
 *                  item's main size.
 *
 */
import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  SvgIcon,
  Tooltip,
  Drawer,
} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import DiamondIcon from "@mui/icons-material/Diamond";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import NavListDrawer from "./NavListDrawer";

export default function Navbar({ navBarLinks }) {
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Hook to get current location (route)
  const location = useLocation();

  useEffect(() => {
    // Every time the location (route) changes, we scroll up
    window.scrollTo(0, 0);
  }, [location]); // This effect is executed every time the route changes

  // Hook to handle the scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // AppBar Initial Color and Scrolled Color
  const appBarColor = "rgba(57, 73, 171, 1)"; // Solid blue
  const scrolledColor = "rgba(66, 165, 245, 0.8)";

  // Set AppBar color based on scroll
  const getBackgroundColor = () => {
    return scrollY > 0 ? scrolledColor : appBarColor; // Change to dark color when scrolling
  };

  return (
    <>
      <AppBar
        sx={{
          position: { xs: "static", sm: "fixed" },
          backgroundColor: getBackgroundColor(),
          transition: "background-color 0.3s ease", // Transición suave del color
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <SvgIcon color="inherit" sx={{ display: { xs: "none", sm: "flex" } }}>
            <DiamondIcon />
          </SvgIcon>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              paddingLeft: 1,
              color: "white", // Letras siempre blancas
            }}
          >
            StageFinder
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navBarLinks.map((item) => (
              <Button
                key={item.title}
                component={NavLink}
                to={item.path}
                aria-controls="basic-menu"
                aria-haspopup="true"
                sx={{
                  color: "white", // Buttons always white
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
              >
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  {item.title}
                </Typography>
              </Button>
            ))}
          </Box>
          <Tooltip title="Login" arrow>
            <IconButton
              color="inherit"
              sx={{ paddingRight: 1 }}
              component={NavLink}
              to={"/Login"}
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <NavListDrawer
          navBarLinks={navBarLinks}
          NavLink={NavLink}
          setOpen={setOpen}
        />
      </Drawer>
      <Box sx={{ marginTop: { xs: "0", sm: "64px" } }}>
        {/* Page content */}
      </Box>
    </>
  );
}
