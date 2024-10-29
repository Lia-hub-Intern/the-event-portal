import { Typography, Box, Grid } from "@mui/material";
import Slideshow from "./slideshowConfrence";
import AboutUsImage from "/assets/about-us-hero-image.jpeg";
import ImageOne from "/assets/about-us-content-image-one.jpeg";
import ImageTwo from "/assets/about-us-content-image-two.jpeg";
import ImageThree from "/assets/about-us-content-image-three.jpeg";
import ImageFour from "/assets/about-us-content-image-four.png";

/* About us page. */
export default function About() {
  return (
    <>
      <Slideshow />
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "300px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${AboutUsImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.6,
            zIndex: 1,
          }}
        />
        <Typography
          variant="h3"
          color="white"
          sx={{
            position: "relative",
            zIndex: 2,
            fontWeight: "500",
            fontSize: "clamp(1.15rem, 2vw, 2.5rem)",
          }}
        >
          Empowering leaders to{" "}
          <Box component={"span"} sx={{ color: "yellow" }}>
            Change
          </Box>{" "}
          the world!
        </Typography>
      </Box>
      <Typography
        variant={"h4"}
        sx={{
          color: "#A1824A",
          mt: 5,
          fontWeight: "600",
        }}
      >
        What we do
      </Typography>
      <Grid container size={{ xs: 12 }}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Typography
            variant={"body2"}
            sx={{
              my: 1,
              fontSize: "1.1rem",
            }}
          >
            We strive to inspire and equip business leaders dedicated to
            creating a better world, as we believe this is the most impactful
            way to effect positive change in society.
            <br />
            <br />
            Established in 2016, our passion lies in providing actionable tools
            and insights to help business leaders grow and excel. All our
            initiatives are designed to empower leaders to change the world.
          </Typography>
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Typography
            variant={"body2"}
            sx={{
              my: 1,
              ml: { xs: 0, md: 4 },
              fontSize: "1.1rem",
            }}
          >
            Our participants enjoy insightful presentations from world-renowned
            business experts and engage in meaningful networking with other
            business leaders and executives.
            <br />
            <br />
            We pride ourselves on curating an exceptional lineup of speakers and
            delivering a premium customer experience for our ambitious
            attendees. At our events, you can concentrate on absorbing
            inspiration, knowledge, and connections while we ensure a memorable
            experience tailored to your needs.
          </Typography>
        </Grid>
      </Grid>
      <Grid container size={{ xs: 12 }} sx={{ mt: 4 }}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={ImageOne}
            alt="Image description 1"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={ImageTwo}
            alt="Image description 2"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={ImageThree}
            alt="Image description 3"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Box
            component="img"
            src={ImageFour}
            alt="Image description 4"
            sx={{
              width: "100%",
              height: "auto",
              maxHeight: "300px",
              objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>
      <Typography
        variant={"body2"}
        sx={{
          mt: 5,
          fontWeight: "600",
        }}
      >
        LONG STORY SHORT
      </Typography>
      <Typography
        variant={"h4"}
        sx={{
          color: "#A1824A",
          fontWeight: "600",
        }}
      >
        Our story
      </Typography>
      <Grid container size={{ xs: 12 }}>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Typography
            variant={"body2"}
            sx={{
              my: 1,
              fontSize: "1.1rem",
            }}
          >
            Company Business Forum was started in January 2016, by the two
            co-founders Christoffer Omberg and Marius Røed Wang, two students
            from BI Norwegian Business School. The purpose was to challenge the
            status quo in the Norwegian business community. 
            <br />
            <br />
            Ten months later, the first conference was organized in November
            2016. Sir Alex Ferguson, the manager of Manchester United through 26
            years, was the first keynote speaker, in front of 850 guests at Oslo
            Concert Hall.
          </Typography>
        </Grid>
        <Grid item size={{ xs: 12, md: 6 }}>
          <Typography
            variant={"body2"}
            sx={{
              my: 1,
              ml: { xs: 0, md: 4 },
              fontSize: "1.1rem",
            }}
          >
            Since then, our annual business conference has grown to be one of
            the most significant business conferences in the world. In five
            short years, we have accomplished some major milestones we are proud
            of. Speakers such as President Barack Obama, Randi Zuckerberg, David
            Cameron and Steve Wozniak have already guested our conference as
            keynote speakers.
            <br />
            <br />
            In May 2019, we were partly acquired by{" "}
            <Box component={"span"} sx={{ color: "#A1824A" }}>
              Business Forum Group
            </Box>
            , one of the most noteworthy business conference groups in the world
            including Nordic Business Forum and Amsterdam Business Forum. After
            two online editions in 2020 and a limited in-person edition in 2021
            with 750 attendees, we welcomed 2,500 business leaders and +10,000
            online attendees in 2022. 
          </Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          mt: 6,
        }}
      >
        <Typography
          variant={"body2"}
          sx={{
            fontWeight: "600",
            color: "#A1824A",
            width: "100%",
            textAlign: "center",
          }}
        >
          LONG STORY SHORT
        </Typography>
        <Typography
          variant="h3"
          textAlign={"center"}
          sx={{
            fontWeight: "500",
            fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
            width: { xs: "100%", md: "50%", lg: "30" },
            fontStyle: "italic",
          }}
        >
          We believe that inspiring and equipping business leaders who want to
          make the world a better place is the single most effective way in
          which we can make an effect on the whole society at large.
        </Typography>
      </Box>
    </>
  );
}
