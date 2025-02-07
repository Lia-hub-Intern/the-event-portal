import React from 'react';
import { Typography, Box } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>
      <Box>
        <Typography variant="h6" gutterBottom>
          Introduction
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome to our Privacy Policy. Your privacy is critically important to us.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We collect various types of information in connection with the services we provide, including:
        </Typography>
        <Typography variant="body1" paragraph>
          - Personal identification information (Name, email address, phone number, etc.)
        </Typography>
        <Typography variant="body1" paragraph>
          - Usage data (Information on how you use our website)
        </Typography>
        <Typography variant="h6" gutterBottom>
          How We Use Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use the collected information for various purposes:
        </Typography>
        <Typography variant="body1" paragraph>
          - To provide and maintain our service
        </Typography>
        <Typography variant="body1" paragraph>
          - To notify you about changes to our service
        </Typography>
        <Typography variant="body1" paragraph>
          - To provide customer support
        </Typography>
        <Typography variant="h6" gutterBottom>
          Security of Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use administrative, technical, and physical security measures to help protect your personal information.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </Typography>
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us.
        </Typography>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
