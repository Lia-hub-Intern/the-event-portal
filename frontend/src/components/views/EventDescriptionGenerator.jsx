/**
 * Developer Full Stack: Abenezer Anglo
 * 
 * Create Date: 2024-03-13
 *     Program: EventDescriptionGenerator.jsx
 *   Path Name: stagefinder/frontend/src/components/views
 *       Tools: NodeJS, React, Material UI
 * 
 * Description:
 * - AI-powered event description generator that creates professional event content
 * - Generates short descriptions, full descriptions, and social media posts
 * - Provides easy copy functionality and regeneration options
 */

import { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  CircularProgress,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShortTextIcon from '@mui/icons-material/ShortText';
import DescriptionIcon from '@mui/icons-material/Description';
import ShareIcon from '@mui/icons-material/Share';

export default function EventDescriptionGenerator() {
  const [eventBasics, setEventBasics] = useState({
    title: '',
    type: 'conference',
    target: 'professionals',
    topic: '',
    goals: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [copied, setCopied] = useState(false);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventBasics(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // In production, this would call your AI backend
      // Simulated API response for demo purposes
      setTimeout(() => {
        const generatedResults = {
          short: generateShortDescription(eventBasics),
          long: generateLongDescription(eventBasics),
          social: generateSocialMediaPosts(eventBasics)
        };
        
        setResults(generatedResults);
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating descriptions:', error);
      setLoading(false);
    }
  };
  
  
  const generateShortDescription = (basics) => {
    const industry = basics.target === 'professionals' ? 'industry professionals' : 
                     basics.target === 'executives' ? 'executive leaders' :
                     basics.target === 'students' ? 'students and educators' : 'attendees';
                     
    return `Join us for a transformative ${basics.type} on ${basics.topic}, designed specifically for ${industry}. ${basics.title} will provide you with the insights and connections needed to ${basics.goals}.`;
  };
  
  const generateLongDescription = (basics) => {
    const format = basics.type === 'conference' ? 'keynotes, panels, and workshops' : 
                   basics.type === 'workshop' ? 'hands-on sessions and expert demonstrations' :
                   basics.type === 'summit' ? 'high-level discussions and strategic networking' : 'sessions';
    
    return `# ${basics.title}\n\n## About This ${basics.type.charAt(0).toUpperCase() + basics.type.slice(1)}\n\nWe're excited to invite you to join us for ${basics.title}, an exceptional ${basics.type} focused on ${basics.topic}.\n\nDesigned specifically for ${basics.target}, this event promises to deliver exceptional value through ${format}.\n\n## What You'll Experience\n\n- In-depth exploration of ${basics.topic}\n- Networking opportunities with like-minded professionals\n- Practical strategies you can implement immediately\n- Expert-led sessions tailored to help you ${basics.goals}\n\n## Who Should Attend\n\nThis ${basics.type} is perfect for ${basics.target} who want to stay ahead of the curve on ${basics.topic} and are committed to ${basics.goals}.\n\nDon't miss this opportunity to elevate your knowledge, expand your network, and discover new strategies for success.`;
  };
  
  const generateSocialMediaPosts = (basics) => {
    const hashtags = `#${basics.topic.split(' ').join('')} #${basics.type} #StageFinder`;
    
    return [
      `🚀 Announcing ${basics.title}! Join us for this must-attend ${basics.type} where you'll learn how to ${basics.goals}. Perfect for ${basics.target}! ${hashtags}`,
      
      `Are you looking to ${basics.goals}? Don't miss our upcoming ${basics.type} on ${basics.topic}. Spots are limited - register today! ${hashtags}`,
      
      `What do successful ${basics.target} know about ${basics.topic}? Find out at our exclusive ${basics.type}! Early bird registration now open. ${hashtags}`
    ];
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', p: { xs: 2, md: 4 }, my: 4 }}>
      {/* Hero Header */}
      <Box
        sx={{
          borderRadius: 2,
          mb: 4,
          position: 'relative',
          background: 'linear-gradient(135deg, #1976d2 0%, #649FD3 100%)',
          color: 'white',
          p: { xs: 3, md: 5 },
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            zIndex: -1,
          }
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 2 }}>
              AI Event Description Generator
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 400, opacity: 0.9 }}>
              Create compelling event descriptions in seconds
            </Typography>
            <Typography variant="body1">
              Tell us about your event and our AI will generate professional marketing content ready to publish.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <AutoAwesomeIcon sx={{ fontSize: 120, opacity: 0.9 }} />
          </Grid>
        </Grid>
      </Box>
      
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Event Title"
                value={eventBasics.title}
                onChange={handleInputChange}
                fullWidth
                required
                placeholder="e.g., Tech Innovation Summit 2024"
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Event Type</InputLabel>
                <Select
                  name="type"
                  value={eventBasics.type}
                  onChange={handleInputChange}
                  label="Event Type"
                >
                  <MenuItem value="conference">Conference</MenuItem>
                  <MenuItem value="workshop">Workshop</MenuItem>
                  <MenuItem value="summit">Summit</MenuItem>
                  <MenuItem value="seminar">Seminar</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Target Audience</InputLabel>
                <Select
                  name="target"
                  value={eventBasics.target}
                  onChange={handleInputChange}
                  label="Target Audience"
                >
                  <MenuItem value="professionals">Industry Professionals</MenuItem>
                  <MenuItem value="executives">Executives</MenuItem>
                  <MenuItem value="students">Students</MenuItem>
                  <MenuItem value="entrepreneurs">Entrepreneurs</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="topic"
                label="Main Topic/Theme"
                value={eventBasics.topic}
                onChange={handleInputChange}
                fullWidth
                required
                placeholder="e.g., AI in Healthcare, Future of Digital Marketing"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="goals"
                label="What will attendees gain?"
                value={eventBasics.goals}
                onChange={handleInputChange}
                fullWidth
                required
                multiline
                rows={2}
                placeholder="e.g., gain practical skills in machine learning, network with industry leaders"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button 
                type="submit"
                variant="contained" 
                fullWidth
                disabled={loading}
                sx={{ py: 1.5, mt: 1 }}
              >
                {loading ? <CircularProgress size={24} /> : "Generate Content"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
      
      {results && (
        <Box sx={{ mt: 4, animation: 'fadeIn 0.5s ease forwards' }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 0, 
              overflow: 'hidden',
              borderRadius: 2,
              border: '1px solid rgba(0,0,0,0.08)'
            }}
          >
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ 
                borderBottom: 1, 
                borderColor: 'divider',
                '& .MuiTab-root': {
                  py: 2
                },
                '& .Mui-selected': {
                  fontWeight: 'bold'
                }
              }}
              TabIndicatorProps={{
                style: {
                  height: 3
                }
              }}
            >
              <Tab label="Short Description" icon={<ShortTextIcon />} iconPosition="start" />
              <Tab label="Full Description" icon={<DescriptionIcon />} iconPosition="start" />
              <Tab label="Social Media" icon={<ShareIcon />} iconPosition="start" />
            </Tabs>
            
            <Box sx={{ p: 3 }}>
              {tabValue === 0 && (
                <Box sx={{ position: 'relative' }}>
                  <Typography variant="body1" sx={{ mb: 2, pr: 4 }}>
                    {results.short}
                  </Typography>
                  <IconButton 
                    onClick={() => copyToClipboard(results.short)}
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
              
              {tabValue === 1 && (
                <Box sx={{ position: 'relative' }}>
                  <Typography 
                    component="pre" 
                    sx={{ 
                      whiteSpace: 'pre-wrap', 
                      fontFamily: 'inherit', 
                      mb: 2,
                      pr: 4
                    }}
                  >
                    {results.long}
                  </Typography>
                  <IconButton 
                    onClick={() => copyToClipboard(results.long)}
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
              
              {tabValue === 2 && (
                <Box>
                  {results.social.map((post, index) => (
                    <Accordion key={index} sx={{ mb: 1 }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Post {index + 1}</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ position: 'relative' }}>
                        <Typography sx={{ pr: 4 }}>
                          {post}
                        </Typography>
                        <IconButton 
                          onClick={() => copyToClipboard(post)}
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                          <ContentCopyIcon fontSize="small" />
                        </IconButton>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              )}
              
              <Button
                startIcon={<RefreshIcon />}
                onClick={handleSubmit}
                sx={{ mt: 2 }}
              >
                Regenerate
              </Button>
            </Box>
          </Paper>
        </Box>
      )}
      
      <Snackbar 
        open={copied} 
        autoHideDuration={3000} 
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Copied to clipboard
        </Alert>
      </Snackbar>
    </Box>
  );
}