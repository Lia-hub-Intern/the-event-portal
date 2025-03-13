/**
 * Developer Full Stack: Abenezer Anglo
 * 
 * Create Date: 2024-03-13
 *     Program: SpeakerMatcher.jsx
 *   Path Name: stagefinder/frontend/src/components/views
 *       Tools: NodeJS, React, Material UI
 * 
 * Description:
 * - AI-powered speaker matching system that recommends speakers based on event requirements
 * - Uses machine learning to analyze event descriptions and match with appropriate speakers
 * - Provides detailed speaker profiles with match scores and recommendations
 */

import { useState } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Chip, 
  Avatar, 
  List, 
  ListItem,
  ListItemAvatar, 
  ListItemText, 
  CircularProgress,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Divider,
  IconButton,
  Tooltip,
  Alert,
  Zoom,
  useTheme,
  useMediaQuery,
  Rating,
  LinearProgress
} from "@mui/material";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import SpeakerIcon from '@mui/icons-material/Speaker';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoIcon from '@mui/icons-material/Info';
import ShortTextIcon from '@mui/icons-material/ShortText';
import DescriptionIcon from '@mui/icons-material/Description';
import ShareIcon from '@mui/icons-material/Share';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { styled } from '@mui/material/styles';
import { listSpeakers } from '../functions/Functions';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#A1824A',
  },
});

const handleImageUrl = (imageUrl) => {
  console.log("Original image URL:", imageUrl); // Add this for debugging
  
  if (!imageUrl) {
    return "https://via.placeholder.com/100?text=Speaker";
  }
  
  // Handle protocol-relative URLs (starting with //)
  if (imageUrl.startsWith('//')) {
    return `https:${imageUrl}`;
  }
  
  // Simply return the URL as is if it's already a full URL
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // For relative URLs from your backend
  return `${imageUrl}`;
};

export default function SpeakerMatcher() {
  const [eventDescription, setEventDescription] = useState("");
  const [eventType, setEventType] = useState("conference");
  const [audienceSize, setAudienceSize] = useState([50, 500]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [searchTips, setSearchTips] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!eventDescription) {
      setError("Please describe your event");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Make API call to backend
      const response = await fetch('http://localhost:5000/api/match-speakers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          eventDescription,
          eventType,
          audienceSize
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to find matching speakers');
      }
      
      const data = await response.json();
      console.log('Speaker data received (full):', data.speakers);
      console.log('Speaker image URLs:', data.speakers.map(s => s.image || 'No image'));
      setResults(data.speakers);
      
    } catch (err) {
      console.error(err);
      setError("Failed to find matching speakers. Please try again.");
      
      // If API call fails, fall back to local matching algorithm
      const matchedSpeakers = listSpeakers
        .map(speaker => {
          const categoryWords = speaker.category.toLowerCase().split(/[,\s]+/);
          const descWords = eventDescription.toLowerCase().split(/\s+/);
          
          let matchCount = 0;
          descWords.forEach(word => {
            if (word.length > 3 && categoryWords.some(catWord => catWord.includes(word))) {
              matchCount++;
            }
          });
          
          const score = Math.min(Math.round((matchCount / descWords.length) * 100), 100);
          return {
            ...speaker,
            matchScore: score >= 30 ? score : 0,
            reason: "Match based on keyword matching"
          };
        })
        .filter(s => s.matchScore >= 30)
        .sort((a, b) => b.matchScore - a.matchScore);
      
      setResults(matchedSpeakers);
    } finally {
      setLoading(false);
    }
  };

  const audienceSizeText = (size) => {
    if (size < 50) return 'Small intimate group';
    if (size < 200) return 'Medium gathering';
    if (size < 500) return 'Large audience';
    return 'Very large audience';
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: { xs: 2, md: 4 }, my: 4 }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(25,118,210,0.9) 0%, rgba(161,130,74,0.9) 100%)',
          borderRadius: 2,
          color: 'white',
          p: { xs: 3, md: 5 },
          mb: 4,
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2,
            zIndex: -1,
          }
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
              AI Speaker Matcher
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 400 }}>
              Finding the perfect speaker for your event just got smarter
            </Typography>
            <Typography variant="body1">
              Describe your event and our AI will recommend the best speakers for your specific audience and needs.
            </Typography>
          </Grid>
          <Grid item xs={12} md={5} sx={{ textAlign: 'center' }}>
            <PersonSearchIcon sx={{ fontSize: 160, opacity: 0.9 }} />
          </Grid>
        </Grid>
      </Box>
      
      {/* Search Form */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: { xs: 2, md: 4 }, 
          mb: 4, 
          borderRadius: 2,
          border: '1px solid rgba(0,0,0,0.08)'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
            Find Your Perfect Speaker
          </Typography>
          <Tooltip title="Show search tips">
            <IconButton 
              color="primary" 
              onClick={() => setSearchTips(!searchTips)}
              sx={{ border: '1px solid', borderRadius: 2 }}
            >
              <TipsAndUpdatesIcon />
            </IconButton>
          </Tooltip>
        </Box>
        
        {searchTips && (
          <Zoom in={searchTips}>
            <Alert 
              severity="info" 
              sx={{ mb: 3 }}
              onClose={() => setSearchTips(false)}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Search Tips:
              </Typography>
              <Typography variant="body2">
                • Be specific about your event topics (e.g., "AI in healthcare" rather than just "technology")
              </Typography>
              <Typography variant="body2">
                • Mention your audience type (e.g., "executives", "professionals", "students")
              </Typography>
              <Typography variant="body2">
                • Include the goals of your event (e.g., "inspire innovation", "provide practical skills")
              </Typography>
            </Alert>
          </Zoom>
        )}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Describe your event goals and topics"
                fullWidth
                multiline
                rows={4}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Example: We're organizing a technology conference focusing on AI innovation and leadership for industry professionals. We need engaging speakers who can discuss practical applications and future trends."
                required
                sx={{ mb: 1 }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Event Type</InputLabel>
                <Select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  label="Event Type"
                >
                  <MenuItem value="conference">Conference</MenuItem>
                  <MenuItem value="workshop">Workshop</MenuItem>
                  <MenuItem value="corporate">Corporate Event</MenuItem>
                  <MenuItem value="summit">Summit</MenuItem>
                  <MenuItem value="seminar">Seminar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Box sx={{ px: 1 }}>
                <Typography gutterBottom>
                  Expected Audience Size
                </Typography>
                <Slider
                  value={audienceSize}
                  onChange={(e, newValue) => setAudienceSize(newValue)}
                  valueLabelDisplay="auto"
                  min={10}
                  max={1000}
                  step={10}
                  sx={{ 
                    '& .MuiSlider-thumb': {
                      height: 24,
                      width: 24,
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    {audienceSize[0]} people
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {audienceSizeText(audienceSize[1])}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {audienceSize[1]} people
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Button 
                type="submit"
                variant="contained" 
                fullWidth
                disabled={loading}
                sx={{ 
                  py: 1.5, 
                  mt: 1,
                  bgcolor: '#1976d2',
                  '&:hover': {
                    bgcolor: '#115293',
                  } 
                }}
                startIcon={<PersonSearchIcon />}
              >
                {loading ? <CircularProgress size={24} /> : "Find Matching Speakers"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ width: '100%', mt: 2, mb: 4 }}>
          <LinearProgress />
          <Typography align="center" sx={{ mt: 2, color: 'text.secondary' }}>
            Our AI is analyzing speaker profiles to find your best matches...
          </Typography>
        </Box>
      )}

      {results.length > 0 && (
        <Box>
          <Typography variant="h5" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
            Top Speaker Matches
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Based on your event requirements, we've found {results.length} speakers who would be a good fit
          </Typography>
          
          <Grid container spacing={3}>
            {results.map((speaker, index) => (
              <Grid item xs={12} md={6} key={index} 
                sx={{
                  animation: `fadeIn 0.5s ease ${index * 0.1}s forwards`,
                  opacity: 0,
                  '@keyframes fadeIn': {
                    '0%': { opacity: 0, transform: 'translateY(20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                  }
                }}
              >
                <Card 
                  elevation={2} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderTop: '4px solid',
                    borderColor: index === 0 ? '#A1824A' : 'primary.main',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)'
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', p: 2 }}>
                    <Avatar
                      src={speaker.image || ''} // Try to use image if available
                      alt={speaker.name}
                      sx={{ 
                        width: 100, 
                        height: 100,
                        borderRadius: '50%',
                        border: '2px solid #f0f0f0',
                        fontSize: '2.5rem',
                        bgcolor: index === 0 ? '#A1824A' : '#1976d2',
                      }}
                    >
                      {speaker.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
                      <Typography variant="h6" component="h3">
                        {speaker.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {speaker.title}
                      </Typography>
                      <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center' }}>
                        <StyledRating
                          name="match-rating"
                          value={speaker.matchScore / 20}
                          readOnly
                          precision={0.5}
                          size="small"
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            ml: 1, 
                            fontWeight: 'bold',
                            color: speaker.matchScore > 80 ? '#2e7d32' : '#1976d2'
                          }}
                        >
                          {speaker.matchScore}% Match
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  
                  <Divider />
                  
                  <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {speaker.description}
                    </Typography>
                    
                    {speaker.reason && (
                      <Alert severity="success" sx={{ mt: 2 }} icon={<InfoIcon />}>
                        <Typography variant="body2">
                          <strong>Why this match:</strong> {speaker.reason}
                        </Typography>
                      </Alert>
                    )}
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
                      {speaker.category.split(',').map((tag, i) => (
                        <Chip 
                          key={i} 
                          label={tag.trim()} 
                          size="small" 
                          variant="outlined"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                  
                  <CardActions sx={{ justifyContent: 'flex-end', p: 2, pt: 0 }}>
                    <Button 
                      size="small" 
                      endIcon={<ArrowForwardIcon />}
                      sx={{ color: '#A1824A' }}
                      onClick={() => window.location.href=`/Speakers?highlight=${speaker.name.replace(' ', '+')}`}
                    >
                      View Profile
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {results.length === 0 && !loading && !error && (
        <Box sx={{ 
          textAlign: 'center', 
          py: 6, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center' 
        }}>
          <SpeakerIcon sx={{ fontSize: 80, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Describe your event to get AI-powered speaker recommendations
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            The more details you provide, the better matches we can find
          </Typography>
        </Box>
      )}
    </Box>
  );
}