/**
 * Developer Full Stack: Darwin Rengifo
 *
 * Create Date: 2024-08-24
 *     Program : Navbar.jsx
 *   Path Name : stagefider/frontend/src/components/functions
 *       Tools : NodeJS, React, Mterial UI
 *
 * Description:
 * - General functions of the page
 *
 */
import HomeIcon from "@mui/icons-material/Home";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import FestivalIcon from "@mui/icons-material/Festival";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import dayjs from 'dayjs';

/** Receives a text and puts the first
 * letter in capital letters and the rest
 * in lower case
 **/

/** Export navArrayLinks for header menu App.jsx */
export const navBarLinks = [
  { title: "Home", path: "/", icon: <HomeIcon /> },
  { title: "Speakers", path: "/Speakers", icon: <InterpreterModeIcon /> },
  { title: "Events", path: "/Events", icon: <CalendarMonthIcon /> },
  { title: "Conference", path: "/Conference", icon: <TravelExploreIcon /> },
  { title: "Partners", path: "/Partners", icon: <Diversity3Icon /> },
  { title: "Be a Speaker", path: "/BeASpeaker", icon: <RecordVoiceOverIcon /> },
  { title: "About Us", path: "/About", icon: <FestivalIcon /> },
  { title: "List", path: "/Prompt", icon: <FestivalIcon /> },
];

export const listSpeakers = [
  {
    name: "Karl Lillrud",
    title: "Professional Keynote Speaker & Business Coach",
    category: "Innovation, AI, Future, Leadership",
    description:
      "Karl Lillrud makes sure you get not just advice but also the tools to apply straight away to make a difference and improve your Future, AI knowledge, Innovation thinking, and Leadership mindset.",
    image:
      "https://static.wixstatic.com/media/4d53c3_40db86ddf78f4270961713c4c7a3e645~mv2_d_1617_2048_s_2.jpg/v1/crop/x_0,y_44,w_1595,h_1956/fill/w_548,h_672,al_c,q_90,enc_auto/Karl%20Lillrud%20.jpg",
  },
  {
    name: "Yuval Noah Harari",
    title: "Medievalist, military historian, public intellectual, and writer.",
    category: "History, Futurism, AI, Globalization",
    description:
      "Yuval Noah Harari has a brilliant and unique ability to take his extensive knowledge of world history and present broad, accessible, and helpful understandings of humanity.",
    image:
      "https://pbs.twimg.com/profile_images/1034789978444886017/9GqAdkNk_400x400.jpg",
  },
  {
    name: "Adam Grant",
    title: "Organizational Psychologist and Bestselling Author",
    category:
      " Organizational Psychology, Innovation, Leadership, Human Behavior",
    description:
      "Adam Grant isn’t just an organizational psychologist — he's a revolution in the way we approach success. Imagine completely shifting your perspective on work, creativity, and ambition.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Adam_Grant_-_Picture_by_Jamey_Stillings.jpg/330px-Adam_Grant_-_Picture_by_Jamey_Stillings.jpg",
  },
  {
    name: "Brené Brown",
    title: "Researcher, Storyteller & Emotional Intelligence Pioneer",
    category: "Vulnerability, Leadership, Psychology, Corporate Cultur",
    description:
      "Dr. Brené Brown is a research professor at the University of Houston, where she holds the Huffington Foundation Endowed Chair at the Graduate College of Social Work.",
    image:
      "https://www.female-motivational-speakers.com/wp-content/uploads/2021/06/Brene-Brown.jpg.webp",
  },
  {
    name: "Sanna Marin",
    title: "Former Prime Minister of Finland",
    category: "Politics, Leadership, Public Policy Innovation, Gender Equality",
    description:
      "Sanna Marin, esteemed as a global example of dynamic and progressive leadership, has held the distinguished honor of being one of the world’s youngest serving prime ministers in the world and Finland’s youngest ever.",
    image:
      "//images.ctfassets.net/75ila1cntaeh/59Wgs1YCDlsoYBlXDpBu6j/7e242cfcd8debed55df46b26ccce4acb/Sanna_Marin.png",
  },
  {
    name: "Peter Hinssen",
    title: "Author & Leader in Radical Innovation",
    category:
      "Digital Transformation, Innovation, Future of Technology, Entrepreneurship",
    description:
      "Peter Hinssen is more than just an expert; he's a guide through the storm of big changes. With five top-selling books, including 'The Phoenix and The Unicorn' and 'The Day After Tomorrow', Peter stands out as a key voice on how businesses can survive and grow in times of major shifts.",
    image:
      "https://theinnovator.news/wp-content/uploads/2020/04/1wqCxICHvxgS49VcYOZHOXw.jpeg",
  },
  {
    name: "Mikko Hyppönen",
    title: "Global Cybersecurity Expert & Author",
    category:
      "Cybersecurity, Data Protection, Ethical Hacking, Information Security",
    description:
      "Mikko Hyppönen is a leading global security expert, serving as the Chief Research Officer at WithSecure and a Principal Research Advisor at F-Secure. He has contributed to renowned publications like the New York Times and Wired, and frequently appears on international TV.",
    image:
      "https://www.aurumbureau.com/wp-content/uploads/2020/11/Aurum-Speakers-Bureau-Mikko-Hypponen.jpeg",
  },
  {
    name: "Lillian Gjerulf Kretz",
    title: "Moderator OBF",
    category: "Journalism, Media, International Relations",
    description:
      "Lillian Gjerulf Kretz is a respected Danish journalist and news correspondent, well-known for her expertise in American politics and society. With a robust career in journalism, Lillian has served as the United States correspondent for DR (Danmarks Radio), the Danish Broadcasting Corporation.",
    image:
      "https://4241733.fs1.hubspotusercontent-na1.net/hub/4241733/hubfs/frame_4-1.webp?width=2400&name=frame_4-1.webp",
  },
  {
    name: "Morten Hansen",
    title: "Management Professor & Performance Expert",
    category:
      "Business Management, Productivity, Business Innovation, Leadership",
    description:
      "Morten Hansen stands out with his unique blend of academic rigor and real-world business experience. Renowned for his evidence-based approach, he translates intricate research into actionable strategies.",
    image: "https://www.nbforum.com/wp-content/uploads/Morten-Hanssen.png",
  },
  {
    name: "Erin Meyer",
    title: "Bestselling Author & Professor at INSEAD",
    category:
      "Leadership & Management, Culture & Diversity, Business & Economics",
    description:
      "Erin Meyer redefines leadership across cultures. As the world becomes increasingly interconnected, Erin's insights are more crucial than ever. Her collaboration with Reed Hastings on 'No Rules Rules' and her solo masterpiece 'The Culture Map' have set new standards for managing multicultural teams and fostering innovation. ",
    image:
      "https://www.scottish-enterprise.com/media/bvyh1a53/erin-meyer.webp?width=3840&quality=70",
  },
];


