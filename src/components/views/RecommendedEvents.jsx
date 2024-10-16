import React, { useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

// Sample AI event data with images and links
const aiEvents = [
  {
    title: "TED Talk: The Future of AI",
    link: "https://www.ted.com/talks/the_future_of_ai",
    image: "https://th.bing.com/th?id=OIP.oRMBq1DcZg8SGC0MkbdcTAHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2", 
  },
  {
    title: "AI Summit 2024",
    link: "https://theaisummit.com/",
    image: "https://th.bing.com/th?id=OIP.mYfiTXBcvI7vpNicnh5z-gHaE8&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    title: "AI Expo Global 2024",
    link: "https://www.ai-expo.net/global/",
    image: "https://www.bing.com/th?id=OIP.WTkVD6EZF760JKBTQsxanQHaD4&w=212&h=106&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2", 
  },
  {
    title: "ICML 2024",
    link: "https://icml.cc/Conferences/2024",
    image: "https://th.bing.com/th?id=OIP.uvO2S1DLwmSTxSIvH6sjCQAAAA&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  },
  {
    title: "NeurIPS 2024",
    link: "https://nips.cc/Conferences/2024",
    image: "https://th.bing.com/th/id/OIP.1ONWT5jLxXaC1moJUj8xyAHaDJ?rs=1&pid=ImgDetMain", 
  },
  {
    title: "Speakabout AI",
    link: "https://speakabout.ai/",
    image: "https://th.bing.com/th/id/OIP.1osL_GSczyZJIKLOZi9XDwAAAA?rs=1&pid=ImgDetMain", 
  },
];

export default function RecommendedEvents() {
  const scrollRef = useRef(null); // Reference to the scrolling box

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 1; // Scroll right by 1 pixel
        // Reset to the start if it reaches the end
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
          scrollContainer.scrollLeft = 0; // Reset scroll position
        }
      }
    };

    const interval = setInterval(scroll, 30); // Adjust the interval for speed

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Recommended AI Events
      </Typography>
      <Box
        sx={{
          overflowX: "hidden", // Hide any overflow
          whiteSpace: "nowrap", // Prevent line breaks
          mb: 4, // Increased margin below the events
        }}
        ref={scrollRef}
      >
        <Box
          sx={{
            display: "inline-flex",
            gap: 2, // Space between buttons
          }}
        >
          {aiEvents.map((event, index) => (
            <a
              key={index}
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }} // Remove underline from link
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  overflow: "hidden",
                  width: "250px", // Fixed width for buttons
                  position: "relative",
                  boxShadow: 2,
                  backgroundColor: "white", // Default background color
                  color: "black", // Default text color
                }}
              >
                {/* Conditional background for the image only */}
                <Box
                  sx={{
                    width: "100%",
                    height: "150px",
                    backgroundColor: event.title === "Speakabout AI" ? "black" : "transparent", // Black background for image container
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: event.title === "Speakabout AI" ? 0.7 : 1, // Slight opacity for "Speakabout AI" image
                    }}
                  />
                </Box>
                <Box sx={{ padding: 1, textAlign: "center" }}>
                  <Typography variant="h6">{event.title}</Typography>
                </Box>
              </Box>
            </a>
          ))}
        </Box>
      </Box>
    </Box>
  );
}