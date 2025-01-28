import { useState, useEffect } from "react";
import {
  Box,
  Card,
  Button,
  Typography,
  CardMedia,
  CardContent,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from 'react';


const items = [
  {
    name: "Why your business can’t afford not to give back",
    description:
      "We are here to let you in on a little secret, a change in mindset that will not only help make your business more profitable but will...",
    picture:
      "https://s3-alpha-sig.figma.com/img/da82/425a/e158d18ce03670b2c63b5d92edfdcf52?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lc8mLoLNQ9PXHr9OHRhMZvx8DXTxXpuRzWl-ZdBrsIz7O4sTNmHzZ8BuzvZVdaNMymnnzlWL8dZ8qy4andvWIl3Hhmjf26jwL5oew-JXBhuoG2eLKzjxPZS6OHVro6NO311NUiHiFjj0OtSL71MQqT5CJjDJpVt5o20YkSWQmtZVbnFLA7NAX-ZtUsmNx9M9E9CmYNILEVH4PnKv0APnbDNIrTTx53DcE16iHPIX7URg0LiXBCaLIsG38mE1UYKK79X7l4zlA8dwLqN2fC~Koln4EHX0XYVHT-any6skwl3Vz0NPWaJ7dKPeE8dt0IHGtciXlBaQZ6tm7iGKgvIrvA__",
  },
  {
    name: "Get your business “unstuck”",
    description:
      "Companies and executives seek out professional business coaches for various reasons, but they all have one thing in…",
    picture:
      "https://s3-alpha-sig.figma.com/img/9866/04c9/94738c19230cbc04c5dc0bb583620718?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=maKUMsmSBZiHeP6s9kLb5TqJg9Gsno3Dv07HjGze6a0nDvUUGR9irctlocpFgxiweXpRJlG0j0rMP1pUshVrKWJIgNoZOd-IkWgewTBf9yz8YmyZydaQQKv9Z-ZSwM8wy3JA6TBHaKFsOhup~7SnQmDPhaujODF1Tio5bIF0HrQWxjOwtlvDZWyPKzByf7feJUM3dnsi4vraxjDKy31XJ64hBsE6whVQ0M19TrOLBWWzmOFDSm3nIQonGV~id4llyPIEM4RGsZ~fx2Nifq6MLpliiNPVYW0F4AS4EYshA3puc77Fb87~ECngLOLUBN3FVSjoiEEh5ZWbGpJKBr~~sA__",
  },
  {
    name: "How a business results coach can take your company to the next level",
    description:
      "Whether you are an entrepreneur trying to grow your business, a CEO looking to take your company to the next level or a leader…",
    picture:
      "https://s3-alpha-sig.figma.com/img/45d0/e5c0/791de6c34bc5752018469b42e83244e1?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WDY70tID41vSWx4mV7U~7brE6eARAwty9s0Y4vtw7-udCymFT3epKrcV1UDNUUoNHN505Zvu0U307EPHZp5bA-oDImDRt-PO5PQ2O96H8PfkOEASTNoH3rGbibzb6bVhtM3Wq1oCAJkXGQWIIFXdTxjeWQ67T9VVx7PSM1iZnxdFAj2wfhqxsvXk9SGRqIpkcgNi0yvQa7SgXm0egB6xuxvmT~PYN9cU~I0k2aZlA1xOPN-lOiqnm0T9L9cx1wOZ4~V2Ou2Q1OpjikhR9A4GSYST2M6qa0MfJRM5D9vLW6bnsFhX4zQxbBejzaen9wpDYkQvu-f5AeofGzkr3v413A__",
  },
  {
    name: "Awaken Your True Power at the 2024 She’s Unstoppable Summit",
    description:
      "It’s time for us, the women of the world, to awaken our true power and nature. In a world filled with noise, confusion, and division, we...",
    picture:
      "https://s3-alpha-sig.figma.com/img/0c5d/9299/2b56109fda3338fd3326224db6f9954d?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=CqdTCGcjJgP2A6xqFL8AsmXyhQ2wkc4IFyv3XpDMpZuOHENhDPxsAXsnWKhFm1b3xbqBjIYZ17J3yMi07Vz5rSC2DVXUCHwPozk28DSRVvC~T9JFPsnVGFgJZZeI~izqKOyjIryGaUiDfJIeKltSCrvyzAQ9k1~3DNPXGg4bLeI1PdSfFlu3z66Phs4MH4Iw7LeWDRUnL1XIJPMKGOie6Fn9vKy~gThD3aSFYvv49gl6i-x6Eyq4S41IpYp9VR3G2lRBh9V8K1qZyfabyJJ5oV6cXPO1dj7~J4A8JsuHEczN1sAnlzzv4eIf7Q260l676ORlRXTOUQQi5jObYx4zWw__",
  },
  {
    name: "How to Build an Engaging Team Culture",
    description:
      "Learn the keys to creating a workplace culture that boosts productivity, creativity, and employee satisfaction…",
    picture:
      "https://engagedly.com/wp-content/uploads/2016/08/increase_employee_engagement.jpg",
  },
  {
    name: "The Power of Personal Branding for Entrepreneurs",
    description:
      "Your personal brand is a vital asset in today's digital landscape. Learn how to create a brand that resonates and builds lasting connections...",
    picture:
      "https://theboldbusinessexpert.com/wp-content/uploads/2022/06/personal-branding-i-am-a-brand-t-shirt-image.jpg",
  },
  {
    name: "Maximizing Efficiency with Lean Management",
    description:
      "Discover how lean management principles can streamline operations, reduce waste, and drive performance in any industry...",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm9Np3tnnCsufv2gqykYYhqgG4llXb3wWtFQ&s",
  },
  {
    name: "How to Scale Your Business Sustainably",
    description:
      "Scaling a business isn't just about growth; it's about doing it in a way that ensures long-term success and stability…",
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-uN-SzGZ8YrcxQcQAX_YJVhL5hOqhzWVGpA&s",
  },
  {
    name: "Navigating Market Disruption in 2024",
    description:
      "With rapid changes in technology and consumer behavior, navigating market disruption requires agility and innovation…",
    picture:
      "https://www.investopedia.com/thmb/tgiKtPxCCWmrWjoatbGb2MBki0M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/stock-market-169975453-0435fcd8012e49c898d8dbf377a27826.jpg",
  },
  {
    name: "Leveraging AI to Grow Your Business",
    description:
      "Artificial Intelligence is reshaping industries. Learn how to leverage AI in marketing, operations, and customer service to gain a competitive edge...",
    picture:
      "https://media.istockphoto.com/id/1418476287/photo/businessman-analyzing-companys-financial-balance-sheet-working-with-digital-augmented-reality.jpg?s=612x612&w=0&k=20&c=Cgdq4iCELzmCVg19Z69GPt0dgNYbN7zbAARkzNSpyno=",
  },
];

export default function CustomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const itemWidthPercentage = 40;
  const gapPercentage = 0.5;

  useEffect(() => {
    const updateContainerWidth = () => {
      const containerElement = document.getElementById("carousel-container");
      if (containerElement) {
        setContainerWidth(containerElement.offsetWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);

    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const calculateTranslateX = (index) => {
    const translateX =
      index *
      (containerWidth * (itemWidthPercentage / 100 + gapPercentage / 100));
    return translateX;
  };

  return (
    <>
      <Box
        id="carousel-container"
        sx={{
          display: "flex",
          position: "relative",
          width: "100%",
          height: "50vh",
          margin: "20px auto",
          overflow: "hidden",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "10%",
            display: "flex",
            padding: "4px",
            marginTop: "2rem",
          }}
        >
          <Box
            sx={{
              width: "80%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: "500", marginRight: "2%" }}
            >
              Blog
            </Typography>
            <Button
              sx={{
                color: "gray",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
                borderRadius: "0",
                borderBottom: "1px solid #f0f0f0",
                fontSize: "1rem",
                "&:hover": {
                  borderColor: "gray",
                },
              }}
            >
              Go to the Blog <ArrowForwardIosIcon fontSize="0.9rem" />
            </Button>
          </Box>
          <Box
            sx={{
              width: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handlePrev}
              sx={{
                color: "black",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
                minWidth: "0",
                marginBottom: "1rem",
                backgroundColor: "#f0f0f0",
                marginRight: "10px",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              <ArrowBackIosIcon fontSize="small" />
            </Button>
            <Button
              onClick={handleNext}
              sx={{
                color: "black",
                height: "40px",
                width: "40px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0",
                minWidth: "0",
                backgroundColor: "#f0f0f0",
                marginBottom: "1rem",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            transition: "transform 0.5s ease",
            transform: `translateX(-${calculateTranslateX(currentIndex)}px)`,
            width: `${items.length * (itemWidthPercentage + gapPercentage)}%`,
            height: "90%",
            gap: `${gapPercentage}%`,
            padding: "5px",
          }}
        >
          {items.map((item, index) => (
            <Card
              key={index}
              sx={{
                width: `${itemWidthPercentage}%`,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                backgroundColor: "#f5f5f5",
                textAlign: "center",
              }}
            >
              <CardMedia
                component="img"
                image={item.picture}
                alt={item.name}
                sx={{
                  width: "100%",
                  height: "200px", // Ensure all images have the same height
                  objectFit: "cover", // Makes sure the image fills the card without distorting
                  marginBottom: "8px", // Adds a slight margin below the image
                  borderRadius: "10px",
                }}
              />

              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "75%",
                    fontWeight: "400",
                  }}
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "#6e6e6e", // A slightly gray but still dark color
                  }}
                >
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </>
  );
}
