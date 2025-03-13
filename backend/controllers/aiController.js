import axios from 'axios';
import dotenv from 'dotenv';
import { speakers } from '../backend/data/speakerData.js';

dotenv.config();

// Function to call the Groq API directly
const callGroqAPI = async (messages, model = "llama3-70b-8192", temperature = 0.2) => {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model,
        messages,
        temperature
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error("Error calling Groq API:", error.response?.data || error.message);
    throw error;
  }
};

export const matchSpeakers = async (req, res) => {
  try {
    const { eventDescription, eventType, audienceSize } = req.body;
    
    if (!eventDescription) {
      return res.status(400).json({ message: "Event description is required" });
    }
    
    if (!process.env.GROQ_API_KEY) {
      console.warn('No GROQ_API_KEY found, using mock data instead of AI matching');
      
      // Create mock matches based on keyword matching
      const mockMatches = speakers
        .map(speaker => {
          // Simple keyword matching
          const keywords = eventDescription.toLowerCase().split(/\s+/);
          const categoryWords = speaker.category.toLowerCase().split(/[,\s]+/);
          
          let matchCount = 0;
          keywords.forEach(keyword => {
            if (keyword.length > 3 && categoryWords.includes(keyword)) {
              matchCount++;
            }
          });
          
          const score = Math.min(Math.round((matchCount / keywords.length) * 100), 100);
          
          return {
            ...speaker,
            matchScore: score >= 30 ? score : 0,
            reason: "Mock match based on keyword matching (GROQ_API_KEY not configured)"
          };
        })
        .filter(s => s.matchScore >= 30)
        .sort((a, b) => b.matchScore - a.matchScore);
      
      return res.status(200).json({ 
        speakers: mockMatches,
        note: "Using mock data - set up GROQ_API_KEY for AI-powered matches"
      });
    }
    
    // Use the imported speakers data
    const speakerInfo = speakers.map(speaker => ({
      name: speaker.name,
      title: speaker.title,
      category: speaker.category,
      description: speaker.description.substring(0, 250) // Truncate long descriptions
    }));
    
    // Enhanced prompt with more specific matching criteria
    const prompt = `
    You are an expert event planner assistant who matches speakers to events. You need to find the most suitable speakers for an event based on the event description and type.

    EVENT DETAILS:
    Description: ${eventDescription}
    Event Type: ${eventType}
    Audience Size: ${audienceSize ? `${audienceSize[0]}-${audienceSize[1]} people` : 'Not specified'}

    AVAILABLE SPEAKERS:
    ${JSON.stringify(speakerInfo, null, 2)}

    MATCHING CRITERIA:
    1. Topic expertise: Match speakers whose expertise/category aligns with the event topics
    2. Speaker experience: Consider if their background fits the event format
    3. Speaker style: Assess if their presentation style would resonate with the described audience
    4. Event type fit: Some speakers are better for conferences, others for workshops, etc.
    
    FORMAT YOUR RESPONSE AS JSON:
    [
      {
        "name": "Speaker Name",
        "matchScore": 85, // percentage between 30-100
        "reason": "Brief explanation of why this speaker is a good match" // 1-2 sentence justification
      },
      // more speakers in descending order of match score
    ]

    Include only speakers with a match score above 30%. Sort from highest to lowest match score.
    `;
    
    console.log("Sending prompt to Groq API");
    
    // Make the API call using our helper function
    let completion;
    try {
      completion = await callGroqAPI([
        { role: "user", content: prompt }
      ]);
    } catch (apiError) {
      console.error("Groq API error:", apiError);
      return res.status(503).json({ 
        message: "Unable to connect to AI service. Please try again later.",
        error: apiError.message
      });
    }
    
    console.log("Received response from Groq API");
    
    // Parse the AI's response to get match scores with robust error handling
    let matchResults;
    try {
      const content = completion.choices[0]?.message?.content || '[]';
      
      // Extract JSON array from the response using regex
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      
      if (!jsonMatch) {
        console.error("No valid JSON found in response");
        return res.status(500).json({ message: "AI returned invalid response format" });
      }
      
      matchResults = JSON.parse(jsonMatch[0]);
      
      if (!Array.isArray(matchResults)) {
        throw new Error("Parsed result is not an array");
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return res.status(500).json({ message: "Failed to process AI response" });
    }
    
    // Map the match scores to the complete speaker objects with reasons
    const matchedSpeakers = matchResults
      .map(match => {
        const speaker = speakers.find(s => s.name === match.name);
        if (!speaker) return null;
        
        return {
          ...speaker,
          image: speaker.image,  // Explicitly include the image URL
          matchScore: Math.round(match.matchScore), // Round to whole number
          reason: match.reason || "Good match for your event requirements"
        };
      })
      .filter(s => s && s.matchScore >= 30)
      .sort((a, b) => b.matchScore - a.matchScore);
    
    // Add response metadata
    return res.status(200).json({ 
      speakers: matchedSpeakers,
      eventType: eventType,
      totalMatches: matchedSpeakers.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error("AI matching error:", error);
    return res.status(500).json({ 
      message: "An error occurred during speaker matching",
      error: error.message
    });
  }
};

// Add this secondary function to generate descriptions for event-description-generator
export const generateEventDescription = async (req, res) => {
  try {
    const { title, type, target, topic, goals } = req.body;
    
    if (!title || !type || !target || !topic || !goals) {
      return res.status(400).json({ message: "All event details are required" });
    }
    
    const prompt = `
    You are an expert event marketer. Generate compelling content for an upcoming event with these details:

    Event Title: ${title}
    Event Type: ${type}
    Target Audience: ${target}
    Main Topic/Theme: ${topic}
    Attendee Benefits: ${goals}

    Please create:
    1. A short description (30-50 words)
    2. A longer detailed description with markdown formatting (200-300 words)
    3. Three social media posts promoting this event

    Format your response as JSON:
    {
      "short": "short description here",
      "long": "longer description with markdown formatting here",
      "social": ["post 1", "post 2", "post 3"]
    }
    `;
    
    const completion = await callGroqAPI([
      { role: "user", content: prompt }
    ], "llama3-70b-8192", 0.7); // Higher temperature for more creative content
    
    let results;
    try {
      const content = completion.choices[0]?.message?.content || '{}';
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      results = jsonMatch ? JSON.parse(jsonMatch[0]) : {
        short: "Failed to generate short description",
        long: "Failed to generate long description", 
        social: ["Failed to generate social media posts"]
      };
    } catch (error) {
      console.error("Error parsing AI response:", error);
      return res.status(500).json({ message: "Failed to process AI response" });
    }
    
    return res.status(200).json(results);
    
  } catch (error) {
    console.error("AI generation error:", error);
    return res.status(500).json({ message: "An error occurred during content generation" });
  }
};