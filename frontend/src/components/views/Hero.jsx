import React, { useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Engineering,
  BusinessCenter,
  School,
  LocalHospital,
  AttachMoney,
  Palette,
  Search,
  Link,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation

const categories = [
  {
    name: "Engineering and Technology",
    icon: <Engineering />,
    link: "/engineering",
  },
  {
    name: "Business and Economics",
    icon: <BusinessCenter />,
    link: "/business",
  },
  { name: "Education", icon: <School />, link: "/education" },
  { name: "Healthcare", icon: <LocalHospital />, link: "/healthcare" },
  { name: "Finance", icon: <AttachMoney />, link: "/finance" },
  { name: "Arts", icon: <Palette />, link: "/arts" },
  { name: "Social Sciences", icon: <Search />, link: "/social-sciences" },
  { name: "Others", icon: <Link />, link: "/others" },
];

export default function Hero() {
  const scrollContainerRef = useRef(null);
  const categoryRefs = useRef(
    categories.reduce((acc, _, index) => {
      acc[index] = React.createRef();
      return acc;
    }, {})
  );

  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleCategoryClick = (link) => {
    navigate(link); // Navigate to the specific route on category click
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          //height: "34rem",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <video
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "70%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h2">Our Luxury Products</Typography>
          <Typography variant="h6">You're welcome</Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            width: "80%",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <IconButton
            onClick={() => handleScroll("left")}
            sx={{
              backgroundColor: "rgb(244, 245, 245)",
              color: "rgb(30, 107, 231)",
              borderRadius: "50%",
              padding: "10px",
              fontSize: "1.5rem",
              position: "absolute",
              left: "10px",
              zIndex: 2,
            }}
          >
            <ChevronLeft />
          </IconButton>
          <Box
            ref={scrollContainerRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              whiteSpace: "nowrap",
              gap: "1rem",
              padding: "0 1rem",
              scrollBehavior: "smooth",
              flex: 1,
            }}
          >
            {categories.map((category, index) => (
              <Box
                key={index}
                ref={categoryRefs.current[index]}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "background.paper" : "#f5f5f5",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  flexShrink: 0,
                  minWidth: "150px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "#e0e0e0",
                  },
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "text.primary" : "text.primary",
                }}
                onClick={() => handleCategoryClick(category.link)} // Navigate to the link on click
              >
                <Typography variant="h6" color="inherit">
                  {category.icon}
                </Typography>
                <Typography variant="body1" color="inherit">
                  {category.name}
                </Typography>
              </Box>
            ))}
          </Box>
          <IconButton
            onClick={() => handleScroll("right")}
            sx={{
              backgroundColor: "rgb(244, 245, 245)",
              color: "rgb(30, 107, 231)",
              borderRadius: "50%",
              padding: "10px",
              fontSize: "1.5rem",
              position: "absolute",
              right: "10px",
              zIndex: 2,
            }}
          >
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
    </>
  );
}
