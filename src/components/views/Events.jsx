/**
 * Developer Full Stack: Darwin Rengifo / Alexandra
 *
 * Create Date: 2024-09-10
 *     Program : Speakers.jsx
 *   Path Name : stagefider/frontend/src/components/views
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - Displays a list of speakers with filtering options.
 *
 */
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import HeaderSida from "./HeaderSida";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const Image =
  "https://img.freepik.com/fotos-premium/colegas-negocios-hablando-descanso-evento-educativo-centro-convenciones_146105-87527.jpg?w=996";
const listEvents = [
  {
    title: "ECOMMERCE EXPO",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkgfxZ8OI5bt1jKfORAngaxH3rYDhLHS5cmQ",
    description:
      "The eCommerce Expo is the UK’s leading event for B2B and B2C companies involved in online sales. Held at ExCeL London on September 24-25, 2025, the expo will feature over 200 eCommerce solution providers and 200+ hours of live, accredited content from industry leaders. Attendees can network with 10,000+ senior professionals, discover new technologies, and gain valuable insights into customer experience, logistics, and operations. The event runs alongside the Technology for Marketing Expo, bringing together a diverse range of digital professionals.",
  },
  {
    title: "CES",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDqnTd9QxbAmj-znKGfwlggG4iKxtc1Epp7Q&s",
    description:
      "CES (Consumer Electronics Show) is one of the largest and most influential tech events in the world, organized by the Consumer Technology Association (CTA). It takes place annually in Las Vegas and showcases cutting-edge innovations across industries such as AI, automotive, robotics, health tech, and smart homes. It draws global attention with keynotes from top industry leaders and serves as a platform for both startups and tech giants to launch new products and solutions.",
  },
  {
    title: "Finovate Europe",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPxDxHjTIh6QgzxapzjKyXW1S0HqZa2EWENw&s",
    description:
      "FinovateEurope is a premier financial technology conference held annually, showcasing the latest innovations in fintech. It features live product demos, insightful presentations, and networking opportunities with industry leaders. The event focuses on emerging trends in banking, payments, lending, blockchain, AI, and more. With its emphasis on cutting-edge technology and forward-thinking solutions, FinovateEurope attracts professionals from across the financial services ecosystem, including startups, investors, and established institutions.",
  },
  {
    title: "MWC Barcelona",
    image:
      "https://www.mwcbarcelona.com/cdn-cgi/image/f=auto,w=512,h=auto/android-chrome-512x512.png",
    description:
      "MWC Barcelona (Mobile World Congress) is the world’s largest mobile technology event, focusing on the latest innovations in mobile and wireless communication. Hosted annually, it attracts global industry leaders, including tech companies, device manufacturers, network providers, and software developers. The event covers emerging technologies like 5G, artificial intelligence, IoT, and more. MWC Barcelona offers a platform for networking, product showcases, and thought leadership through keynote speeches and panel discussions.",
  },
  {
    title: "SXSW",
    image:
      "https://www.zenogroup.com/sites/g/files/aatuss621/files/styles/full_hero/public/2024-04/SXSW_Logo_dark-1488498407-compressed.jpg?h=ab15f194&itok=mjFgqb1Zhttps://www.sxsw.com/wp-content/uploads/2018/06/19_SXSW_Evergreen-SEO.png",
    description:
      "SXSW (South by Southwest) is an annual conference held in Austin, Texas, that brings together professionals across a range of industries including technology, film, music, and culture. It offers a mix of keynote speakers, workshops, panels, and networking opportunities. The event is known for highlighting emerging trends in technology, media, and entertainment, and draws global innovators to share insights on the future of these fields.",
  },
  {
    title: "ODSC",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnfi5aFHRs9rmCHQ2fwHzutuj4-XIXf3cDSA&s",
    description:
      "The ODSC (Open Data Science Conference) Boston is a major event focused on data science, artificial intelligence, machine learning, and related fields. It offers a variety of workshops, training sessions, and talks led by industry experts. The event is designed for data professionals at all levels, providing opportunities to explore cutting-edge technologies, discover new tools, and network with fellow practitioners.",
  },
  {
    title: "RSA Conference",
    image:
      "https://kongre.net/sites/default/files/2021-02/RSA%20Conference%20logos.%20png_0.png",
    description:
      "The RSA Conference USA is a leading cybersecurity event, bringing together industry experts, thought leaders, and professionals to discuss the latest trends and challenges in the field. Attendees can participate in sessions, workshops, and presentations covering topics like cyber threats, data protection, encryption, and governance. The conference provides valuable insights into new technologies, security innovations, and best practices to combat cyber risks. It also offers networking opportunities with peers and experts.",
  },
  {
    title: "City arts",
    image:
      "https://cdn.sfcityarts.org/wordpress/wp-content/uploads/2018/06/Chairs.Logo_.Square.jpg",
    description:
      "City Arts is a nonprofit organization dedicated to promoting and supporting the arts in the community. They provide various programs, events, and resources to artists and art enthusiasts, fostering creativity and collaboration. Their mission includes enhancing public engagement with the arts through workshops, exhibitions, and educational initiatives. City Arts aims to enrich the cultural landscape and improve the quality of life through artistic expression and community involvement.",
  },
  {
    title: "Tony Robbins",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4T80SUcUezfuhXTOQYIvif1ywE2aMYGhDKQ&s",
    description:
      'Tony Robbins hosts dynamic events focused on personal growth, financial success, and health improvement. His most notable events include "Unleash the Power Within," where participants engage in motivational exercises and strategies to break through personal barriers, and "Date With Destiny," which focuses on creating life strategies for success and fulfillment. These events often feature live interventions, practical exercises, and powerful talks to help attendees transform their lives. Robbins events attract thousands of attendees worldwide looking for personal and professional breakthroughs.',
  },
  {
    title: "EASRD",
    image:
      "https://www.eventalways.com/media/eventlogo/large/undefined-logo-1716802767.jpg",
    description:
      "The International Conference on Accounting, Business, Management & Leadership (ICABML) by EASRD focuses on key advancements and challenges in these fields. Scholars, researchers, and professionals gather to present research, exchange ideas, and discuss topics like leadership strategies, business innovations, and accounting practices. The event features presentations, workshops, and networking opportunities aimed at fostering collaboration and knowledge sharing among industry experts.",
  },
  {
    title: "SAIRAP",
    image: "https://sairap.org/images/logo.png",
    description:
      "SAIRAP (South Asia Institute for Research and Publications) is an organization dedicated to advancing research, innovation, and academic excellence. They specialize in organizing international conferences and workshops, promoting knowledge exchange among researchers, professionals, and students. SAIRAP focuses on a wide range of disciplines, including science, technology, management, and social sciences. Their events provide a platform for presenting research, fostering collaboration, and discussing advancements in various fields. SAIRAP also supports the publication of research papers through its proceedings and academic journals.",
  },
  {
    title: "Conferenzia World",
    image:
      "https://media.licdn.com/dms/image/v2/C4D0BAQFCGbj1Y9RxMg/company-logo_200_200/company-logo_200_200/0/1630477091791/conferenzia_world_logo?e=2147483647&v=beta&t=iThVco2BML-nvjAr3HvkN9Gp8ky9Od_ypSIIn7foHY4",
    description:
      "Conferenzia World is an international platform that organizes high-level conferences, summits, and forums across various industries. Their events are designed to bring together industry experts, professionals, and thought leaders to discuss cutting-edge topics, trends, and innovations. The goal is to foster knowledge sharing, networking opportunities, and collaboration among participants. Covering sectors like finance, healthcare, technology, and more, Conferenzia World aims to provide valuable insights and solutions for business challenges faced in today’s global markets.",
  },
  {
    title: "TED",
    image:
      "https://cdn.prod.website-files.com/661a45e0d1d34b8921bb0d68/66487f41ee6c80b8bdb69cb3_TEDAI-logo_white.svg",
    description:
      "TED Talks are influential presentations where experts from various fields share innovative ideas and personal stories. These talks cover topics like technology, education, design, science, and social issues, offering insights aimed at inspiring audiences to think differently and take action. TED events often feature thought leaders, creators, and change-makers, with a global audience watching both in-person and online through recorded sessions. The format encourages short, impactful talks, typically under 18 minutes, designed to be engaging, informative, and accessible to all.",
  },
  {
    title: "Web Summit",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Web_Summit_logo.svg/2048px-Web_Summit_logo.svg.png",
    description:
      "Web Summit is one of the largest technology conferences globally, bringing together startups, tech giants, and industry leaders to explore the latest innovations and trends. Held annually in Lisbon, the event attracts tens of thousands of attendees, including entrepreneurs, investors, and journalists. It features a mix of keynote speakers, panel discussions, and networking opportunities, covering topics such as AI, fintech, cybersecurity, and more. Web Summit is known for its vibrant atmosphere and being a hub for innovation and tech-driven businesses.",
  },
  {
    title: "Grant Cardone",
    image:
      "https://media.licdn.com/dms/image/v2/C560BAQHQcnpWTOjW9g/company-logo_200_200/company-logo_200_200/0/1630662073472/grant_cardone_enterprises_logo?e=2147483647&v=beta&t=HzGbUjwCKeMzrkBHbvMVmZXEGe_beoqqiQ5ERVo58t4",
    description:
      'Grant Cardone`s events are centered around business growth, sales, real estate, and personal development. His signature event, "10X Growth Conference," is designed to help entrepreneurs and professionals "10X" their business and life through actionable insights, motivational speeches, and networking opportunities. The events feature a lineup of renowned speakers from various industries, providing strategies on scaling businesses, improving sales, and increasing personal and financial success. Cardone also hosts real estate investment seminars and workshops focusing on financial freedom and wealth-building strategies.',
  },
];

export default function Events({ title }) {
  const [titleEvents, setTitleEvents] = useState([]);
  const [events, setEvents] = useState(listEvents);

  useEffect(() => {
    const filterEvents = [
      ...new Set(listEvents.map((res) => res.title.trim())),
    ].map((category) => ({ title: category }));
    setTitleEvents([...filterEvents]);
  }, []);

  const filterEvents = (event, newValue) => {
    newValue = newValue.map((value) => value.title.trim().toLowerCase());

    console.log("newvalue------>", newValue);

    const filter = listEvents.filter((eventFilter) => {
      const categoryEvents = eventFilter.title
        .split(",")
        .map((category) => category.trim().toLowerCase());
      console.log("categoryEvents------>", categoryEvents);
      const match = categoryEvents.some((category) =>
        newValue.includes(category.toLowerCase())
      );
      return match;
    });
    if (newValue.length > 0) {
      setEvents([...filter]);
    } else {
      setEvents([...listEvents]);
    }
  };

  return (
    <>
      <HeaderSida headerTitle={"Upcoming events"} headerImage={Image} />
      <Grid
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          justifyContent: "center",
          justifyItems: "center",
          display: { xs: "block", sm: "flex" },
        }}
      >
        <Grid
          container
          sx={{
            item: { xs: 12, sm: 6, md: 4 },
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "20rem", sm: "auto" },
              marginBottom: "1rem ",
            }}
          >
            <Typography
              variant="h4"
              sx={{ marginBottom: "1rem", textAlign: "center" }}
            >
              {title} {/** Title sida */}
              <Typography />
            </Typography>

            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={titleEvents}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              onChange={filterEvents} // Call the filterEvents function when the selection changes
              renderOption={(props, option, { selected }) => {
                /** Renders the checkbox and the title of each option */
                const { key, ...optionProps } = props;

                return (
                  <MenuItem key={key} {...optionProps}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.title}
                  </MenuItem>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select your favorite event"
                  placeholder="Favorites"
                />
              )}
            />
          </Box>
        </Grid>

        <Grid
          container
          spacing={10}
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{
            item: { xs: 12, sm: 6, md: 4 },
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          {events.map((item) => (
            /** CARD: is the booklet that contains all the contents of the card */
            <Card
              key={item.title}
              //component={NavLink} //component del react router
              /** Send item.title as a parameter to DetailProduct */
              //to={`/DetailProduct/${item.title}`}
              sx={{
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                width: { xs: "38vh", sm: "70vh" },
                height: { xs: "66vh", sm: "95vh" },
                marginLeft: { sm: "1rem" },
                marginTop: "2rem",
                textDecoration: "none",
              }}
            >
              {/** Encloses the area of ​​all content */}
              <CardActionArea
                sx={{
                  display: "flex",
                  flexDirection: "column", // To ensure that content is stacked vertically
                  alignItems: "center", // Center horizontally
                  justifyContent: "center", // Center vertically
                }}
              >
                {/** Enclose the image */}
                <CardMedia
                  component="img"
                  image={item.image}
                  alt="Card Image"
                  sx={{
                    width: "100%",
                    height: { xs: "30vh", sm: "40vh" },
                    objectFit: "contain",
                    marginBottom: "1rem",
                  }}
                />

                <Box
                  onClick={() => handleTitleClick(item.id)}
                  sx={{
                    //position: "absolute",
                    position: "relative",
                    bottom: "20%",
                    width: "50%",
                    backgroundColor: "white",
                    padding: "10px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    transition: "background-color 0.3s, color 0.3s",
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "secondary.main", // Change background color on hover
                      color: "white", // Change text color on hover
                    },
                  }}
                >
                  <Typography variant="h6" component="span">
                    {item.title}
                  </Typography>
                </Box>
                {/** Encloses all text content */}
                <CardContent
                  sx={{
                    height: "9rem",
                    justifyContent: "left",
                    justifyItems: "left",
                  }}
                >
                  <Typography variant="body1">{item.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
  );
}
