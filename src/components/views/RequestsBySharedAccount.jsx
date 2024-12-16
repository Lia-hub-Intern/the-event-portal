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

const RequestsBySharedAccount = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [sharedAccountId, setSharedAccountId] = useState(null);

  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  // Decode token and set sharedAccountId
  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwt_decode(token);
        const accountId = decodedToken?.shared_account_id;
        setSharedAccountId(accountId);

        if (!accountId) {
          setError('SharedAccountId is missing or invalid.');
          setLoading(false);
        }
      } catch (err) {
        setError('Token is invalid or has expired.');
        setLoading(false);
      }
    } else {
      setError('Token not found.');
      setLoading(false);
    }
  }, [token]);

  // Fetch requests for the shared account
  const fetchRequests = async () => {
    if (!sharedAccountId) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/requests/${sharedAccountId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(response.data);
    } catch (err) {
      setError('Failed to fetch requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sharedAccountId) {
      fetchRequests();
    }
  }, [sharedAccountId]);


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

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: { xs: '20px', sm: '30px', md: '40px' }, maxWidth: '1200px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', marginBottom: '20px' }}>
        Requests for Shared Account ID: {sharedAccountId}
      </Typography>
      {message && (
        <Typography variant="h6" color="primary" align="center" sx={{ marginBottom: '20px' }}>
          {message}
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
                        <Button
                          variant="contained"
                          color={request.status === 'approved' ? 'secondary' : 'primary'}
                          onClick={() =>
                            handleUpdateRequestStatus(
                              request.request_id,
                              request.status === 'approved' ? 'rejected' : 'approved'
                            )
                          }
                        >
                          {request.status === 'approved' ? 'Reject' : 'Approve'}
                        </Button>
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

export default RequestsBySharedAccount;
