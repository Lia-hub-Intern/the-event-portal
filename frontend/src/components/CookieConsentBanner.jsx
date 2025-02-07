import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Link, Modal } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const CookieConsentBanner = () => {
  const [open, setOpen] = useState(false);
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      setConsent(savedConsent);
    } else {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    setConsent('accepted');
    localStorage.setItem('cookieConsent', 'accepted');
    setOpen(false);
  };

  const handleReject = () => {
    setConsent('rejected');
    localStorage.setItem('cookieConsent', 'rejected');
    setOpen(false);
  };

  const handleCustomize = () => {
    // Handle customization logic here
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'white',
          padding: 2,
          boxShadow: 3,
          zIndex: 1000,
        }}
      >
        <Typography variant="body1">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleAccept}>
            Accept All Cookies
          </Button>
          <Button variant="outlined" color="primary" onClick={handleReject}>
            Reject Non-Essential Cookies
          </Button>
          <Button variant="text" color="primary" onClick={handleCustomize}>
            Customize Settings
          </Button>
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Link component={RouterLink} to="/privacy-policy" target="_blank" rel="noopener">
            Privacy Policy
          </Link>
          {' | '}
          <Link component={RouterLink} to="/terms-of-service" target="_blank" rel="noopener">
            Terms of Service
          </Link>
        </Box>
      </Box>
    </Modal>
  );
};

export default CookieConsentBanner;
