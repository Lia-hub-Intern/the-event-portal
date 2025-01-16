import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import jwt_decode from "jwt-decode";
import {
  Box,
  CircularProgress,
  Typography,
  Alert,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const UsersList = () => {
  const { user } = useAuth(); // Get user from context
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to check if the token is expired
  const checkTokenExpiration = (token) => {
    if (token) {
      const decodedToken = jwt_decode(token);
      const tokenExpiration = decodedToken.exp;
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);

      console.log("Token Expiration (exp):", tokenExpiration);
      console.log("Current Time:", currentTimeInSeconds);

      if (tokenExpiration < currentTimeInSeconds) {
        console.log('Token has expired');
        return false;  // Token is expired
      } else {
        console.log('Token is still valid');
        return true;  // Token is valid
      }
    } else {
      console.log('No token found');
      return false;  // No token found
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading

      const token = sessionStorage.getItem('token') || localStorage.getItem('token');


      console.log("Token from localStorage:", token); // Log the token to check

      if (!token) {
        setError("No token found");
        setLoading(false); // Stop loading if no token
        return;
      }

      // Perform token expiration check before fetching data
      if (!checkTokenExpiration(token)) {
        setError("Token has expired");
        setLoading(false); // Stop loading if token is expired
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.statusText}`);
        }

        const data = await response.json();
        setUsers(data); // Update users state
        setError(null); // Clear any previous errors
      } catch (error) {
        setError(error.message); // Set error message in state
        setUsers([]); // Clear users if error occurs
      } finally {
        setLoading(false); // Stop loading after fetch
      }
    };

    if (user) {
      fetchUsers(); // Fetch users if there's a logged-in user
    } else {
      setError("User is not logged in");
      setLoading(false); // Stop loading if no user is logged in
    }
  }, [user]); // Trigger fetch when user changes

  return (
    <Box
      sx={{
        margin: "40px auto",
        marginTop: "80px",
        maxWidth: "700px",
        textAlign: "center",
        padding: "20px",
        backgroundColor: "rgba(250, 250, 250, 1)",
        borderRadius: "8px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#333", marginBottom: "20px" }}
      >
        Users linked to the account
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ marginTop: "20px" }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Box sx={{ marginTop: "20px" }}>
          {users.length === 0 ? (
            <Typography variant="body1" color="textSecondary">
              Inga användare hittades.
            </Typography>
          ) : (
            <Card sx={{ backgroundColor: "rgba(245, 245, 245, 1)", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{
                    marginBottom: "15px",
                    color: "rgba(57, 73, 171, 1)",
                    fontWeight: "bold",
                  }}
                >
                  Userlist
                </Typography>
                <List>
                  {users.map((userItem, index) => (
                    <ListItem key={index} divider sx={{ "&:hover": { backgroundColor: "rgba(57, 73, 171, 0.1)" } }}>
                      <ListItemText primary={userItem.username} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          )}
        </Box>
      )}
    </Box>
  );
};

export default UsersList;
