/**
 
Events.jsx*/
//import { events } from '../functions/Functions';
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
  Box,
} from "@mui/material";

export const events = [
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

export default function Events() {
  return (
    <>
      <Grid
        container
        spacing={5}
        rowSpacing={2}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{
          justifyContent: "center",
          display: { xs: "block", sm: "flex" },
        }}
      >
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <Box sx={{ position: "relative" }}>
              <Card
                sx={{
                  width: "100%",
                  maxWidth: "350px",
                  height: "300px",
                  textDecoration: "none",
                  borderBottom: "none",
                }}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="300px"
                    image={event.image}
                    alt={event.title}
                    sx={{
                      objectFit: "cover",
                      //height: "100%",
                    }}
                  />
                </CardActionArea>
              </Card>

              <Box
                onClick={() => handleTitleClick(event.id)}
                sx={{
                  position: "absolute",
                  top: "270px",
                  left: "50%",
                  width: "75%",
                  height: "50px",
                  transform: "translateX(-50%)",
                  backgroundColor: "darkgray",
                  padding: "5px 60px",
                  cursor: "pointer",
                  boxShadow: 2,
                  zIndex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography variant="h6" component="span">
                  {event.title}
                </Typography>
              </Box>

              <Card
                sx={{
                  backgroundColor: "#f0f0f0",
                  width: "100%",
                  maxWidth: "350px",
                  height: "300px",
                  marginTop: "-1px",
                  borderTop: "none",
                }}
              >
                <CardContent sx={{ paddingTop: "30px" }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {event.description}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
