/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-08-24
 *     Program : Navbar.jsx
 *   Path Name : stagefider/frontend/src/components/navbar
 *       Tools : NodeJS, React, Mteria UI
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
import { useState } from "react";
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

import { NavLink } from "react-router-dom";
import DiamondIcon from "@mui/icons-material/Diamond";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import NavListDrawer from "./NavListDrawer";

export default function Navbar({ navBarLinks }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            /** aqui solo aparece el boton "MenuIcon" solo cuando es responsiv */
            sx={{ display: { xs: "flex", sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/** aqui igual */}
          <SvgIcon color="inherit" sx={{ display: { xs: "none", sm: "flex" } }}>
            <DiamondIcon />
          </SvgIcon>
          <Typography variant="h6" sx={{ flexGrow: 1, paddingLeft: 1 }}>
            StageFinder
          </Typography>
          {/** Shows the horizontal menu options.
           * here the vertical menu options disappear
           * when in responsive mode */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navBarLinks.map((item, index) => (
              <Button
                color="inherit"
                key={item.title}
                component={NavLink} //component  react router
                to={item.path} //component  react routers
                aria-controls="basic-menu"
                aria-haspopup="true"
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
              sx={{ display: { xs: "flex", sm: "flex" }, paddingRight: 1 }}
              component={NavLink} //component  react router
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
    </>
  );
}