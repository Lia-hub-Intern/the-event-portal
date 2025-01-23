import React, { useState, useEffect } from "react";
import axios from "axios";
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
    const token = sessionStorage.getItem("token") || localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userId;

        axios
          .get(`http://localhost:5000/api/requests/user-requests/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setRequests(response.data || []);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching requests:", err);
            setError("Failed to fetch requests. Please try again later.");
            setLoading(false);
          });
      } catch (err) {
        console.error("Token decoding failed:", err);
        setError("Invalid token. Please log in again.");
        setLoading(false);
      }
    } else {
      setError("No token found. Please log in.");
      setLoading(false);
    }
  }, []);

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
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ marginTop: 1 }}
                  >
                    Created: {new Date(request.created_at).toLocaleString()}
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