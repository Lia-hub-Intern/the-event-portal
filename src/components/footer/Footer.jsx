import React from 'react';
import { Box, Typography, Link, TextField, Button } from '@mui/material';
import { Facebook, Twitter, YouTube, Instagram } from '@mui/icons-material';

export default function Footer(){
  return (
    <>
    <footer>
      <Box
        sx={{
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          padding: 0,
          margin: 0,
          '&::before': {
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
            overflow: 'hidden',
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            boxSizing: 'border-box',
            paddingBottom: '20px',
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(18, 2, 94, 0.936)',
              padding: '20px',
              textAlign: 'center',
              width: '100%',
              boxSizing: 'border-box',
              margin: 0,
            }}
          >
            <Typography variant="h2" sx={{ mb: 1, fontSize: '1.8em', fontWeight: 'bold' }}>
              Subscribe Now To Get More Information!
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, fontSize: '1.1em' }}>
              Get exclusive updates on speakers, workshops, and more by subscribing today. Don’t miss out – join us now!
            </Typography>
            <Box
              component="form"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center',
                maxWidth: '800px',
                margin: '0 auto',
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Enter your name"
                required
                sx={{
                  width: 'auto',
                  flex: 1,
                  backgroundColor: 'white',
                  '& .MuiInputBase-input': { padding: '10px' },
                }}
              />
              <TextField
                variant="outlined"
                placeholder="Enter your email"
                required
                type="email"
                sx={{
                  width: 'auto',
                  flex: 1,
                  backgroundColor: 'white',
                  '& .MuiInputBase-input': { padding: '10px' },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: 'white',
                  color: '#5e6369',
                  fontSize: '1em',
                  padding: '10px',
                  borderRadius: '5px',
                  width: 'auto',
                  '&:hover': { backgroundColor: '#f1f1f1' },
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 2,
              padding: '40px 20px',
              zIndex: 3,
              position: 'relative',
              flexWrap: 'wrap',
            }}
          >
            <Box sx={{ flex: 1, minWidth: '200px', maxWidth: '300px', mb: 2 }}>
              <Typography variant="h3" sx={{ mb: 1, fontSize: '1.4em' }}>
                About The Live Event
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '1em', lineHeight: 1.6 }}>
                We teach speakers how to consistently get booked and paid to speak. We’ve helped thousands of speakers find clarity, confidence, and a clear path to make an impact.
              </Typography>
            </Box>
            <Box sx={{ flex: 1, minWidth: '200px', maxWidth: '300px', mb: 2 }}>
              <Typography variant="h3" sx={{ mb: 1, fontSize: '1.4em' }}>
                Get Started
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Link href="#" sx={{ color: 'white', mb: 1 }}>Speaker Resources</Link>
                <Link href="#" sx={{ color: 'white', mb: 1 }}>Blogs</Link>
                <Link href="#" sx={{ color: 'white' }}>Contact</Link>
              </Box>
            </Box>
            <Box sx={{ flex: 1, minWidth: '200px', maxWidth: '300px', mb: 2 }}>
              <Typography variant="h3" sx={{ mb: 1, fontSize: '1.4em' }}>
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
                <Link href="#" aria-label="Facebook" sx={{ color: 'white', fontSize: '1.5em' }}><Facebook sx={{ fontSize: 30, color: '#1877f2' }} /></Link>
                <Link href="#" aria-label="Twitter" sx={{ color: 'white', fontSize: '1.5em' }}><Twitter sx={{ fontSize: 30, color: '#1da1f2' }} /></Link>
                <Link href="#" aria-label="YouTube" sx={{ color: 'white', fontSize: '1.5em' }}><YouTube sx={{ fontSize: 30, color: '#ff0000' }} /></Link>
                <Link href="#" aria-label="Instagram" sx={{ color: 'white', fontSize: '1.5em' }}><Instagram sx={{ fontSize: 30, color: '#e4405f' }} /></Link>
              </Box>
              <Typography variant="body2">Support@liveevent.se</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          backgroundColor: '#6d7176',
          color: 'white',
          padding: '20px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 3,
          width: '100%',
          boxSizing: 'border-box',
          marginTop: 0,
        }}
      >
        <Typography variant="body2">
          Copyright ©2023 The Speaker Lab. All rights reserved.
        </Typography>
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Link href="#" sx={{ color: 'white' }}>Privacy Policy</Link>
          <span>|</span>
          <Link href="#" sx={{ color: 'white' }}>Terms and Conditions</Link>
        </Box>
      </Box>
    </footer>
    </>
  );
};

