import React from 'react';
import { Box, Typography, Link, TextField, Button } from '@mui/material';
import { Facebook, Twitter, YouTube, Instagram } from '@mui/icons-material';

export default function Footer(){
  return (
    <>
      <footer>
        {/* Main container with background image */}
        <Box
          sx={{
            color: 'white',
            position: 'relative',
            '&::before': { // Background image for the footer
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'url(https://murf.ai/resources/media/posts/199/responsive/corporate-businessman-giving-presentation-large-audience-sm.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              zIndex: 1,
            },
          }}
        >
          {/* Content box positioned above the background */}
          <Box
            sx={{
              position: 'relative', 
              zIndex: 2,
              paddingBottom: '20px',
            }}
          >
            {/* Subscription section */}
            <Box
              sx={{
                backgroundColor: 'rgba(18, 2, 94, 0.936)', // Dark overlay
                padding: '20px',
                textAlign: 'center',
              }}
            >
              <Typography variant="h2" sx={{ fontSize: '1.8em', fontWeight: 'bold' }}>
                Subscribe Now To Get More Information!
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1em' }}>
                Get exclusive updates on speakers, workshops, and more by subscribing today. Don’t miss out – join us now!
              </Typography>

              {/* Subscription form */}
              <Box
                component="form"
                sx={{
                  display: 'flex', // Flexbox for layout
                  justifyContent: 'center', // Center the form items
                  gap: 2, // Space between form elements
                  flexWrap: 'wrap', // Wrap the form items on smaller screens
                  alignItems: 'center', // Align items vertically
                  maxWidth: '800px', // Limit width to prevent stretching
                  margin: '0 auto', // Center the form horizontally
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Enter your name"
                  required
                  sx={{ flex: 1, backgroundColor: 'white' }}
                />
                <TextField
                  variant="outlined"
                  placeholder="Enter your email"
                  required
                  type="email"
                  sx={{ flex: 1, backgroundColor: 'white' }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: 'white',
                    color: '#5e6369',
                    padding: '10px',
                    borderRadius: '5px',
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Box>

            {/* Footer content sections */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '40px 20px',
                flexWrap: 'wrap', // Wrap the form items on smaller screens
              }}
            >
              {/* About section */}
              <Box sx={{ flex: 1, minWidth: '200px', mb: 2 }}>
                <Typography variant="h3" sx={{ fontSize: '1.4em' }}>
                  About The Live Event
                </Typography>
                <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                  We teach speakers how to consistently get booked and paid to speak. We’ve helped thousands of speakers find clarity, confidence, and a clear path to make an impact.
                </Typography>
              </Box>

              {/* Get Started section */}
              <Box sx={{ 
                    flex: 1, 
                    minWidth: '200px', 
                    mb: 2
                     }}>
                <Typography variant="h3" sx={{ fontSize: '1.4em' }}>
                  Get Started
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Link href="#" sx={{ color: 'white', mb: 1 }}>Speaker Resources</Link>
                  <Link href="#" sx={{ color: 'white', mb: 1 }}>Blogs</Link>
                  <Link href="#" sx={{ color: 'white' }}>Contact</Link>
                </Box>
              </Box>

              {/* Social media section */}
              <Box sx={{ flex: 1, minWidth: '200px', mb: 2 }}>
                <Typography variant="h3" sx={{ fontSize: '1.4em' }}>
                  Let’s Connect
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 1,
                    mb: 2,
                  }}
                >
                  {/* Social media icons */}
                  <Link href="#" aria-label="Facebook"><Facebook sx={{ fontSize: 30, color: '#1877f2' }} /></Link>
                  <Link href="#" aria-label="Twitter"><Twitter sx={{ fontSize: 30, color: '#1da1f2' }} /></Link>
                  <Link href="#" aria-label="YouTube"><YouTube sx={{ fontSize: 30, color: '#ff0000' }} /></Link>
                  <Link href="#" aria-label="Instagram"><Instagram sx={{ fontSize: 30, color: '#e4405f' }} /></Link>
                </Box>
                <Typography variant="body2">Support@liveevent.se</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Copyright and legal section */}
        <Box
          sx={{
            backgroundColor: '#6d7176',
            color: 'white',
            padding: '20px',
            textAlign: 'center',
            zIndex: 3,
          }}
        >
          <Typography variant="body2">
            Copyright ©2023 The Speaker Lab. All rights reserved.
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center', gap: 1 }}>
            <Link href="#" sx={{ color: 'white' }}>Privacy Policy</Link>
            <span>|</span>
            <Link href="#" sx={{ color: 'white' }}>Terms and Conditions</Link>
          </Box>
        </Box>
      </footer>
    </>
  );
};