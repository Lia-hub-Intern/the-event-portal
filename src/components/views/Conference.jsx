/**
 * Developer Full Stack: Darwin Rengifo / Andy
 *
 * Create Date: 2024-10-02
 *     Program : Conference.jsx
 *   Path Name : stagefider/frontend/src/components/views
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - It shows a list of upcoming conferences.
 *
 */
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";
import HeaderSida from "./HeaderSida";
import VConference from "../videos/VConference";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef } from "react";

/**
 * Conference.jsx
 */
export default function Conference() {
  const Image =
    "https://static7.depositphotos.com/1000998/745/i/450/depositphotos_7451136-stock-photo-on-conference.jpg";

  const arrayItems = [
    {
      item: "Phase 1",
      title: "Awakening",
      description:
        "Get clear about what’s holding you back and tap into the confidence to become who youwant to be.",
      image:
        "https://cdn.sanity.io/images/nyyhaljw/production/43ba884cbe07604804013238f990428bfa51c6dc-1280x783.jpg?w=1280&h=783&q=80&auto=format",
    },
    {
      item: "Phase 2",
      title: "Creation",
      description:
        "Learn to expand and evolve beyond your current identity and ingrained beliefs.",
      image:
        "https://cdn.sanity.io/images/nyyhaljw/production/b7c3c39c76cfa7bfce321a908b08e88624eec977-798x532.png?w=798&h=532&q=80&auto=format",
    },
    {
      item: "Phase 3",
      title: "Transformation",
      description:
        "Master the 3 forces of transformation to ditch old habits and set the stage for lasting change.",
      image:
        "https://cdn.sanity.io/images/nyyhaljw/production/5a2ed8a4df6501de851671c3fee1e08dd340c1dc-720x480.png?w=720&h=480&q=80&auto=format",
    },
    {
      item: "Phase 4",
      title: "Momentum",
      description:
        "Implement essential skills to keep reaching new heights of happiness, abundance, and fulfillment.",
      image:
        "https://cdn.sanity.io/images/nyyhaljw/production/49ce15f3dc30ad039332174f7737601128cf981a-720x480.png?w=720&h=480&q=80&auto=format",
    },
  ];

  const arrayBlogs = [
    {
      title: "Why your business can’t afford not to give back",
      description:
        "We are here to let you in on a little secret, a change in mindset thatwill not only help make your business more profitable but will….",
      image:
        "https://cdn.sanity.io/images/nyyhaljw/production/f6c346099b25c960a043a6f30181aa4dda381840-1200x800.jpg?rect=52,0,1097,800&w=480&h=350&q=80&auto=format",
    },
    {
      title: "Get your business “unstuck”",
      description:
        "Companies and executives seek out professional business coaches for various reasons, but they all have one thing in….",
      image:
        "https://cdn.sanity.io/images/nyyhaljw/production/ffbc2662d0a93b39f0485d6056e94a240c5eef85-1200x801.jpg?rect=51,0,1099,801&w=480&h=350&q=80&auto=format",
    },
    {
      title:
        "How a business results coach can take your company to the next level",
      description:
        "Whether you are an entrepreneur trying to grow your business, a CEO looking to take your company to the next level or a leader…",
      image:
        "https://cdn.sanity.io/images/nyyhaljw/production/c729f197fe49cccc7baf83ad6e1a133218634f74-1200x800.jpg?rect=52,0,1097,800&w=480&h=350&q=80&auto=format",
    },
    {
      title: "Awaken Your True Power at the 2024 She’s Unstoppable Summit",
      description:
        "It’s time for us, the women of the world, to awaken our true power and nature. In a world filled with noise, confusion, and division, we",
      image:
        "https://cdn.sanity.io/images/nyyhaljw/production/3adf79db07a1441c06b7b1b300f21419de3d9223-1473x850.png?w=1473&h=850&q=80&auto=format",
    },
  ];

  const scrollRef = useRef(null);

  // Función para hacer scroll horizontal
  const scroll = (scrollOffset) => {
    scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };
  return (
    <>
      <HeaderSida headerTitle={"Conferences"} headerImage={Image} />
      <Grid
        container
        spacing={0}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          display: { xs: "block", sm: "flex" },
        }}
      >
        {/** Awaken your true power and ignite your unstoppable self */}
        <Grid item spacing={2}>
          <Box>
            <Typography
              component="h6"
              variant="h6A"
              sx={{
                marginBottom: { xs: "1rem" },
                fontSize: { xs: 20, sm: 30 },
              }}
            >
              Awaken your true power and ignite your unstoppable self
            </Typography>
            <VConference />
          </Box>
        </Grid>

        {/** Four phases, unlimited possibilities */}
        <Grid item spacing={2} sx={{ marginTop: "6rem" }}>
          <Typography
            component="h6"
            variant="h6A"
            sx={{
              marginBottom: { xs: "1rem" },
              fontSize: { xs: 20, sm: 30 },
            }}
          >
            Four phases, unlimited possibilities
          </Typography>
          <Divider
            sx={{
              borderBottomWidth: "3px",
              borderColor: "black",
              marginBottom: "1rem",
            }}
          />

          <Grid
            container
            spacing={2}
            sx={{
              textAlign: "left",
              flexDirection: { xs: "row", sm: "column" },
            }}
          >
            {arrayItems.map((item, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ boxShadow: "none", textDecoration: "none" }}>
                  <Grid container>
                    {/* Column for text content*/}
                    <Grid item xs={2}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {item.item}
                        </Typography>
                      </CardContent>
                    </Grid>

                    <Grid item xs={6}>
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontSize: { xs: 14, sm: 16 } }}
                        >
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Grid>

                    {/* Column for the image */}
                    <Grid item xs={4}>
                      <CardMedia
                        component="img"
                        //alt={item.title}
                        image={item.image}
                        sx={{
                          marginTop: "1rem",
                          width: "100%",
                          height: "80%",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/**Blogs */}
        <Grid container position="relative">
          {/* Left arrow */}
          <IconButton
            onClick={() => scroll(-300)}
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <Grid item spacing={2} sx={{ marginTop: "2rem" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                component="h6"
                variant="h6A"
                sx={{
                  fontSize: { xs: 20, sm: 30 },
                  marginRight: "2rem",
                }}
              >
                Blogs
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  fontSize: { xs: 14, sm: 20 },
                  transition: "0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                Explore our blog
              </Typography>
              <IconButton
                sx={{
                  marginLeft: "2rem", // Space between arrows
                }}
              >
                <ArrowForwardIosIcon
                  sx={{
                    width: "1rem",
                  }}
                />
              </IconButton>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            ref={scrollRef}
            sx={{
              display: "flex",
              overflowX: "auto",
              scrollBehavior: "smooth",
              padding: "20px 0",
              margin: "0 50px", // Space between arrows
              "::-webkit-scrollbar": {
                display: "none", // Hide the scrollbar in WebKit-based browsers
              },
              msOverflowStyle: "none", // Hide the scrollbar in IE and Edge
              scrollbarWidth: "none", // Hide the scrollbar in Firefox
            }}
          >
            {arrayBlogs.map((blog, index) => (
              <Grid
                item
                xs={4}
                key={index}
                sx={{
                  minWidth: "300px",
                  margin: "0 10px",
                  flexShrink: 0, // Prevents items from shrinking
                }}
              >
                <Card
                  sx={{
                    transition: "0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={blog.image}
                    sx={{
                      width: "22rem",
                      height: "18rem",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <CardContent
                    sx={{
                      textAlign: "left",
                      height: { xs: "11rem", sm: "10rem" },
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ lineHeight: "1.5rem", marginBottom: "1rem" }}
                    >
                      {blog.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {blog.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Right arrow */}
          <IconButton
            onClick={() => scroll(300)}
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Grid>
      </Grid>
    </>
  );
}
