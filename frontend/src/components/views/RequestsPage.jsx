import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from '@mui/material';
import jwt_decode from 'jwt-decode';

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        if (!token) {
          setError('No token found.');
          setLoading(false);
          return;
        }

        const decodedToken = jwt_decode(token);
        setUserRole(decodedToken.role);

        const response = await fetch('http://localhost:5000/api/user-requests', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch requests. Status: ${response.status}`);
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [token]);

  // Update request status dynamically
  const handleUpdateRequestStatus = async (requestId, newStatus) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/update-request-status`,
        { requestId, newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      

      if (response.status === 200) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.request_id === requestId ? { ...request, status: newStatus } : request
          )
        );
        setMessage(`Request ${newStatus === 'approved' ? 'approved' : 'rejected'}!`);
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (error) {
      setError(`Failed to ${newStatus === 'approved' ? 'approve' : 'reject'} the request.`);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: { xs: '20px', sm: '30px', md: '40px' }, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: '20px' }}>
        My Requests
      </Typography>
      {message && (
        <Typography variant="h6" color="primary" align="center" sx={{ marginBottom: '20px' }}>
          {message}
        </Typography>
      )}
      {error && (
        <Typography variant="h6" color="error" align="center" sx={{ marginBottom: '20px' }}>
          {error}
        </Typography>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {requests.length === 0 ? (
            <Typography variant="body1" align="center" color="textSecondary">
              No requests found.
            </Typography>
          ) : (
            <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Event Details</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Speaker Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.request_id}>
                      <TableCell>{request.event_details}</TableCell>
                      <TableCell>{request.status}</TableCell>
                      <TableCell>{new Date(request.created_at).toLocaleString()}</TableCell>
                      <TableCell>
                        {request.speaker_first_name} {request.speaker_last_name}
                      </TableCell>
                      <TableCell>
                        {request.status !== 'approved' && (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleUpdateRequestStatus(request.request_id, 'approved')}
                          >
                            Approve
                          </Button>
                        )}
                        {request.status !== 'rejected' && (
                          <Button
                            variant="contained"
                            color="secondary"
                            sx={{ marginLeft: '10px' }}
                            onClick={() => handleUpdateRequestStatus(request.request_id, 'rejected')}
                          >
                            Reject
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestsPage;
