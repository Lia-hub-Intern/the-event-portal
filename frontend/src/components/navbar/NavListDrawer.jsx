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
  Divider,
  Fade
} from "@mui/material";

export default function NavListDrawer({ navBarLinks, NavLink, setOpen }) {
  return (
    <Box sx={{ width: 250 }}>
      <nav>
        <List>
          <ListItem sx={{ marginBottom: 3, paddingLeft: 3 }}>
            <ListItemText>
              <Typography component="p" variant="p4" sx={{ 
                fontWeight: 700, 
                color: 'primary.main',
                borderBottom: '2px solid',
                paddingBottom: '8px',
                letterSpacing: '0.5px'
              }}>
                StageFinder
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Divider sx={{ mb: 2 }} />
        <List>
          {navBarLinks.map((item, index) => (
            <Fade in={true} style={{ transitionDelay: `${index * 50}ms` }} key={item.title}>
              <ListItem sx={{ marginTop: -1 }}>
                <ListItemButton
                  sx={{ 
                    paddingLeft: 2,
                    borderRadius: '8px',
                    my: 0.5,
                    '&:hover': {
                      bgcolor: 'rgba(57, 73, 171, 0.08)',
                      transform: 'translateX(5px)',
                      transition: 'transform 0.2s ease-in-out'
                    }
                  }}
                  component={NavLink}
                  to={item.path}
                  onClick={() => setOpen(false)}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText>
                    <Typography
                      component="p"
                      variant="p5"
                      sx={{ 
                        textTransform: "capitalize",
                        fontWeight: 500
                      }}
                    >
                      {item.title}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </Fade>
          ))}
        </List>
      </nav>
    </Box>
  );
}
