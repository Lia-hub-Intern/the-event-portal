import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function SocialMediaLinks({ facebook, twitter, instagram, linkedin }) {
  // State to track whether the icons should be visible or not
  const [showIcons, setShowIcons] = useState(false);

  // Function to toggle icon visibility
  const handleToggle = () => {
    setShowIcons((prevShowIcons) => !prevShowIcons);
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      {/* Button to show or hide icons */}
      <Button
  onClick={handleToggle}
  variant="contained"
  sx={{ textTransform: 'none', bgcolor: 'white', color: 'black' }} // Bakgrund vit, text svart
>
  Social Media Links
</Button>



      {/* Show icons only when the button is clicked */}
      {showIcons && (
      <Box sx={{ display: 'flex', justifyContent: 'left', marginTop: 2 }}>
      {facebook && (
        <a href={facebook} target="_blank" rel="noopener noreferrer">
          <FacebookIcon sx={{ fontSize: 30, marginRight: 2, color: '#3b5998' }} /> {/* Facebook blå */}
        </a>
      )}
      {twitter && (
        <a href={twitter} target="_blank" rel="noopener noreferrer">
          <TwitterIcon sx={{ fontSize: 30, marginRight: 2, color: '#1DA1F2' }} /> {/* Twitter blå */}
        </a>
      )}
      {instagram && (
        <a href={instagram} target="_blank" rel="noopener noreferrer">
          <InstagramIcon sx={{ fontSize: 30, marginRight: 2, color: '#C13584' }} /> {/* Instagram rosa */}
        </a>
      )}
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon sx={{ fontSize: 30, color: '#0077B5' }} /> {/* LinkedIn blå */}
        </a>
      )}
    </Box>
    
     
      )}
    </Box>
  );
}