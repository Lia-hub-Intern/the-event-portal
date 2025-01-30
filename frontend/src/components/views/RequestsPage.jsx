import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  List,
  ListItem,
  Alert,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import jwt_decode from "jwt-decode";

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = sessionStorage.getItem("token") || localStorage.getItem("token");
        console.log("Token being sent:", token);
    
        if (!token) {
          console.log("No token found.");
          setError("No token found.");
          setLoading(false);
          return;
        }
    
        // Decode the token to get user information
        const decodedToken = jwt_decode(token);
        console.log("Decoded Token:", decodedToken);  // Log the decoded token to inspect its contents
    
        const userId = decodedToken.userId; // Make sure this matches the structure of your token
        console.log("Decoded userId:", userId);
    
        if (!userId) {
          console.log("No userId found in token.");
          setError("No userId found in token.");
          setLoading(false);
          return;
        }
    
        // Now fetch the requests using the userId
        const response = await fetch("http://localhost:5000/api/user-requests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Ensure token is attached correctly
          },
        });
    
        console.log("Response status:", response.status); // Log response status for more details
        if (!response.ok) {
          throw new Error(`Failed to fetch requests. Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log("Requests fetched:", data);
        setRequests(data); // Set requests data
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError(error.message); // Set error if any
        setLoading(false); // Set loading to false even if there was an error
      }
    };
    

    fetchRequests();
  }, []); // Empty dependency array to run once on mount

  return (
    <Container
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box sx={{ marginTop: 4, textAlign: "center", width: "100%" }}>
        <Typography variant="h4" gutterBottom>
          My Requests
        </Typography>
      </Box>

      {loading && <CircularProgress sx={{ marginBottom: 2 }} />}

      {error && (
        <Alert severity="error" sx={{ marginBottom: 2, width: "100%" }}>
          {error}
        </Alert>
      )}

      {Array.isArray(requests) && requests.length > 0 ? (
        <Paper
          sx={{
            width: "100%",
            maxWidth: 800,
            marginTop: 4,
            padding: 2,
            borderRadius: 2,
          }}
        >
          <List>
            {requests.map((request, index) => (
              <ListItem
                key={request.id || index}
                sx={{
                  marginBottom: 2,
                  padding: 2,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Typography variant="h6" color="textPrimary" sx={{ fontWeight: "bold" }}>
                    Event Details:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    sx={{ fontWeight: "bold", marginTop: 1 }}
                  >
                    {request.event_details || "No event details available"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
                    Created on: {new Date(request.created_at).toLocaleString()}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      Status: {request.status}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        !loading && (
          <Typography variant="h6" sx={{ marginTop: 2, color: "gray" }}>
            No requests found.
          </Typography>
        )
      )}
    </Container>
  );
};

export default RequestsPage;
