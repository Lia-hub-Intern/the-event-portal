import React, { useState } from "react";
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
  Menu,
  MenuItem,
  Divider,
  ListItemText,
} from "@mui/material";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import DiamondIcon from "@mui/icons-material/Diamond";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../context/AuthContext";
import NavListDrawer from "./NavListDrawer";


export default function Navbar({ navBarLinks }) {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate(); // React Router hook för navigering

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const { sharedAccountId } = useParams(); // För att använda sharedAccountId i URL:en

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      handleMenuClose();
      navigate("/"); // Navigate to the home page
    }
  };

  const handleViewUsersList = () => {
    navigate("/UsersList"); // Navigate to UsersList page
    handleMenuClose(); // Close the menu
  };

  return (
    <>
      <AppBar
        sx={{
          position: { xs: "static", sm: "fixed" },
          backgroundColor: "rgba(57, 73, 171, 1)",
          transition: "background-color 0.3s ease",
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
              color: "white",
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
                sx={{
                  color: "white",
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

          <Box sx={{ display: "flex", alignItems: "center", marginRight: 2 }}>
            {isAuthenticated && (
              <Typography sx={{ color: "white", marginRight: 2 }}>
                Inloggad som {user?.username || "User"}
              </Typography>
            )}
            <Tooltip title={isAuthenticated ? "Account" : "Login"} arrow>
              <IconButton
                color="inherit"
                sx={{ paddingRight: 1 }}
                onClick={handleMenuOpen}
              >
                <PersonIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Menu
  anchorEl={anchorEl}
  open={Boolean(anchorEl)}
  onClose={handleMenuClose}
  MenuListProps={{
    "aria-labelledby": "account-menu",
  }}
>
  {isAuthenticated ? [
    <MenuItem disabled key="username">
      <ListItemText primary={` ${user?.username || "User"}`} />
    </MenuItem>,
    <Divider key="divider" />,
    user?.role !== "speaker" && (
      <MenuItem
        key="add-speaker"
        component={NavLink}
        to="/add-speaker"
        onClick={handleMenuClose}
      >
        Add Speaker
      </MenuItem>
    ),
    user?.shared_account_id && (
      <MenuItem key="view-users-list" onClick={handleViewUsersList}>
        View Users List
      </MenuItem>
    ),
    user?.role === "speaker_agent" && (
      <MenuItem
        key="requests"
        component={NavLink}
        to={`/requests/${sharedAccountId}`} // Dynamisk URL med sharedAccountId
        onClick={handleMenuClose}
      >
        View Requests
      </MenuItem>
    ),
    
    (user?.role !== "speaker_agent" && (
      <MenuItem
        key="user-requests"
        component={NavLink}
        to={`/user-requests`}
        onClick={handleMenuClose}
      >
        My Requests
      </MenuItem>
    )
  ),
    
    <MenuItem key="logout" onClick={handleLogout}>
      Logout
    </MenuItem>
  ] : (
    <MenuItem
      key="login"
      component={NavLink}
      to="/login"
      onClick={handleMenuClose}
    >
      Login
    </MenuItem>
  )}
</Menu>


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