/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-09-08
 *     Program : App.jsx
 *   Path Name : stagefinder/frontend/src/components/navbar
 *       Tools : NodeJS, React, Mteria UI
 *
 * Description:
 * - Create the list for menu options and submenus.
 * - Variabler
 *    navArrayLinks : This PROPOS is received from App.jsx
 *          NavLink : This PROPOS is received from Navbar.jsx
 *          setOpen : This PROPOS is received from Navbar.jsx
 *    Routes, Route : true/false
 */

import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export default function NavListDrawer({ navBarLinks, NavLink, setOpen }) {
  return (
    <Box sx={{ width: 250 }}>
      <nav>
        <List>
          <ListItem sx={{ marginBottom: 3, paddingLeft: 3 }}>
            <ListItemText primary="StageFinder"></ListItemText>
          </ListItem>
        </List>
        <List>
          {navBarLinks.map((item) => (
            <ListItem sx={{ marginTop: -3 }} key={item.title}>
              <ListItemButton
                sx={{ paddingLeft: 0 }}
                component={NavLink}
                to={item.path}
                onClick={() => setOpen(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>
                  <Typography sx={{ textTransform: "capitalize" }}>
                    {item.title}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}
